import { SITE } from '../config/site';

/** Returns the absolute canonical URL for a given path. */
export function canonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.baseUrl}${clean}`;
}

/** Strips trailing slashes — canonical URLs never end with `/` (except root). */
export function normalizeCanonical(url: string): string {
  if (url === SITE.baseUrl || url === `${SITE.baseUrl}/`) return `${SITE.baseUrl}/`;
  return url.replace(/\/$/, '');
}

export const CANONICAL_ROUTES = {
  home: () => `${SITE.baseUrl}/`,
  softwares: () => `${SITE.baseUrl}/softwares`,
  softwareProduct: (slug: string) => `${SITE.baseUrl}/softwares/${slug}`,
  apis: () => `${SITE.baseUrl}/apis`,
  apiProduct: (slug: string) => `${SITE.baseUrl}/apis/${slug}`,
  developer: () => `${SITE.baseUrl}/developer`,
  developerApi: (apiSlug: string) => `${SITE.baseUrl}/developer/${apiSlug}`,
  developerEndpoint: (apiSlug: string, opSlug: string) =>
    `${SITE.baseUrl}/developer/${apiSlug}/${opSlug}`,
} as const;
