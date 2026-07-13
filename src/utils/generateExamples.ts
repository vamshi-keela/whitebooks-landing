import type { NormalizedOperation, OpenApiSpec } from '@/data/openapi-spec';
import { generateExampleFromSchema } from './schemaHelpers';
import { resolveSchema } from './normalizeSpec';

function getRequestBodyExample(op: NormalizedOperation, spec: OpenApiSpec): string {
  if (!op.requestBody) return '';
  const content = op.requestBody.content['application/json'];
  if (!content?.schema) return '';
  const example = generateExampleFromSchema(content.schema, spec);
  return JSON.stringify(example, null, 2);
}

/** User-entered playground values; fall back to spec examples when empty. */
export interface ExampleOverrides {
  query?: Record<string, string>;
  headers?: Record<string, string>;
}

const entered = (v: string | undefined): string | undefined =>
  v?.trim() ? v.trim() : undefined;

function getQueryParams(op: NormalizedOperation, ov?: ExampleOverrides): string {
  const params = (op.parameters ?? []).filter(p => p.in === 'query');
  if (!params.length) return '';
  const qs = params
    .map(p => `${p.name}=${entered(ov?.query?.[p.name]) ?? p.example ?? 'value'}`)
    .join('&');
  return `?${qs}`;
}

function getHeaderParams(op: NormalizedOperation, ov?: ExampleOverrides): Record<string, string> {
  const headers: Record<string, string> = {};
  const params = (op.parameters ?? []).filter(p => p.in === 'header');
  for (const p of params) {
    const user = entered(ov?.headers?.[p.name]);
    if (user !== undefined) {
      headers[p.name] = user;
    } else if (p.name === 'Authorization') {
      headers['Authorization'] = 'Bearer YOUR_TOKEN';
    } else {
      headers[p.name] = String(p.example ?? 'value');
    }
  }
  return headers;
}

export function generateCurl(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op, ov)}`;
  const headers = getHeaderParams(op, ov);
  const body = getRequestBodyExample(op, spec);

  const lines = [`curl -X ${op.method} "${url}"`];
  for (const [k, v] of Object.entries(headers)) {
    lines.push(`  -H "${k}: ${v}"`);
  }
  if (body) {
    lines.push(`  -H "Content-Type: application/json"`);
    lines.push(`  -d '${body.replace(/\n/g, '\n       ')}'`);
  }
  return lines.join(' \\\n');
}

/** Shared fetch-based snippet used by both the Node.js and TypeScript tabs. */
function generateFetch(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, typed: boolean, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op, ov)}`;
  const headers = { ...getHeaderParams(op, ov), ...(op.requestBody ? { 'Content-Type': 'application/json' } : {}) };
  const body = getRequestBodyExample(op, spec);

  const headerObj = JSON.stringify(headers, null, 2).replace(/"([^"]+)":/g, '$1:');

  let code = `const response${typed ? ': Response' : ''} = await fetch('${url}', {\n`;
  code += `  method: '${op.method}',\n`;
  code += `  headers: ${headerObj},\n`;
  if (body) code += `  body: JSON.stringify(${body}),\n`;
  code += `});\n\nconst data${typed ? ': unknown' : ''} = await response.json();\nconsole.log(data);`;
  return code;
}

export function generateNode(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  return generateFetch(op, baseUrl, spec, false, ov);
}

export function generateTypeScript(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  return generateFetch(op, baseUrl, spec, true, ov);
}

export function generateJava(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op, ov)}`;
  const headers = getHeaderParams(op, ov);
  const body = getRequestBodyExample(op, spec);

  let code = `import java.net.URI;\n`;
  code += `import java.net.http.HttpClient;\n`;
  code += `import java.net.http.HttpRequest;\n`;
  code += `import java.net.http.HttpResponse;\n\n`;
  code += `HttpClient client = HttpClient.newHttpClient();\n\n`;
  code += `HttpRequest request = HttpRequest.newBuilder()\n`;
  code += `    .uri(URI.create("${url}"))\n`;
  for (const [k, v] of Object.entries(headers)) {
    code += `    .header("${k}", "${v}")\n`;
  }
  if (body) {
    code += `    .header("Content-Type", "application/json")\n`;
    const payload = body.replace(/\n/g, '\n            ').replace(/"/g, '\\"');
    code += `    .method("${op.method}", HttpRequest.BodyPublishers.ofString("${payload}"))\n`;
  } else {
    code += `    .method("${op.method}", HttpRequest.BodyPublishers.noBody())\n`;
  }
  code += `    .build();\n\n`;
  code += `HttpResponse<String> response = client.send(\n`;
  code += `    request, HttpResponse.BodyHandlers.ofString());\n\n`;
  code += `System.out.println(response.body());`;
  return code;
}

export function generateGo(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op, ov)}`;
  const headers = getHeaderParams(op, ov);
  const body = getRequestBodyExample(op, spec);

  let code = `package main\n\n`;
  code += `import (\n`;
  code += `\t"fmt"\n`;
  code += `\t"io"\n`;
  code += `\t"net/http"\n`;
  if (body) code += `\t"strings"\n`;
  code += `)\n\n`;
  code += `func main() {\n`;
  if (body) {
    code += `\tpayload := strings.NewReader(\`${body}\`)\n\n`;
    code += `\treq, _ := http.NewRequest("${op.method}", "${url}", payload)\n`;
  } else {
    code += `\treq, _ := http.NewRequest("${op.method}", "${url}", nil)\n`;
  }
  for (const [k, v] of Object.entries(headers)) {
    code += `\treq.Header.Set("${k}", "${v}")\n`;
  }
  if (body) code += `\treq.Header.Set("Content-Type", "application/json")\n`;
  code += `\n\tres, _ := http.DefaultClient.Do(req)\n`;
  code += `\tdefer res.Body.Close()\n\n`;
  code += `\tdata, _ := io.ReadAll(res.Body)\n`;
  code += `\tfmt.Println(string(data))\n`;
  code += `}`;
  return code;
}

export function generatePHP(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op, ov)}`;
  const headers = getHeaderParams(op, ov);
  const body = getRequestBodyExample(op, spec);

  const headerLines = Object.entries(headers).map(([k, v]) => `    "${k}: ${v}"`);
  if (body) headerLines.push(`    "Content-Type: application/json"`);

  let code = `<?php\n\n`;
  code += `$curl = curl_init();\n\n`;
  code += `curl_setopt_array($curl, [\n`;
  code += `    CURLOPT_URL => "${url}",\n`;
  code += `    CURLOPT_RETURNTRANSFER => true,\n`;
  code += `    CURLOPT_CUSTOMREQUEST => "${op.method}",\n`;
  if (body) {
    const payload = body.replace(/\n/g, '\n        ').replace(/"/g, '\\"');
    code += `    CURLOPT_POSTFIELDS => "${payload}",\n`;
  }
  if (headerLines.length) {
    code += `    CURLOPT_HTTPHEADER => [\n${headerLines.join(',\n')}\n    ],\n`;
  }
  code += `]);\n\n`;
  code += `$response = curl_exec($curl);\ncurl_close($curl);\n\n`;
  code += `echo $response;`;
  return code;
}

export function generatePython(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides): string {
  const url = `${baseUrl}${op.path}`;
  const headers = getHeaderParams(op, ov);
  const body = getRequestBodyExample(op, spec);
  const params = (op.parameters ?? []).filter(p => p.in === 'query');

  let code = `import requests\n\n`;

  if (Object.keys(headers).length) {
    code += `headers = ${JSON.stringify(headers, null, 4)}\n\n`;
  }
  if (params.length) {
    const paramsObj = Object.fromEntries(
      params.map(p => [p.name, entered(ov?.query?.[p.name]) ?? p.example ?? 'value']),
    );
    code += `params = ${JSON.stringify(paramsObj, null, 4)}\n\n`;
  }
  if (body) {
    code += `payload = ${body}\n\n`;
  }

  code += `response = requests.${op.method.toLowerCase()}(\n`;
  code += `    "${url}",\n`;
  if (Object.keys(headers).length) code += `    headers=headers,\n`;
  if (params.length) code += `    params=params,\n`;
  if (body) code += `    json=payload,\n`;
  code += `)\n\nprint(response.json())`;
  return code;
}

export function getAllExamples(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec, ov?: ExampleOverrides) {
  return {
    'Node.js': generateNode(op, baseUrl, spec, ov),
    Python: generatePython(op, baseUrl, spec, ov),
    TypeScript: generateTypeScript(op, baseUrl, spec, ov),
    Java: generateJava(op, baseUrl, spec, ov),
    Go: generateGo(op, baseUrl, spec, ov),
    PHP: generatePHP(op, baseUrl, spec, ov),
    cURL: generateCurl(op, baseUrl, spec, ov),
  };
}

// Used by ResponseViewer to show example response
export function getResponseExample(op: NormalizedOperation, statusCode: string, spec: OpenApiSpec): string {
  const resp = op.responses?.[statusCode];
  if (!resp) return '';
  const content = resp.content?.['application/json'];
  if (!content) return '';
  if (content.example !== undefined) return JSON.stringify(content.example, null, 2);
  if (content.schema) {
    const resolved = resolveSchema(spec, content.schema);
    const example = generateExampleFromSchema(resolved, spec);
    return JSON.stringify(example, null, 2);
  }
  return '';
}
