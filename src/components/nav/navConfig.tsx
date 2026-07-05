import { ReactNode } from 'react';
import { Accounting, GST, EInvoice, EWayBill, NoticeManagement } from '@/components/icons/Icon';
import { Home, FileText, ShieldCheck, Search, Briefcase, Users, LifeBuoy, PlayCircle, BookOpen, Calculator, Hash, Layers } from 'lucide-react';
import DpIcon from '@/pages/developer/DpIcon';

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const ico = { width: 14, height: 14 };

export const SOFT_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/softwares', icon: <Home size={14} /> },
  { label: 'Accounting Software', href: '/softwares/accounting', icon: <Accounting {...ico} /> },
  { label: 'GST Software', href: '/softwares/gst', icon: <GST {...ico} /> },
  { label: 'E-Invoice Software', href: '/softwares/e-invoice', icon: <EInvoice {...ico} /> },
  { label: 'E-Way Bill Software', href: '/softwares/e-way-bill', icon: <EWayBill {...ico} /> },
  { label: 'Notice Management', href: '/softwares/notice-management', icon: <NoticeManagement {...ico} /> },
];

export const API_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/apis', icon: <Home size={14} /> },
  { label: 'GST APIs', href: '/apis/gst', icon: <GST {...ico} /> },
  { label: 'E-Invoice APIs', href: '/apis/e-invoice', icon: <EInvoice {...ico} /> },
  { label: 'E-Way Bill APIs', href: '/apis/e-way-bill', icon: <EWayBill {...ico} /> },
  // { label: 'KSA E-Invoice APIs', href: '/apis/ksa', icon: <NoticeManagement {...ico} /> },
];

// Connector menu groups. Column/section headers carry the platform name, so
// the row labels stay short (function only).
export const CONNECTORS_SAP_ITEMS: NavItem[] = [
  { label: 'e-Invoicing', href: '/connectors/sap-e-invoicing', icon: <EInvoice {...ico} /> },
  { label: 'e-Way Bill', href: '/connectors/sap-e-way-bill', icon: <EWayBill {...ico} /> },
  { label: 'GST Filing', href: '/connectors/sap-gst', icon: <GST {...ico} /> },
];

export const CONNECTORS_ORACLE_ITEMS: NavItem[] = [
  { label: 'e-Invoicing', href: '/connectors/oracle-e-invoicing', icon: <EInvoice {...ico} /> },
  { label: 'e-Way Bill', href: '/connectors/oracle-e-way-bill', icon: <EWayBill {...ico} /> },
  { label: 'GST Filing', href: '/connectors/oracle-gst', icon: <GST {...ico} /> },
];

export const CONNECTORS_DYNAMICS_ITEMS: NavItem[] = [
  { label: 'e-Invoicing', href: '/connectors/dynamics-e-invoicing', icon: <EInvoice {...ico} /> },
  { label: 'e-Way Bill', href: '/connectors/dynamics-e-way-bill', icon: <EWayBill {...ico} /> },
  { label: 'GST Filing', href: '/connectors/dynamics-gst', icon: <GST {...ico} /> },
];

export const CONNECTORS_TALLY_ITEMS: NavItem[] = [
  { label: 'e-Invoicing', href: '/connectors/tally-e-invoice', icon: <EInvoice {...ico} /> },
  { label: 'e-Way Bill', href: '/connectors/tally-e-way-bill', icon: <EWayBill {...ico} /> },
];

/** Ordered platform columns for the Connectors mega-menu. */
export const CONNECTOR_GROUPS: { label: string; items: NavItem[] }[] = [
  { label: 'SAP', items: CONNECTORS_SAP_ITEMS },
  { label: 'Oracle', items: CONNECTORS_ORACLE_ITEMS },
  { label: 'Dynamics', items: CONNECTORS_DYNAMICS_ITEMS },
  { label: 'Tally', items: CONNECTORS_TALLY_ITEMS },
];

export const SERVICES_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/services', icon: <Home size={14} /> },
  // { label: 'Registration', href: '/services/#registration', icon: <FileText size={14} /> },
  // { label: 'Compliance', href: '/services/#compliance', icon: <ShieldCheck size={14} /> },
  // { label: 'Audit Service', href: '/services/#audit', icon: <Search size={14} /> },
  // { label: 'Managed Services', href: '/services/#managed', icon: <Briefcase size={14} /> },
];


export const RESOURCES_ITEMS: NavItem[] = [
  { label: 'Partners', href: '/resources/partners', icon: <Users size={14} /> },
  { label: 'Support', href: '/resources/support', icon: <LifeBuoy size={14} /> },
  { label: 'Videos', href: '/resources/videos', icon: <PlayCircle size={14} /> },
  { label: 'Blog', href: '/resources/blog', icon: <BookOpen size={14} /> },
];

export const TOOLS_ITEMS: NavItem[] = [
  { label: 'GST Number Search & Verification', href: '/tools/gst-number-search', icon: <Search size={14} /> },
  { label: 'GST TAX Calculator', href: '/tools/gst-tax-calculator', icon: <Calculator size={14} /> },
  { label: 'Multiple GST Numbers Search', href: '/tools/multiple-gst-search', icon: <Hash size={14} /> },
  { label: 'GST HSN SAC Code Search', href: '/tools/gst-hsn-sac-search', icon: <Layers size={14} /> },
];

export const API_DEVELOPER_ITEMS: NavItem[] = [
  {
    label: 'Getting Started', href: '/developer', icon: <DpIcon
      name='book'
      size={15}
      style={{ color: 'var(--dp-accent)' }}
    />
  },
  {
    label: 'API Reference', href: '/developer/api-reference', icon: <DpIcon
      name='code'
      size={15}
      style={{ color: 'var(--dp-accent)' }}
    />
  },
  {
    label: 'Changelog', href: '/developer/changelog', icon: <DpIcon
      name='activity'
      size={15}
      style={{ color: 'var(--dp-accent)' }}
    />
  },
];