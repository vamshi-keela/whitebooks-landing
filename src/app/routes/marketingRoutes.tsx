import { lazy, Suspense } from 'react';
import { Route, useParams, Navigate } from 'react-router-dom';
import { PartnerWithUs } from '@/pages/resources/PartnerWithUs';
import { SupportPage } from '@/pages/resources/Support';
import { VideosPage } from '@/pages/resources/Videos';
import { AboutUs } from '@/pages/about/AboutUs';
import { ContactUs } from '@/pages/about/ContactUs';
import { Pricing } from '@/pages/about/Pricing';
import { Terms } from '@/pages/about/Terms';
import { PrivacyPolicy } from '@/pages/about/PrivacyPolicy';
import { RefundCancellation } from '@/pages/about/RefundCancellation';
import ShippingPage from '@/pages/about/ShippingPage';
import { GstNumberSearch } from '@/pages/tools/GstNumberSearch';
import { GstTaxCalculator } from '@/pages/tools/GstTaxCalculator';
import { MultiGstSearch } from '@/pages/tools/MultiGstSearch';
import { GstHsnSacSearch } from '@/pages/tools/GstHsnSacSearch';
import { StatusPage } from '@/pages/status/StatusPage';
import { CONNECTOR_REGISTRY } from '@/pages/connectors/connectors.data';
import { SapConnectorPage } from '@/pages/connectors/SapConnectorPage';
import { TallyConnectorPage } from '@/pages/connectors/TallyConnectorPage';
import MoreFeaturesExplore from '@/pages/features/MoreFeaturesExplore';
import { getMoreFeaturesPage } from '@/data/more-features-explore.data';
import { HubServices } from '@/pages/services/HubServices';
import { HomeRoute } from '@/features/home/HomeRoute';
import { renderSoftwareRoutes } from '@/features/softwares/routes';
import { renderApiRoutes } from '@/features/apis/routes';

const LoginPage = lazy(() =>
  import('@/pages/auth/AuthPage').then((module) => ({ default: module.LoginPage }))
);
const SignupPage = lazy(() =>
  import('@/pages/auth/AuthPage').then((module) => ({ default: module.SignupPage }))
);

function ServicesHubRoute() {
  return <HubServices />;
}

function MoreFeaturesRoute() {
  const { slug } = useParams<{ slug: string }>();
  const page = getMoreFeaturesPage(slug ?? '');
  if (!page) return <Navigate to="/softwares" replace />;
  return <MoreFeaturesExplore key={page.slug} data={page} />;
}

function ConnectorPageRoute() {
  const { slug } = useParams<{ slug: string }>();
  const data = CONNECTOR_REGISTRY[slug ?? ''];
  if (!data) return <Navigate to="/" replace />;
  return data.platform === 'tally' ? (
    <TallyConnectorPage data={data} />
  ) : (
    <SapConnectorPage data={data} />
  );
}

export function renderMarketingRoutes() {
  return (
    <>
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div style={{ minHeight: '100svh', background: '#f7f6f8' }} />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div style={{ minHeight: '100svh', background: '#f7f6f8' }} />}>
            <SignupPage />
          </Suspense>
        }
      />
      {renderSoftwareRoutes()}
      {renderApiRoutes()}
      <Route path="/services" element={<ServicesHubRoute />} />
      <Route path="/connectors/:slug" element={<ConnectorPageRoute />} />
      <Route path="/features/:slug" element={<MoreFeaturesRoute />} />
      <Route path="/resources/partners" element={<PartnerWithUs />} />
      <Route path="/resources/support" element={<SupportPage />} />
      <Route path="/resources/videos" element={<VideosPage />} />
      <Route path="/about/about-us" element={<AboutUs />} />
      <Route path="/about/contact-us" element={<ContactUs />} />
      <Route path="/about/pricing" element={<Pricing />} />
      <Route path="/about/shipping" element={<ShippingPage />} />
      <Route path="/about/terms" element={<Terms />} />
      <Route path="/about/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about/refund-cancellation" element={<RefundCancellation />} />
      <Route path="/tools/gst-number-search" element={<GstNumberSearch />} />
      <Route path="/tools/gst-tax-calculator" element={<GstTaxCalculator />} />
      <Route path="/tools/multiple-gst-search" element={<MultiGstSearch />} />
      <Route path="/tools/gst-hsn-sac-search" element={<GstHsnSacSearch />} />
      <Route path="/status" element={<StatusPage />} />
    </>
  );
}
