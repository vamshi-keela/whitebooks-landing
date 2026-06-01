import axios from 'axios';
import type { OpenApiSpec } from '../data/openapi-spec';
import ksaApi from '@/assets/OpenApiSpecJson/ksa-e-invoice.json';

const specClient = axios.create({ timeout: 1000 });

export async function fetchKsaEInvoiceSpec(): Promise<OpenApiSpec> {
  try {
    const { data } = await specClient.get<OpenApiSpec>(
      'https://whitebooks.in/swaggar/lib/spec-ksa-einvoice.json'
    );
    return data;
  } catch {
    return ksaApi as OpenApiSpec;
  }
}
