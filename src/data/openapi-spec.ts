import gstApi from '../assets/OpenApiSpecJson/gst-api.json';
import eWayBillApi from '../assets/OpenApiSpecJson/e-way-bill-api.json';
import eInvoiceApi from '../assets/OpenApiSpecJson/e-invoice-api.json';
import ksaApi from '../assets/OpenApiSpecJson/ksa-e-invoice.json';

/* ─── OpenAPI 3.0 Type System ──────────────────────────────────────────────── */

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
export type NormalizedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface SchemaObject {
  type?: string;
  title?: string;
  description?: string;
  example?: unknown;
  properties?: Record<string, SchemaOrRef>;
  items?: SchemaOrRef;
  required?: string[];
  enum?: unknown[];
  nullable?: boolean;
  format?: string;
  $ref?: string;
  allOf?: SchemaOrRef[];
  oneOf?: SchemaOrRef[];
  anyOf?: SchemaOrRef[];
  additionalProperties?: SchemaOrRef | boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  maxItems?: number;
  minItems?: number;
  pattern?: string;
  default?: unknown;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
}

export type SchemaOrRef = SchemaObject | { $ref: string };

export interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaOrRef;
  example?: unknown;
}

export interface MediaTypeObject {
  schema?: SchemaOrRef;
  example?: unknown;
  examples?: Record<string, { value: unknown; summary?: string }>;
}

export interface RequestBodyObject {
  description?: string;
  required?: boolean;
  content: Record<string, MediaTypeObject>;
}

export interface ResponseObject {
  description: string;
  content?: Record<string, MediaTypeObject>;
}

export interface OperationObject {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses?: Record<string, ResponseObject>;
  security?: Record<string, string[]>[];
  deprecated?: boolean;
}

export interface PathItemObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  delete?: OperationObject;
  patch?: OperationObject;
  parameters?: ParameterObject[];
}

export interface TagObject {
  name: string;
  description?: string;
}

export interface ComponentsObject {
  schemas?: Record<string, SchemaObject>;
  responses?: Record<string, ResponseObject>;
  parameters?: Record<string, ParameterObject>;
  requestBodies?: Record<string, RequestBodyObject>;
}

export interface OpenApiSpec {
  openapi: string;
  info: { title: string; version: string; description?: string };
  servers?: Array<{ url: string; description?: string }>;
  tags?: TagObject[];
  paths: Record<string, PathItemObject>;
  components?: ComponentsObject;
}

export interface NormalizedOperation {
  id: string;
  method: NormalizedMethod;
  path: string;
  tag: string;
  summary: string;
  description?: string;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses?: Record<string, ResponseObject>;
  deprecated?: boolean;
}

/* ─── Placeholder spec ─────────────────────────────────────────────────────────
   Replace the value below with your real OpenAPI 3.0 JSON spec.
   The schema structure is typed above — drop in any spec and the renderer
   will handle it generically.
   ─────────────────────────────────────────────────────────────────────────── */
export type ApiSpecKey = 'gst-api' | 'e-way-bill-api' | 'e-invoice-api' | 'ksa-e-invoice-api';

export function openApiSpec(api: ApiSpecKey): OpenApiSpec {
  switch (api) {
    case 'gst-api':
      return gstApi as unknown as OpenApiSpec;
    case 'e-way-bill-api':
      return eWayBillApi as unknown as OpenApiSpec;
    case 'e-invoice-api':
      return eInvoiceApi as unknown as OpenApiSpec;
    case 'ksa-e-invoice-api':
      return ksaApi as unknown as OpenApiSpec;
  }
}



/*
{
  openapi: '3.0.0',
  info: {
    title: 'WhiteBooks GST API',
    version: '1.0.0',
    description: 'GST compliance, filing, reconciliation, and e-Invoicing APIs powered by WhiteBooks GSP infrastructure.',
  },
  servers: [
    { url: 'https://api.whitebooks.in', description: 'Production' },
    { url: 'https://apisandbox.whitebooks.in', description: 'Sandbox' },
  ],
  tags: [
    { name: 'Public', description: 'Public API' },
    { name: 'Authentication', description: 'Authentication API' },
    { name: 'GSTR', description: 'GSTR API' },
    { name: 'GSTR1', description: 'GSTR1 API' },
    { name: 'GSTR1A', description: 'GSTR1A API' },
    { name: 'GSTR2A', description: 'GSTR2A API' },
    { name: 'GSTR2B', description: 'GSTR2B API' },
    { name: 'GSTR2X', description: 'GSTR2X API' },
    { name: 'GSTR3B', description: 'GSTR3B API' },
    { name: 'GSTR4', description: 'GSTR4 API' },
    { name: 'GSTR4A', description: 'GSTR4A API' },
    { name: 'GSTR4Annual', description: 'GSTR4Annual API' },
    { name: 'GSTR5', description: 'GSTR5 API' },
    { name: 'GSTR6', description: 'GSTR6 API' },
    { name: 'GSTR6A', description: 'GSTR6A API' },
    { name: 'GSTR7', description: 'GSTR7 API' },
    { name: 'GSTR8', description: 'GSTR8 API' },
    { name: 'GSTR9', description: 'GSTR9 API' },
    { name: 'GSTR9A', description: 'GSTR9A API' },
    { name: 'GSTR9C', description: 'GSTR9C API' },
    { name: 'SPIKE', description: 'SPIKE API' },
    { name: 'ALL', description: 'All API Overview' },
    { name: 'ITC03', description: 'ITC03 API' },
    { name: 'ITC04', description: 'ITC04 API' },
    { name: 'CMP', description: 'CMP API' },
    { name: 'Payment', description: 'Payment API' },
    { name: 'Ledger', description: 'GST Ledger' },
    { name: 'e-Invoice', description: 'e-Invoice API' },
  ],
  components: {
    schemas: {
      GstinVerifyResponse: {
        type: 'object',
        properties: {
          gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
          trade_name: { type: 'string', example: 'Acme Pvt Ltd' },
          legal_name: { type: 'string', example: 'Acme Private Limited' },
          state: { type: 'string', example: 'Karnataka' },
          state_code: { type: 'string', example: '29' },
          status: { type: 'string', enum: ['Active', 'Inactive', 'Suspended', 'Cancelled'], example: 'Active' },
          taxpayer_type: { type: 'string', example: 'Regular' },
          reg_date: { type: 'string', format: 'date', example: '2020-01-01' },
          cancelled_date: { type: 'string', nullable: true },
          principal_address: {
            type: 'object',
            properties: {
              building: { type: 'string' },
              street: { type: 'string' },
              city: { type: 'string' },
              pincode: { type: 'string' },
            },
          },
        },
      },
      Gstr1B2bInvoiceItem: {
        type: 'object',
        description: 'Individual line item tax details',
        properties: {
          num: { type: 'integer', description: 'Line item serial number', example: 1 },
          itm_det: {
            type: 'object',
            description: 'Tax breakdown for the line item',
            required: ['txval', 'rt'],
            properties: {
              txval: { type: 'number', description: 'Taxable value', example: 10000 },
              rt: { type: 'number', description: 'GST rate (%)', example: 18 },
              iamt: { type: 'number', description: 'Integrated GST amount', example: 1800 },
              camt: { type: 'number', description: 'Central GST amount', example: 0 },
              samt: { type: 'number', description: 'State GST amount', example: 0 },
              csamt: { type: 'number', description: 'Cess amount', example: 0 },
            },
          },
        },
      },
      Gstr1B2bInvoice: {
        type: 'object',
        description: 'B2B invoice details',
        required: ['inum', 'idt', 'val', 'itms'],
        properties: {
          inum: { type: 'string', description: 'Invoice number', example: 'INV-2026-001', maxLength: 16 },
          idt: { type: 'string', description: 'Invoice date (DD-MM-YYYY)', example: '01-01-2026' },
          val: { type: 'number', description: 'Total invoice value including tax', example: 11800 },
          pos: { type: 'string', description: 'Place of supply state code', example: '29' },
          rchrg: { type: 'string', enum: ['Y', 'N'], description: 'Reverse charge applicable', example: 'N' },
          inv_typ: { type: 'string', enum: ['R', 'DE', 'SEWP', 'SEWOP', 'CBW'], description: 'Invoice type', example: 'R' },
          etin: { type: 'string', description: 'E-commerce operator GSTIN', nullable: true },
          itms: { type: 'array', items: { $ref: '#/components/schemas/Gstr1B2bInvoiceItem' }, description: 'Line items' },
        },
      },
      Gstr1B2bEntry: {
        type: 'object',
        description: 'B2B supplies grouped by counterparty GSTIN',
        required: ['ctin', 'inv'],
        properties: {
          ctin: { type: 'string', description: 'Counterparty GSTIN', example: '27BBBBB1111B1ZW', minLength: 15, maxLength: 15 },
          inv: { type: 'array', items: { $ref: '#/components/schemas/Gstr1B2bInvoice' }, description: 'List of invoices for this counterparty' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'error' },
          error_code: { type: 'string', example: 'AUTH_001' },
          message: { type: 'string', example: 'Invalid or expired token' },
          request_id: { type: 'string', example: 'req_abc123' },
        },
      },
    },
  },
  paths: {
    '/gstin/verify': {
      get: {
        tags: ['Public'],
        summary: 'Verify GSTIN',
        description: 'Validate a GSTIN and retrieve the registered taxpayer details from the GSTN database. No authentication required.',
        operationId: 'verifyGstin',
        parameters: [
          { name: 'gstin', in: 'query', required: true, schema: { type: 'string', minLength: 15, maxLength: 15 }, description: '15-character GSTIN to verify', example: '29AAAAA0000A1Z5' },
        ],
        responses: {
          '200': { description: 'GSTIN found and active', content: { 'application/json': { schema: { $ref: '#/components/schemas/GstinVerifyResponse' } } } },
          '404': { description: 'GSTIN not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/authenticate': {
      post: {
        tags: ['Authentication'],
        summary: 'Get OAuth2 bearer token',
        description: 'Exchange client credentials for a short-lived bearer token. Tokens expire after 3600 seconds and must be refreshed.',
        operationId: 'authenticate',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['client_id', 'client_secret', 'gstin', 'otp'],
                properties: {
                  client_id: { type: 'string', description: 'Your API client ID', example: 'wb_client_xxx' },
                  client_secret: { type: 'string', description: 'Your API client secret', example: 'wb_secret_xxx', format: 'password' },
                  gstin: { type: 'string', description: 'GSTIN for which the token is requested', example: '29AAAAA0000A1Z5' },
                  otp: { type: 'string', description: 'OTP sent to registered mobile (use 575757 in sandbox)', example: '575757' },
                  txn: { type: 'string', description: 'Transaction reference from OTP trigger', example: 'txn_abc123' },
                  state_cd: { type: 'string', description: 'State code (2 digits)', example: '29' },
                  ip_address: { type: 'string', description: 'Client IP address for IP allow-listing', example: '103.21.244.1' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Authentication successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        auth_token: { type: 'string', description: 'Bearer token for subsequent API calls', example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        expiry: { type: 'integer', description: 'Token expiry in seconds', example: 3600 },
                        gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': { description: 'Invalid credentials or OTP', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/authenticate/otp': {
      post: {
        tags: ['Authentication'],
        summary: 'Trigger OTP for authentication',
        description: 'Send an OTP to the mobile number registered with the GSTN for the given GSTIN. Required before calling /authenticate.',
        operationId: 'triggerOtp',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['client_id', 'gstin'],
                properties: {
                  client_id: { type: 'string', example: 'wb_client_xxx' },
                  gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OTP sent successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    txn: { type: 'string', description: 'Transaction ID — pass to /authenticate', example: 'txn_abc123' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/gstr1/retsave': {
      post: {
        tags: ['GSTR1'],
        summary: 'Save GSTR-1 return data',
        description: 'Save outward supply details for the GSTR-1 return. Supports B2B, B2CL, CDNR, exports, HSN summary, and document summary tables. Data is saved in draft state until /gstr1/retsubmit is called.',
        operationId: 'gstr1RetSave',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' }, description: 'Bearer {auth_token}' },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['gstin', 'ret_period'],
                properties: {
                  gstin: { type: 'string', description: '15-character GSTIN of the filing entity', example: '29AAAAA0000A1Z5', minLength: 15, maxLength: 15 },
                  ret_period: { type: 'string', description: 'Return period in MMYYYY format', example: '012026' },
                  b2b: { type: 'array', description: 'B2B outward supplies (registered buyers)', items: { $ref: '#/components/schemas/Gstr1B2bEntry' } },
                  b2ba: {
                    type: 'array',
                    description: 'B2B amended supplies — amendments to previously filed B2B invoices',
                    items: {
                      type: 'object',
                      properties: {
                        ogstin: { type: 'string', description: 'Original counterparty GSTIN', example: '27BBBBB1111B1ZW' },
                        inv: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              oinum: { type: 'string', description: 'Original invoice number', example: 'INV-2025-001' },
                              oidt: { type: 'string', description: 'Original invoice date', example: '01-12-2025' },
                              inum: { type: 'string', description: 'Amended invoice number', example: 'INV-2026-001-A' },
                              idt: { type: 'string', description: 'Amended invoice date', example: '01-01-2026' },
                              val: { type: 'number', example: 12000 },
                              pos: { type: 'string', example: '29' },
                              rchrg: { type: 'string', enum: ['Y', 'N'] },
                              itms: { type: 'array', items: { $ref: '#/components/schemas/Gstr1B2bInvoiceItem' } },
                            },
                          },
                        },
                      },
                    },
                  },
                  b2cl: {
                    type: 'array',
                    description: 'B2C large supplies — unregistered buyers, inter-state, invoice value > ₹2.5L',
                    items: {
                      type: 'object',
                      required: ['pos', 'inv'],
                      properties: {
                        pos: { type: 'string', description: 'Place of supply state code', example: '27' },
                        inv: {
                          type: 'array',
                          items: {
                            type: 'object',
                            required: ['inum', 'idt', 'val'],
                            properties: {
                              inum: { type: 'string', example: 'B2CL-001' },
                              idt: { type: 'string', example: '15-01-2026' },
                              val: { type: 'number', example: 300000 },
                              etin: { type: 'string', nullable: true },
                              itms: { type: 'array', items: { $ref: '#/components/schemas/Gstr1B2bInvoiceItem' } },
                            },
                          },
                        },
                      },
                    },
                  },
                  cdnr: {
                    type: 'array',
                    description: 'Credit/Debit notes for registered buyers',
                    items: {
                      type: 'object',
                      required: ['ctin', 'nt'],
                      properties: {
                        ctin: { type: 'string', description: 'Counterparty GSTIN', example: '27BBBBB1111B1ZW' },
                        nt: {
                          type: 'array',
                          description: 'Note list',
                          items: {
                            type: 'object',
                            required: ['ntty', 'nt_num', 'nt_dt', 'val'],
                            properties: {
                              ntty: { type: 'string', enum: ['C', 'D'], description: 'Note type: C=Credit, D=Debit' },
                              nt_num: { type: 'string', description: 'Note number', example: 'CN-001' },
                              nt_dt: { type: 'string', description: 'Note date', example: '05-01-2026' },
                              val: { type: 'number', description: 'Note value', example: 1180 },
                              pos: { type: 'string', example: '29' },
                              rchrg: { type: 'string', enum: ['Y', 'N'] },
                              itms: { type: 'array', items: { $ref: '#/components/schemas/Gstr1B2bInvoiceItem' } },
                            },
                          },
                        },
                      },
                    },
                  },
                  exp: {
                    type: 'array',
                    description: 'Export supplies',
                    items: {
                      type: 'object',
                      required: ['exp_typ', 'inv'],
                      properties: {
                        exp_typ: { type: 'string', enum: ['WPAY', 'WOPAY'], description: 'Export type: With/Without payment of IGST' },
                        inv: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              inum: { type: 'string', example: 'EXP-001' },
                              idt: { type: 'string', example: '10-01-2026' },
                              val: { type: 'number', example: 500000 },
                              sbnum: { type: 'string', description: 'Shipping bill number', example: 'SB12345' },
                              sbdt: { type: 'string', description: 'Shipping bill date', example: '11-01-2026' },
                              sbpcode: { type: 'string', description: 'Port code', example: 'INBOM4' },
                              itms: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    txval: { type: 'number', example: 500000 },
                                    rt: { type: 'number', example: 0 },
                                    iamt: { type: 'number', example: 0 },
                                    csamt: { type: 'number', example: 0 },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  b2cs: {
                    type: 'array',
                    description: 'B2C small supplies — unregistered buyers, intra-state or inter-state ≤ ₹2.5L',
                    items: {
                      type: 'object',
                      required: ['sply_tp', 'pos', 'rt', 'txval'],
                      properties: {
                        sply_tp: { type: 'string', enum: ['INTRA', 'INTER'], description: 'Supply type' },
                        pos: { type: 'string', description: 'Place of supply', example: '29' },
                        rt: { type: 'number', description: 'GST rate', example: 18 },
                        txval: { type: 'number', description: 'Total taxable value for this rate', example: 50000 },
                        iamt: { type: 'number', example: 0 },
                        camt: { type: 'number', example: 4500 },
                        samt: { type: 'number', example: 4500 },
                        csamt: { type: 'number', example: 0 },
                      },
                    },
                  },
                  hsn: {
                    type: 'object',
                    description: 'HSN/SAC wise summary of outward supplies',
                    properties: {
                      data: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['num', 'hsn_sc', 'desc', 'uqc', 'qty', 'val'],
                          properties: {
                            num: { type: 'integer', description: 'Serial number', example: 1 },
                            hsn_sc: { type: 'string', description: 'HSN/SAC code', example: '8517' },
                            desc: { type: 'string', description: 'Description', example: 'Telephone sets, smartphones' },
                            uqc: { type: 'string', description: 'Unit of measure', example: 'NOS' },
                            qty: { type: 'number', description: 'Total quantity', example: 100 },
                            val: { type: 'number', description: 'Total value', example: 1000000 },
                            txval: { type: 'number', description: 'Taxable value', example: 847458 },
                            iamt: { type: 'number', example: 152542 },
                            camt: { type: 'number', example: 0 },
                            samt: { type: 'number', example: 0 },
                            csamt: { type: 'number', example: 0 },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Return data saved successfully in draft state',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    reference_id: { type: 'string', description: 'WhiteBooks reference ID for this save operation', example: 'WB-REF-20260101-001' },
                    gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                    ret_period: { type: 'string', example: '012026' },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid request data', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Unauthorized — invalid or expired token', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/gstr1/retsubmit': {
      post: {
        tags: ['GSTR1'],
        summary: 'Submit GSTR-1 return',
        description: 'Submit the GSTR-1 return that was previously saved in draft state. Once submitted, the return is locked and cannot be amended except through GSTR-1A.',
        operationId: 'gstr1RetSubmit',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' }, description: 'Bearer {auth_token}' },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['gstin', 'ret_period'],
                properties: {
                  gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                  ret_period: { type: 'string', example: '012026' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Return submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    ack_num: { type: 'string', description: 'GSTN acknowledgement number', example: 'AA2601200105551' },
                    ack_dt: { type: 'string', description: 'Acknowledgement date-time', example: '2026-01-15T10:30:00+05:30' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/gstr3b/retsave': {
      post: {
        tags: ['GSTR3B'],
        summary: 'Save GSTR-3B summary',
        description: 'Save the GSTR-3B summary return with aggregated tax liability, ITC claimed, and net tax payable.',
        operationId: 'gstr3bRetSave',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['gstin', 'ret_period', 'sup_details', 'itc_elg', 'intr_ltfee'],
                properties: {
                  gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                  ret_period: { type: 'string', example: '012026' },
                  sup_details: {
                    type: 'object',
                    description: 'Outward and reverse charge inward supplies',
                    properties: {
                      osup_det: {
                        type: 'object',
                        description: 'Other outward supplies (Taxable)',
                        properties: {
                          txval: { type: 'number', example: 1000000 },
                          iamt: { type: 'number', example: 180000 },
                          camt: { type: 'number', example: 0 },
                          samt: { type: 'number', example: 0 },
                          csamt: { type: 'number', example: 0 },
                        },
                      },
                      osup_zero: { type: 'object', description: 'Outward taxable supplies (Zero rated)', properties: { txval: { type: 'number' }, iamt: { type: 'number' } } },
                      osup_nil_exmp: { type: 'object', description: 'Other outward supplies (Nil rated, exempt)', properties: { txval: { type: 'number' } } },
                      isup_rev: { type: 'object', description: 'Inward supplies liable to reverse charge', properties: { txval: { type: 'number' }, iamt: { type: 'number' }, camt: { type: 'number' }, samt: { type: 'number' }, csamt: { type: 'number' } } },
                      osup_nongst: { type: 'object', description: 'Non-GST outward supplies', properties: { txval: { type: 'number' } } },
                    },
                  },
                  itc_elg: {
                    type: 'object',
                    description: 'Eligible ITC',
                    properties: {
                      itc_avl: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            ty: { type: 'string', enum: ['IMPG', 'IMPS', 'ISRC', 'ISD', 'OTH'], description: 'ITC type' },
                            iamt: { type: 'number' },
                            camt: { type: 'number' },
                            samt: { type: 'number' },
                            csamt: { type: 'number' },
                          },
                        },
                      },
                      itc_rev: { type: 'array', items: { type: 'object', properties: { ty: { type: 'string' }, iamt: { type: 'number' }, camt: { type: 'number' }, samt: { type: 'number' }, csamt: { type: 'number' } } } },
                      itc_net: { type: 'object', properties: { iamt: { type: 'number' }, camt: { type: 'number' }, samt: { type: 'number' }, csamt: { type: 'number' } } },
                      itc_inelg: { type: 'array', items: { type: 'object', properties: { ty: { type: 'string' }, iamt: { type: 'number' }, camt: { type: 'number' }, samt: { type: 'number' }, csamt: { type: 'number' } } } },
                    },
                  },
                  intr_ltfee: {
                    type: 'object',
                    description: 'Interest and late fees',
                    properties: {
                      intr_details: { type: 'object', properties: { iamt: { type: 'number' }, camt: { type: 'number' }, samt: { type: 'number' }, csamt: { type: 'number' } } },
                      ltfee_details: { type: 'object', properties: { camt: { type: 'number' }, samt: { type: 'number' } } },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'GSTR-3B data saved', content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string', example: 'success' }, reference_id: { type: 'string', example: 'WB-3B-20260101-001' } } } } } },
        },
      },
    },
    '/gstr2b/get': {
      get: {
        tags: ['GSTR2B'],
        summary: 'Fetch GSTR-2B ITC statement',
        description: 'Retrieve the auto-populated GSTR-2B statement for a given GSTIN and return period. Contains ITC available from supplier filings.',
        operationId: 'gstr2bGet',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'gstin', in: 'query', required: true, schema: { type: 'string' }, description: 'GSTIN to fetch GSTR-2B for', example: '29AAAAA0000A1Z5' },
          { name: 'ret_period', in: 'query', required: true, schema: { type: 'string' }, description: 'Return period (MMYYYY)', example: '012026' },
          { name: 'page_num', in: 'query', schema: { type: 'integer', minimum: 1 }, description: 'Page number for paginated response', example: 1 },
        ],
        responses: {
          '200': {
            description: 'GSTR-2B data retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                        ret_period: { type: 'string', example: '012026' },
                        gen_dt: { type: 'string', description: 'Statement generation date', example: '2026-02-14' },
                        b2b: { type: 'array', description: 'B2B ITC from suppliers', items: { type: 'object', properties: { ctin: { type: 'string' }, inv: { type: 'array', items: { type: 'object' } } } } },
                        total_pages: { type: 'integer', example: 3 },
                        current_page: { type: 'integer', example: 1 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/einvoice/generate': {
      post: {
        tags: ['e-Invoice'],
        summary: 'Generate e-Invoice (IRN)',
        description: 'Generate an Invoice Reference Number (IRN) from the IRP. Simultaneously generates a QR code and signed JSON payload. Optionally generates an e-Way Bill.',
        operationId: 'einvoiceGenerate',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['Version', 'TranDtls', 'DocDtls', 'SellerDtls', 'BuyerDtls', 'ItemList', 'ValDtls'],
                properties: {
                  Version: { type: 'string', description: 'e-Invoice schema version', example: '1.1' },
                  TranDtls: {
                    type: 'object',
                    required: ['TaxSch', 'SupTyp', 'RegRev'],
                    properties: {
                      TaxSch: { type: 'string', enum: ['GST'], example: 'GST' },
                      SupTyp: { type: 'string', enum: ['B2B', 'SEZWP', 'SEZWOP', 'EXPWP', 'EXPWOP', 'DEXP'], description: 'Supply type', example: 'B2B' },
                      RegRev: { type: 'string', enum: ['Y', 'N'], description: 'Reverse charge', example: 'N' },
                      EcmGstin: { type: 'string', nullable: true, description: 'E-commerce operator GSTIN' },
                    },
                  },
                  DocDtls: {
                    type: 'object',
                    required: ['Typ', 'No', 'Dt'],
                    properties: {
                      Typ: { type: 'string', enum: ['INV', 'CRN', 'DBN'], description: 'Document type', example: 'INV' },
                      No: { type: 'string', description: 'Document number', example: 'INV-2026-001', maxLength: 16 },
                      Dt: { type: 'string', description: 'Document date (DD/MM/YYYY)', example: '15/01/2026' },
                    },
                  },
                  SellerDtls: {
                    type: 'object',
                    required: ['Gstin', 'LglNm', 'Addr1', 'Loc', 'Pin', 'Stcd'],
                    properties: {
                      Gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                      LglNm: { type: 'string', description: 'Legal name', example: 'Acme Private Limited', maxLength: 100 },
                      TrdNm: { type: 'string', description: 'Trade name', example: 'Acme' },
                      Addr1: { type: 'string', description: 'Address line 1', example: '123 Main Street', maxLength: 100 },
                      Addr2: { type: 'string', description: 'Address line 2', nullable: true },
                      Loc: { type: 'string', description: 'Location / City', example: 'Bengaluru' },
                      Pin: { type: 'integer', description: 'PIN code', example: 560001 },
                      Stcd: { type: 'string', description: 'State code', example: '29' },
                      Ph: { type: 'string', description: 'Phone', nullable: true },
                      Em: { type: 'string', description: 'Email', format: 'email', nullable: true },
                    },
                  },
                  BuyerDtls: {
                    type: 'object',
                    required: ['Gstin', 'LglNm', 'Pos', 'Addr1', 'Loc', 'Pin', 'Stcd'],
                    properties: {
                      Gstin: { type: 'string', example: '27BBBBB1111B1ZW' },
                      LglNm: { type: 'string', example: 'Buyer Corp Ltd', maxLength: 100 },
                      TrdNm: { type: 'string', nullable: true },
                      Pos: { type: 'string', description: 'Place of supply state code', example: '27' },
                      Addr1: { type: 'string', example: '456 Buyer Street' },
                      Loc: { type: 'string', example: 'Mumbai' },
                      Pin: { type: 'integer', example: 400001 },
                      Stcd: { type: 'string', example: '27' },
                    },
                  },
                  ItemList: {
                    type: 'array',
                    description: 'Invoice line items (1–1000 items)',
                    minItems: 1,
                    maxItems: 1000,
                    items: {
                      type: 'object',
                      required: ['SlNo', 'PrdDesc', 'IsServc', 'HsnCd', 'Qty', 'Unit', 'UnitPrice', 'TotAmt', 'AssAmt', 'GstRt', 'TotItemVal'],
                      properties: {
                        SlNo: { type: 'string', description: 'Serial number', example: '1' },
                        PrdDesc: { type: 'string', description: 'Product description', example: 'Laptop 16GB RAM', maxLength: 300 },
                        IsServc: { type: 'string', enum: ['Y', 'N'], description: 'Is service item', example: 'N' },
                        HsnCd: { type: 'string', description: 'HSN / SAC code', example: '8471' },
                        Qty: { type: 'number', description: 'Quantity', example: 10 },
                        Unit: { type: 'string', description: 'Unit of measure', example: 'NOS' },
                        UnitPrice: { type: 'number', description: 'Unit price before tax', example: 80000 },
                        TotAmt: { type: 'number', description: 'Total amount before discount', example: 800000 },
                        Discount: { type: 'number', description: 'Discount amount', example: 0, nullable: true },
                        AssAmt: { type: 'number', description: 'Assessable amount (after discount)', example: 800000 },
                        GstRt: { type: 'number', description: 'GST rate (%)', example: 18 },
                        IgstAmt: { type: 'number', example: 144000, nullable: true },
                        CgstAmt: { type: 'number', example: 0, nullable: true },
                        SgstAmt: { type: 'number', example: 0, nullable: true },
                        CesRt: { type: 'number', example: 0, nullable: true },
                        CesAmt: { type: 'number', example: 0, nullable: true },
                        TotItemVal: { type: 'number', description: 'Total item value including tax', example: 944000 },
                      },
                    },
                  },
                  ValDtls: {
                    type: 'object',
                    required: ['AssVal', 'TotInvVal'],
                    properties: {
                      AssVal: { type: 'number', description: 'Total assessable value', example: 800000 },
                      CgstVal: { type: 'number', example: 0 },
                      SgstVal: { type: 'number', example: 0 },
                      IgstVal: { type: 'number', example: 144000 },
                      CesVal: { type: 'number', example: 0 },
                      Discount: { type: 'number', example: 0 },
                      OthChrg: { type: 'number', example: 0 },
                      RndOffAmt: { type: 'number', example: 0 },
                      TotInvVal: { type: 'number', description: 'Total invoice value', example: 944000 },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'IRN generated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        irn: { type: 'string', description: '64-character Invoice Reference Number', example: 'abc123def456...' },
                        ack_no: { type: 'string', description: 'IRP acknowledgement number', example: '112010004029001' },
                        ack_dt: { type: 'string', description: 'Acknowledgement timestamp', example: '2026-01-15 10:30:00' },
                        signed_invoice: { type: 'string', description: 'JWT-signed invoice payload' },
                        signed_qr_code: { type: 'string', description: 'Base64-encoded QR code data' },
                        qr_code_url: { type: 'string', description: 'URL to rendered QR code image', example: 'https://api.whitebooks.in/qr/abc123' },
                      },
                    },
                  },
                },
              },
            },
          },
          '409': { description: 'IRN already exists for this document', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/ledger/cash': {
      get: {
        tags: ['Ledger'],
        summary: 'Electronic cash ledger balance',
        description: 'Fetch the current balance in the electronic cash ledger for a given GSTIN.',
        operationId: 'ledgerCash',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'gstin', in: 'query', required: true, schema: { type: 'string' }, example: '29AAAAA0000A1Z5' },
        ],
        responses: {
          '200': {
            description: 'Cash ledger balance',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                        balance: {
                          type: 'object',
                          properties: {
                            igst: { type: 'number', example: 50000 },
                            cgst: { type: 'number', example: 25000 },
                            sgst: { type: 'number', example: 25000 },
                            cess: { type: 'number', example: 0 },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/payment/challan': {
      post: {
        tags: ['Payment'],
        summary: 'Create GST challan',
        description: 'Create a GST payment challan (PMT-06) for the specified tax heads and amount.',
        operationId: 'createChallan',
        parameters: [
          { name: 'Authorization', in: 'header', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['gstin', 'ret_period', 'pmt_head', 'tax_prd'],
                properties: {
                  gstin: { type: 'string', example: '29AAAAA0000A1Z5' },
                  ret_period: { type: 'string', example: '012026' },
                  pmt_head: { type: 'string', enum: ['IGST', 'CGST', 'SGST/UTGST', 'CESS'], description: 'Tax head for payment' },
                  tax_prd: { type: 'string', description: 'Tax period', example: '012026' },
                  amt: { type: 'number', description: 'Amount to deposit', example: 10000 },
                  mode: { type: 'string', enum: ['NEFT', 'RTGS', 'ONLINE', 'OTC'], description: 'Payment mode', example: 'ONLINE' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Challan created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    challan_no: { type: 'string', example: 'CHL20260115001' },
                    cpin: { type: 'string', description: '14-digit Common Portal Identification Number', example: '23012600012345' },
                    expiry_date: { type: 'string', description: 'Challan validity date', example: '2026-01-22' },
                    amount: { type: 'number', example: 10000 },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
*/
