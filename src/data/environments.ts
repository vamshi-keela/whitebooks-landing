export interface Environment {
  name: string;
  key: string;
  swaggerUrl: string;
  baseUrl: string;
  color: 'blue' | 'emerald';
  /** Default OTP for OTP/EVC authentication. Only valid in test environments. */
  defaultOtp?: string;
}

export const environments: Environment[] = [
  {
    name: 'Sandbox',
    key: 'sandbox',
    swaggerUrl: 'SWAGGER_SANDBOX_URL_PLACEHOLDER',
    baseUrl: 'https://apisandbox.whitebooks.in',
    color: 'blue',
    defaultOtp: '575757',
  },
  {
    name: 'Production',
    key: 'production',
    swaggerUrl: 'SWAGGER_PRODUCTION_URL_PLACEHOLDER',
    baseUrl: 'https://api.whitebooks.in',
    color: 'emerald',
  },
];
