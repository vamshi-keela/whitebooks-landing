export interface Environment {
  name: string;
  key: string;
  swaggerUrl: string;
  baseUrl: string;
  color: 'blue' | 'emerald';
}

export const environments: Environment[] = [
  {
    name: 'Sandbox',
    key: 'sandbox',
    swaggerUrl: 'SWAGGER_SANDBOX_URL_PLACEHOLDER',
    baseUrl: 'https://apisandbox.whitebooks.in',
    color: 'blue',
  },
  {
    name: 'Production',
    key: 'production',
    swaggerUrl: 'SWAGGER_PRODUCTION_URL_PLACEHOLDER',
    baseUrl: 'https://api.whitebooks.in',
    color: 'emerald',
  },
];
