import type { CodeTab } from './DpComponents';

export const heroTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'import'], ['', ' '], ['fn', 'WhiteBooks'], ['', ' '], ['kw', 'from'], ['', ' '], ['str', "'@whitebooks/node'"]],
      [['', '']],
      [['kw', 'const'], ['', ' client = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY'], ['pun', ',']],
      [['', '  sandbox: '], ['kw', 'false'], ['pun', ',']],
      [['pun', '});']],
      [['', '']],
      [['com', '// Generate an e-invoice (IRN)']],
      [['kw', 'const'], ['', ' irn = '], ['kw', 'await'], ['', ' client'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoiceType: '], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoiceNumber: '], ['str', '"INV-001"'], ['pun', ',']],
      [['', '  invoiceDate: '], ['str', '"2024-01-15"'], ['pun', ',']],
      [['pun', '});']],
      [['', '']],
      [['fn', 'console'], ['pun', '.'], ['fn', 'log'], ['pun', '('], ['str', '"IRN:"'], ['', ', irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
  {
    label: 'Python',
    lines: [
      [['kw', 'import'], ['', ' whitebooks']],
      [['', '']],
      [['fn', 'client'], ['', ' = whitebooks'], ['pun', '.'], ['fn', 'Client'], ['pun', '(']],
      [['', '  api_key='], ['str', '"sk_live_..."'], ['pun', ',']],
      [['', '  sandbox='], ['kw', 'False'], ['pun', ',']],
      [['pun', ')']],
      [['', '']],
      [['com', '# Generate an e-invoice (IRN)']],
      [['fn', 'irn'], ['', ' = client'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '(']],
      [['', '  gstin='], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoice_type='], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoice_number='], ['str', '"INV-001"'], ['pun', ',']],
      [['pun', ')']],
      [['', '']],
      [['fn', 'print'], ['pun', '('], ['fn', 'irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
  {
    label: 'cURL',
    lines: [
      [['fn', 'curl'], ['', ' -X POST \\']],
      [['str', '  "https://api.whitebooks.dev/v3/einvoice/generate"'], ['', ' \\']],
      [['', '  -H '], ['str', '"Authorization: Bearer sk_live_..."'], ['', ' \\']],
      [['', '  -H '], ['str', '"Content-Type: application/json"'], ['', ' \\']],
      [['', '  -d '], ['str', '\'{"gstin":"29AAGCW7302R1ZF",']],
      [['str', '    "invoiceType":"B2B",']],
      [['str', '    "invoiceNumber":"INV-001",']],
      [['str', '    "invoiceDate":"2024-01-15"}\'']],
    ],
  },
];

export const quickstartReqTabs: CodeTab[] = [
  {
    label: 'Request',
    lines: [
      [['com', '// 1. Install the SDK']],
      [['fn', 'npm'], ['', ' install @whitebooks/node']],
      [['', '']],
      [['com', '// 2. Initialize']],
      [['kw', 'const'], ['', ' wb = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({'], ['', ' apiKey '], ['pun', '})']],
      [['', '']],
      [['com', '// 3. Generate IRN']],
      [['kw', 'const'], ['', ' result = '], ['kw', 'await'], ['', ' wb'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '(payload)']],
    ],
  },
];

export const quickstartRespTabs: CodeTab[] = [
  {
    label: 'Response',
    lines: [
      [['pun', '{']],
      [['', '  '], ['key', '"irn"'], ['pun', ':'], ['', ' '], ['str', '"e9fc7b4b2c1a..."'], ['pun', ',']],
      [['', '  '], ['key', '"ackNo"'], ['pun', ':'], ['', ' '], ['num', '232410297398'], ['pun', ',']],
      [['', '  '], ['key', '"ackDt"'], ['pun', ':'], ['', ' '], ['str', '"2024-01-15T10:30:00"'], ['pun', ',']],
      [['', '  '], ['key', '"signedQRCode"'], ['pun', ':'], ['', ' '], ['str', '"MSME/2024/..."'], ['pun', ',']],
      [['', '  '], ['key', '"status"'], ['pun', ':'], ['', ' '], ['str', '"success"']],
      [['pun', '}']],
    ],
  },
];
