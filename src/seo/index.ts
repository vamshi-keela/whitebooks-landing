export { getPageMeta, PAGE_META } from './metadata';
export { SITE } from './config/site';
export { canonical, normalizeCanonical, CANONICAL_ROUTES } from './utils/canonical';
export { schemaId } from './utils/slugs';
export {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildSoftwareApplicationSchema,
  buildProductSchema,
  buildTechArticleSchema,
  buildJsonLd,
} from './schema/generators';
export type { SeoMeta, BreadcrumbEntry, SchemaFaqItem } from './types';
