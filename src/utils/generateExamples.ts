import type { NormalizedOperation, OpenApiSpec } from '../data/openapi-spec';
import { generateExampleFromSchema } from './schemaHelpers';
import { resolveSchema } from './normalizeSpec';

function getRequestBodyExample(op: NormalizedOperation, spec: OpenApiSpec): string {
  if (!op.requestBody) return '';
  const content = op.requestBody.content['application/json'];
  if (!content?.schema) return '';
  const example = generateExampleFromSchema(content.schema, spec);
  return JSON.stringify(example, null, 2);
}

function getQueryParams(op: NormalizedOperation): string {
  const params = (op.parameters ?? []).filter(p => p.in === 'query');
  if (!params.length) return '';
  const qs = params.map(p => `${p.name}=${p.example ?? 'value'}`).join('&');
  return `?${qs}`;
}

function getHeaderParams(op: NormalizedOperation): Record<string, string> {
  const headers: Record<string, string> = {};
  const params = (op.parameters ?? []).filter(p => p.in === 'header');
  for (const p of params) {
    if (p.name === 'Authorization') {
      headers['Authorization'] = 'Bearer YOUR_TOKEN';
    } else {
      headers[p.name] = String(p.example ?? 'value');
    }
  }
  return headers;
}

export function generateCurl(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op)}`;
  const headers = getHeaderParams(op);
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

export function generateJavaScript(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec): string {
  const url = `${baseUrl}${op.path}${getQueryParams(op)}`;
  const headers = { ...getHeaderParams(op), ...(op.requestBody ? { 'Content-Type': 'application/json' } : {}) };
  const body = getRequestBodyExample(op, spec);

  const headerObj = JSON.stringify(headers, null, 2).replace(/"([^"]+)":/g, '$1:');

  let code = `const response = await fetch('${url}', {\n`;
  code += `  method: '${op.method}',\n`;
  code += `  headers: ${headerObj},\n`;
  if (body) code += `  body: JSON.stringify(${body}),\n`;
  code += `});\n\nconst data = await response.json();\nconsole.log(data);`;
  return code;
}

export function generateAxios(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec): string {
  const url = `${baseUrl}${op.path}`;
  const headers = getHeaderParams(op);
  const body = getRequestBodyExample(op, spec);
  const params = (op.parameters ?? []).filter(p => p.in === 'query');

  let code = `import axios from 'axios';\n\n`;
  code += `const { data } = await axios.${op.method.toLowerCase()}(\n  '${url}',\n`;

  if (body) code += `  ${body},\n`;

  const config: Record<string, unknown> = {};
  if (Object.keys(headers).length) config.headers = headers;
  if (params.length) config.params = Object.fromEntries(params.map(p => [p.name, p.example ?? 'value']));

  if (Object.keys(config).length) {
    code += `  ${JSON.stringify(config, null, 2)}\n`;
  }

  code += `);\n\nconsole.log(data);`;
  return code;
}

export function generatePython(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec): string {
  const url = `${baseUrl}${op.path}`;
  const headers = getHeaderParams(op);
  const body = getRequestBodyExample(op, spec);
  const params = (op.parameters ?? []).filter(p => p.in === 'query');

  let code = `import requests\n\n`;

  if (Object.keys(headers).length) {
    code += `headers = ${JSON.stringify(headers, null, 4)}\n\n`;
  }
  if (params.length) {
    const paramsObj = Object.fromEntries(params.map(p => [p.name, p.example ?? 'value']));
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

export function getAllExamples(op: NormalizedOperation, baseUrl: string, spec: OpenApiSpec) {
  return {
    cURL: generateCurl(op, baseUrl, spec),
    JavaScript: generateJavaScript(op, baseUrl, spec),
    Axios: generateAxios(op, baseUrl, spec),
    Python: generatePython(op, baseUrl, spec),
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
