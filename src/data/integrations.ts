export interface Integration {
  name: string;
  description: string;
  category: string;
}

export const integrations: Integration[] = [
  {
    name: 'SAP ECC / S4HANA',
    description: 'Direct GST filing and e-Invoice push from SAP FI/SD modules via certified connector.',
    category: 'ERP',
  },
  {
    name: 'Oracle EBS / Fusion',
    description: 'Oracle Tax Reporting Cloud integration for automated GSTR-1 data extraction and filing.',
    category: 'ERP',
  },
  {
    name: 'Microsoft Dynamics 365',
    description: 'Power Automate flows and custom connectors for Dynamics F&O GST compliance automation.',
    category: 'ERP',
  },
  {
    name: 'Tally Prime / ERP 9',
    description: 'Tally-to-WhiteBooks sync for GSTR-1, GSTR-3B, and e-Invoice via Tally XML bridge.',
    category: 'Accounting',
  },
];
