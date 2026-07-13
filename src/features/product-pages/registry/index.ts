import { PAGES } from './pages-1';
import { PAGES_2 } from './pages-2';
import { PAGES_3 } from './pages-3';
import type { PagesRegistry } from '@/shared/types/page-registry';

export const pagesRegistry: PagesRegistry = { ...PAGES, ...PAGES_2, ...PAGES_3 };
export type { PagesRegistry };
