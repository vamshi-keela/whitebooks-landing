import { Route, Navigate } from 'react-router-dom';
import DevPortal from '@/features/developer/DevPortal';
import ApiDocPage from '@/features/developer/ApiDocPage';
import GuidesLayout from '@/features/developer/guides/GuidesLayout';
import GuideOverview from '@/features/developer/guides/Overview';
import GuideQuickstart from '@/features/developer/guides/Quickstart';
import GuideAuthentication from '@/features/developer/guides/Authentication';
import GuideErrors from '@/features/developer/guides/Errors';
import ApiReferenceLanding from '@/features/developer/ApiReferenceLanding';
import Changelog from '@/features/developer/Changelog';

function DevPortalIndex() {
  return <Navigate to="/developer/overview" replace />;
}

export function renderDeveloperRoutes() {
  return (
    <Route path="/developer" element={<DevPortal />}>
      <Route index element={<DevPortalIndex />} />

      <Route element={<GuidesLayout />}>
        <Route path="overview" element={<GuideOverview />} />
        <Route path="quickstart" element={<GuideQuickstart />} />
        <Route path="api-reference" element={<ApiReferenceLanding />} />
        <Route path="authentication" element={<GuideAuthentication />} />
        <Route path="errors" element={<GuideErrors />} />
      </Route>

      <Route path="api-reference" element={<ApiReferenceLanding />} />

      <Route path="gst-api" element={<ApiDocPage apiType="gst-api" />} />
      <Route path="gst-api/:opSlug" element={<ApiDocPage apiType="gst-api" />} />

      <Route path="e-invoice-api" element={<ApiDocPage apiType="e-invoice-api" />} />
      <Route path="e-invoice-api/:opSlug" element={<ApiDocPage apiType="e-invoice-api" />} />

      <Route path="e-way-bill-api" element={<ApiDocPage apiType="e-way-bill-api" />} />
      <Route path="e-way-bill-api/:opSlug" element={<ApiDocPage apiType="e-way-bill-api" />} />

      <Route path="ksa-e-invoice-api" element={<ApiDocPage apiType="ksa-e-invoice-api" />} />
      <Route path="ksa-e-invoice-api/:opSlug" element={<ApiDocPage apiType="ksa-e-invoice-api" />} />

      <Route path="changelog" element={<Changelog />} />
    </Route>
  );
}
