import React from 'react';
import { Link } from 'react-router-dom';
import { StructuredData } from './StructuredData';
import { buildBreadcrumbSchema, buildJsonLd } from '../schema/generators';
import type { BreadcrumbEntry } from '../types';

interface SeoBreadcrumbProps {
  items: BreadcrumbEntry[];
  className?: string;
}

/**
 * Renders both the visual breadcrumb trail and the JSON-LD BreadcrumbList schema.
 * Replaces the plain Breadcrumb in SiteShell for SEO-critical pages.
 */
export function SeoBreadcrumb({ items, className = '' }: SeoBreadcrumbProps) {
  const schema = buildJsonLd(buildBreadcrumbSchema(items));

  return (
    <>
      <StructuredData schema={schema} />
      <nav
        className={`wb-crumbs ${className}`}
        aria-label="Breadcrumb"
      >
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}
        >
          {items.map((item, idx) => (
            <li
              key={`${item.label}-${idx}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {idx > 0 && <span className="wb-crumb-sep" aria-hidden="true">›</span>}
              {item.href ? (
                item.href.startsWith('/') ? (
                  <Link to={item.href} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <a href={item.href} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </a>
                )
              ) : (
                <span itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={String(idx + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
