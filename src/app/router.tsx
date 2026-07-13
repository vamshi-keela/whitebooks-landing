import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { renderMarketingRoutes } from '@/app/routes/marketingRoutes';
import { renderDeveloperRoutes } from '@/app/routes/developerRoutes';

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        {renderMarketingRoutes()}
        {renderDeveloperRoutes()}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
