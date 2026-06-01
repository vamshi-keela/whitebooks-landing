export interface Environment {
  name: string;
  key: string;
  swaggerUrl: string;
  baseUrl: string;
  color: 'emerald' | 'rose';
}

export const environments: Environment[] = [
  {
    name: 'Sandbox',
    key: 'sandbox',
    swaggerUrl: 'SWAGGER_SANDBOX_URL_PLACEHOLDER',
    baseUrl: 'https://apisandbox.whitebooks.in',
    color: 'emerald',
  },
  {
    name: 'Production',
    key: 'production',
    swaggerUrl: 'SWAGGER_PRODUCTION_URL_PLACEHOLDER',
    baseUrl: 'https://api.whitebooks.in',
    color: 'rose',
  },
];
