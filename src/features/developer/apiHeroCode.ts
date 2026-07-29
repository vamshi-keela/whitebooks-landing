import type { CodeLine, CodeTab, Token, TokenClass } from './DpComponents';

/**
 * Hero code samples, one set per API product.
 *
 * The dev portal's `heroTabs` is hand-authored as token tuples, which is fine
 * for a single sample but not for 4 APIs × 7 languages. Here each API is
 * described once as an `ApiSample` — resource, call, params, endpoint — and the
 * seven language variants are rendered from it, then tokenised for colouring.
 * That keeps the samples consistent with each other and cheap to correct: fix
 * the spec, every tab follows.
 */

/* ─── Tokeniser ────────────────────────────────────────────────────────────── */

const KEYWORDS = new Set([
  'import', 'from', 'const', 'let', 'var', 'new', 'await', 'async', 'return',
  'true', 'false', 'null', 'None', 'True', 'False', 'use', 'echo', 'func',
  'package', 'class', 'public', 'static', 'void', 'this', 'self',
]);

const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*/;
const NUMBER = /^\d[\d_.]*/;

/** Splits one line of source into coloured tokens. Presentational only — a
 *  mis-classified identifier costs a shade, never correctness. */
function tokenizeLine(line: string): CodeLine {
  const out: Token[] = [];
  let i = 0;
  let plain = '';

  const flush = () => {
    if (plain) {
      out.push(['', plain]);
      plain = '';
    }
  };
  const push = (cls: TokenClass, text: string) => {
    flush();
    out.push([cls, text]);
  };

  while (i < line.length) {
    const rest = line.slice(i);

    // comments run to end of line
    if (rest.startsWith('//') || rest.startsWith('#')) {
      push('com', rest);
      i = line.length;
      continue;
    }

    // strings — no escapes appear in these samples, so a simple scan is enough
    const quote = rest[0];
    if (quote === '"' || quote === "'") {
      const end = rest.indexOf(quote, 1);
      const text = end === -1 ? rest : rest.slice(0, end + 1);
      push('str', text);
      i += text.length;
      continue;
    }

    const num = NUMBER.exec(rest);
    if (num && !/[A-Za-z_]/.test(line[i - 1] ?? '')) {
      push('num', num[0]);
      i += num[0].length;
      continue;
    }

    const id = IDENT.exec(rest);
    if (id) {
      const word = id[0];
      const after = rest.slice(word.length);
      const before = line.slice(0, i);
      let cls: TokenClass;
      if (KEYWORDS.has(word)) cls = 'kw';
      else if (word.startsWith('$')) cls = 'key';
      else if (after.startsWith('(')) cls = 'fn';
      else if (/^[A-Z0-9_]+$/.test(word) && word.length > 1) cls = 'key';
      else if (/^[A-Z]/.test(word)) cls = 'fn';
      else if (/(\.|->|\\)$/.test(before)) cls = 'key';
      else cls = '';
      if (cls === '') plain += word;
      else push(cls, word);
      i += word.length;
      continue;
    }

    if (/[{}()[\].,:;=&*<>!?\\|+-]/.test(rest[0])) {
      // group a run of punctuation into one token, as the hand-written samples do
      let j = 0;
      while (j < rest.length && /[{}()[\].,:;=&*<>!?\\|+-]/.test(rest[j])) j++;
      push('pun', rest.slice(0, j));
      i += j;
      continue;
    }

    plain += rest[0];
    i += 1;
  }

  flush();
  return out.length ? out : [['', '']];
}

const tab = (label: string, code: string): CodeTab => ({
  label,
  lines: code.split('\n').map(tokenizeLine),
});

/* ─── Sample spec ──────────────────────────────────────────────────────────── */

interface ApiSample {
  /** client namespace: `client.<resource>.<action>(...)` */
  resource: string;
  action: string;
  /** the `// ...` line above the call */
  comment: string;
  /** request body, as [camelCaseKey, literal] — literals keep their own quotes */
  params: [string, string][];
  /** absolute URL for the cURL tab */
  endpoint: string;
  /** local variable holding the response, and the field printed from it */
  resultVar: string;
  resultField: string;
  resultLabel: string;
  /** type names for the statically-typed tabs */
  goStruct: string;
  javaType: string;
  javaParams: string;
}

const snake = (s: string) => s.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);
const pascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Longest key width, so struct/dict literals line their values up. */
const pad = (keys: string[]) => Math.max(...keys.map(k => k.length));

function nodeTab(s: ApiSample, ts: boolean): string {
  const semi = ts ? ';' : '';
  const type = ts ? `: ${s.javaType}` : '';
  const bang = ts ? '!' : '';
  const imp = ts
    ? "import { WhiteBooks } from '@whitebooks/node';"
    : "import WhiteBooks from '@whitebooks/node'";
  const body = s.params.map(([k, v]) => `  ${k}: ${v},`).join('\n');
  return `${imp}

const client = new WhiteBooks({
  apiKey: process.env.WB_API_KEY${bang},
  sandbox: false,
});

// ${s.comment}
const ${s.resultVar}${type} = await client.${s.resource}.${s.action}({
${body}
});

console.log("${s.resultLabel}:", ${s.resultVar}.${s.resultField})${semi}`;
}

function pythonTab(s: ApiSample): string {
  const body = s.params.map(([k, v]) => `  ${snake(k)}=${v},`).join('\n');
  return `import whitebooks

client = whitebooks.Client(
  api_key="sk_live_...",
  sandbox=False,
)

# ${s.comment}
${s.resultVar} = client.${snake(s.resource)}.${snake(s.action)}(
${body}
)

print(${s.resultVar}.${snake(s.resultField)})`;
}

function javaTab(s: ApiSample): string {
  const body = s.params
    .map(([k, v]) => `        .${k}(${v})`)
    .join('\n');
  return `import dev.whitebooks.WhiteBooks;

WhiteBooks client = WhiteBooks.builder()
    .apiKey(System.getenv("WB_API_KEY"))
    .sandbox(false)
    .build();

// ${s.comment}
${s.javaType} ${s.resultVar} = client.${s.resource}().${s.action}(
    ${s.javaParams}.builder()
${body}
        .build()
);`;
}

function goTab(s: ApiSample): string {
  const keys = s.params.map(([k]) => pascal(k));
  const width = pad(keys);
  const body = s.params
    .map(([, v], n) => `    ${keys[n]}:${' '.repeat(width - keys[n].length + 1)}${v},`)
    .join('\n');
  return `import "github.com/whitebooks/whitebooks-go"

client := whitebooks.NewClient(
    os.Getenv("WB_API_KEY"),
    whitebooks.WithSandbox(false),
)

// ${s.comment}
${s.resultVar}, err := client.${pascal(s.resource)}.${pascal(s.action)}(ctx, &whitebooks.${s.goStruct}{
${body}
})

fmt.Println("${s.resultLabel}:", ${s.resultVar}.${pascal(s.resultField)})`;
}

function phpTab(s: ApiSample): string {
  const body = s.params
    .map(([k, v]) => `    '${snake(k)}' => ${v},`)
    .join('\n');
  return `use WhiteBooks\\Client;

$client = new Client([
    'api_key' => getenv('WB_API_KEY'),
    'sandbox' => false,
]);

// ${s.comment}
$${s.resultVar} = $client->${snake(s.resource)}->${snake(s.action)}([
${body}
]);

echo $${s.resultVar}->${snake(s.resultField)};`;
}

function curlTab(s: ApiSample): string {
  // one field per line — a single-line JSON body overflows the block and scrolls
  const fields = s.params.map(([k, v]) => `"${k}":${v.replace(/'/g, '"')}`);
  const body = fields
    .map((f, n) => {
      if (n === 0) return `  -d '{${f},`;
      return n === fields.length - 1 ? `    ${f}}'` : `    ${f},`;
    })
    .join('\n');
  return `curl -X POST \\
  "${s.endpoint}" \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
${body}`;
}

function buildTabs(s: ApiSample): CodeTab[] {
  return [
    tab('Node.js', nodeTab(s, false)),
    tab('Python', pythonTab(s)),
    tab('TypeScript', nodeTab(s, true)),
    tab('Java', javaTab(s)),
    tab('Go', goTab(s)),
    tab('PHP', phpTab(s)),
    tab('cURL', curlTab(s)),
  ];
}

/* ─── The four APIs ────────────────────────────────────────────────────────── */

/** POST /gstr3b/retfile — the endpoint the GST API hero leads with. */
export const GST_API_HERO_TABS = buildTabs({
  resource: 'gst',
  action: 'fileGstr3b',
  comment: 'File GSTR-3B for a return period',
  params: [
    ['gstin', '"29AAGCW7302R1ZF"'],
    ['returnPeriod', '"062026"'],
    ['signType', '"EVC"'],
  ],
  endpoint: 'https://api.whitebooks.dev/v3/gst/gstr3b/retfile',
  resultVar: 'ret',
  resultField: 'arn',
  resultLabel: 'ARN',
  goStruct: 'Gstr3bParams',
  javaType: 'Gstr3bFiling',
  javaParams: 'Gstr3bParams',
});

/** POST /einvoice/type/GENERATE — IRN generation. */
export const E_INVOICE_API_HERO_TABS = buildTabs({
  resource: 'einvoice',
  action: 'generate',
  comment: 'Generate an e-invoice (IRN)',
  params: [
    ['gstin', '"29AAGCW7302R1ZF"'],
    ['invoiceType', '"B2B"'],
    ['invoiceNumber', '"INV-001"'],
    ['invoiceDate', '"2026-07-29"'],
  ],
  endpoint: 'https://api.whitebooks.dev/v3/einvoice/generate',
  resultVar: 'irn',
  resultField: 'irn',
  resultLabel: 'IRN',
  goStruct: 'EinvoiceParams',
  javaType: 'Einvoice',
  javaParams: 'EinvoiceParams',
});

/** POST /ewayapi/genewaybill — auto-populated from an existing IRN. */
export const E_WAY_BILL_API_HERO_TABS = buildTabs({
  resource: 'ewaybill',
  action: 'generate',
  comment: 'Generate an e-way bill from an existing IRN',
  params: [
    ['irn', '"a5c1...9f2e"'],
    ['vehicleNumber', '"KA01AB1234"'],
    ['transportMode', '"Road"'],
    ['distance', '320'],
  ],
  endpoint: 'https://api.whitebooks.dev/v3/ewaybill/generate',
  resultVar: 'ewb',
  resultField: 'ewbNo',
  resultLabel: 'EWB',
  goStruct: 'EwayBillParams',
  javaType: 'EwayBill',
  javaParams: 'EwayBillParams',
});

/** POST /v1/ksa/einvoice/create — ZATCA Phase 2 clearance. */
export const KSA_E_INVOICE_API_HERO_TABS = buildTabs({
  resource: 'ksaEinvoice',
  action: 'create',
  comment: 'Sign and clear a ZATCA standard tax invoice',
  params: [
    ['vatNumber', '"300000000000003"'],
    ['invoiceType', '"STANDARD"'],
    ['invoiceNumber', '"INV-001"'],
    ['currency', '"SAR"'],
  ],
  endpoint: 'https://api.whitebooks.dev/v3/ksa/einvoice/create',
  resultVar: 'inv',
  resultField: 'uuid',
  resultLabel: 'UUID',
  goStruct: 'KsaInvoiceParams',
  javaType: 'KsaInvoice',
  javaParams: 'KsaInvoiceParams',
});
