import React from 'react';
import { ButtonLink } from '@/components/ui/Button';
import type { RouteKey } from '@/hooks/useHashRoute';

interface NavLinkDef {
  id: RouteKey;
  label: string;
  hash: string;
}

interface SiteNavProps {
  route: RouteKey;
  navigate: (r: RouteKey) => void;
}

export function SiteNav({ route, navigate }: SiteNavProps) {
  const links: NavLinkDef[] = [
    { id: 'home', label: 'Home', hash: '#/' },
    { id: 'gst-soft', label: 'GST Software', hash: '#/gst-software' },
    { id: 'gst-api', label: 'GST API', hash: '#/gst-api' },
  ];

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <a
            href="#/"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
          >
            <span className="mark"></span>
            whitebooks
          </a>
          <div style={{ display: 'flex', gap: 28 }}>
            {links.map((l) => (
              <a
                key={l.id}
                href={l.hash}
                className={`nav-link ${route === l.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              Pricing
            </a>
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              Customers
            </a>
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              Docs
            </a>
          </div>
        </div>
        <div className="nav-right">
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            Sign in
          </a>
          <ButtonLink href="#" onClick={(e) => e.preventDefault()}>
            Book a demo
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}
