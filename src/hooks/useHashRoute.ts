import { useState, useEffect, useCallback } from 'react';

export type RouteKey =
  | 'home'
  | 'gst-soft'
  | 'gst-api'
  | 'einvoice-soft'
  | 'einvoice-api'
  | 'eway-soft'
  | 'eway-api'
  | 'ksa-soft'
  | 'ksa-api'
  | 'accounting'
  | 'notice-mgmt';

function hashToRoute(hash: string): RouteKey {
  if (hash === '#/gst-software') return 'gst-soft';
  if (hash === '#/gst-api') return 'gst-api';
  return 'home';
}

function routeToHash(route: RouteKey): string {
  if (route === 'gst-soft') return '#/gst-software';
  if (route === 'gst-api') return '#/gst-api';
  return '#/';
}

export function useHashRoute(): [RouteKey, (r: RouteKey) => void] {
  const [route, setRoute] = useState<RouteKey>(() =>
    hashToRoute(window.location.hash)
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(hashToRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((r: RouteKey) => {
    const hash = routeToHash(r);
    if (window.location.hash !== hash) window.location.hash = hash;
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return [route, navigate];
}
