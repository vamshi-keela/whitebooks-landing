import { ReactNode } from 'react';
import { Accounting, GST, EInvoice, EWayBill, KSA } from '@/components/icons/Icon';
import { Home } from 'lucide-react';

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
  { label: 'KSA E-Invoicing Software', href: '/softwares/ksa', icon: <KSA {...ico} /> },
];

export const API_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/apis', icon: <Home size={14} /> },
  { label: 'GST APIs', href: '/apis/gst', icon: <GST {...ico} /> },
  { label: 'E-Invoice APIs', href: '/apis/e-invoice', icon: <EInvoice {...ico} /> },
  { label: 'E-Way Bill APIs', href: '/apis/e-way-bill', icon: <EWayBill {...ico} /> },
  { label: 'KSA E-Invoice APIs', href: '/apis/ksa', icon: <KSA {...ico} /> },
];
