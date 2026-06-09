import type React from 'react';

export interface ReconRow {
  gstin: string;
  vendor: string;
  inv: string;
  amt: number;
  state: 'match' | 'mismatch';
  reason?: string;
}

export interface StatItem {
  prefix?: string;
  value: React.ReactNode;
  unit?: string;
  label: string;
}

export interface NavLink {
  id: string;
  label: string;
  hash: string;
}

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export interface LogoItem {
  name: string;
}

export interface QuoteProps {
  quote: string;
  name: string;
  role: string;
  big?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type HeaderMode = 'home' | 'softwares' | 'apis' | 'services' | 'resources';
