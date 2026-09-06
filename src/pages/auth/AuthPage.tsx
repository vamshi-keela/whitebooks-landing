import { lazy, Suspense, useEffect, useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
} from 'lucide-react';
import wbLogo from '@/assets/logo-white-books.svg';
import cocaColaLogo from '@/assets/logos/coca-cola.svg';
import kiaLogo from '@/assets/logos/kia.svg';
import kpmgLogo from '@/assets/logos/kpmg.svg';
import pepsicoLogo from '@/assets/logos/pepsico.avif';
import { DEV_SIGNUP_URL, LOGIN_URL, SIGNUP_ALL_URL } from '@/utils/contants';
import './auth.css';

const AuthShaderBackdrop = lazy(() => import('./AuthShaderBackdrop'));

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  mode: AuthMode;
}

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Less busywork',
    copy: 'Automate routine accounting and compliance tasks.',
  },
  {
    icon: BarChart3,
    title: 'Clearer decisions',
    copy: 'See real-time books, cash flow and tax positions.',
  },
  {
    icon: ShieldCheck,
    title: 'Always audit-ready',
    copy: 'Stay secure, compliant and confidently in control.',
  },
];

const PARTNERS = [
  { src: cocaColaLogo, alt: 'Coca-Cola' },
  { src: kiaLogo, alt: 'Kia' },
  { src: pepsicoLogo, alt: 'PepsiCo' },
  { src: kpmgLogo, alt: 'KPMG' },
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="auth-google-mark">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.64-2.43l-3.24-2.54c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.86A6 6 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.01c1.47 0 2.79.5 3.83 1.5l2.88-2.87A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
      />
    </svg>
  );
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className={compact ? 'auth-logo auth-logo--compact' : 'auth-logo'}
      aria-label="WhiteBooks home"
    >
      <img src={wbLogo} alt="WhiteBooks" />
    </Link>
  );
}

function useProgressiveShader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 1001px) and (prefers-reduced-motion: no-preference)'
    );
    let timer: number | undefined;

    const sync = () => {
      window.clearTimeout(timer);
      if (!media.matches) {
        setEnabled(false);
        return;
      }

      timer = window.setTimeout(() => setEnabled(true), 120);
    };

    sync();
    media.addEventListener('change', sync);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener('change', sync);
    };
  }, []);

  return enabled;
}

function TrustPanel() {
  const shaderEnabled = useProgressiveShader();

  return (
    <aside className="auth-story" aria-label="Why WhiteBooks">
      <div className="auth-story-ambient" aria-hidden="true">
        <div className="auth-shader-fallback" />
        {shaderEnabled && (
          <Suspense fallback={null}>
            <AuthShaderBackdrop />
          </Suspense>
        )}
        <div className="auth-story-shader-veil" />
      </div>
      <div className="auth-story-grid" aria-hidden="true" />

      <div className="auth-story-inner">
        <BrandLogo />

        <div className="auth-story-copy">
          <div className="auth-eyebrow">
            <span>
              <Zap size={13} strokeWidth={2.4} />
            </span>
            AI-powered books. GST-ready.
          </div>
          <h1>
            Your numbers,
            <span>finally in rhythm.</span>
          </h1>
          <p className="auth-story-lede">
            One beautifully simple workspace for books, tax compliance and the clarity to move your
            business forward.
          </p>

          <div className="auth-benefits">
            {BENEFITS.map(({ icon: BenefitIcon, title, copy }) => (
              <div className="auth-benefit" key={title}>
                <span className="auth-benefit-icon">
                  <BenefitIcon size={17} strokeWidth={2} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-pulse-card" aria-hidden="true">
          <div className="auth-pulse-head">
            <span>
              <small>BUSINESS PULSE</small>
              <strong>Everything looks healthy</strong>
            </span>
            <span className="auth-live">
              <i /> LIVE
            </span>
          </div>
          <div className="auth-pulse-body">
            <span className="auth-pulse-total">
              <small>Revenue this month</small>
              <strong>₹46.2L</strong>
              <em>+12.5%</em>
            </span>
            <svg className="auth-sparkline" viewBox="0 0 240 74" preserveAspectRatio="none">
              <defs>
                <linearGradient id="auth-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#dc2f65" stopOpacity=".26" />
                  <stop offset="1" stopColor="#dc2f65" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M1 64C17 61 17 46 34 48s18 11 35 3 16-23 31-19 16 15 32 8 17-30 34-25 13 31 31 20 19-28 42-31v70H1Z"
                fill="url(#auth-area)"
              />
              <path
                d="M1 64C17 61 17 46 34 48s18 11 35 3 16-23 31-19 16 15 32 8 17-30 34-25 13 31 31 20 19-28 42-31"
                fill="none"
                stroke="#dc2f65"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="auth-pulse-foot">
            <span>
              <Check size={13} /> Books reconciled
            </span>
            <span>
              <Check size={13} /> GST on track
            </span>
            <span>
              <Check size={13} /> Cash flow positive
            </span>
          </div>
        </div>

        <div className="auth-partners">
          <p>Trusted by finance teams at</p>
          <div className="auth-partner-row">
            {PARTNERS.map((partner) => (
              <img key={partner.alt} {...partner} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function PasswordField({ mode }: { mode: AuthMode }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="auth-field">
      <span>Password</span>
      <span className="auth-input-shell">
        <LockKeyhole size={17} aria-hidden="true" />
        <input
          type={visible ? 'text' : 'password'}
          name="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          placeholder={mode === 'login' ? 'Enter your password' : 'Create a strong password'}
          minLength={8}
          required
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
      {mode === 'signup' && <small className="auth-password-hint">Use 8 or more characters</small>}
    </label>
  );
}

function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login';
  const [searchParams] = useSearchParams();
  const signupUrl = searchParams.get('type') === 'developer' ? DEV_SIGNUP_URL : SIGNUP_ALL_URL;
  const destinationUrl = isLogin ? `${LOGIN_URL}/login` : signupUrl;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(destinationUrl);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <button
        className="auth-google"
        type="button"
        onClick={() => window.location.assign(destinationUrl)}
      >
        <GoogleMark />
        Continue with Google
      </button>

      <div className="auth-divider">
        <span>or continue with email</span>
      </div>

      {!isLogin && (
        <label className="auth-field">
          <span>Full name</span>
          <span className="auth-input-shell">
            <UserRound size={17} aria-hidden="true" />
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              required
            />
          </span>
        </label>
      )}

      <label className="auth-field">
        <span>{isLogin ? 'Email address' : 'Work email'}</span>
        <span className="auth-input-shell">
          <Mail size={17} aria-hidden="true" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </span>
      </label>

      <PasswordField mode={mode} />

      {isLogin ? (
        <div className="auth-form-meta">
          <label className="auth-check">
            <input type="checkbox" name="remember" />
            <span aria-hidden="true">
              <Check size={11} />
            </span>
            Remember me
          </label>
          <a href={`${LOGIN_URL}/forgot-password`}>Forgot password?</a>
        </div>
      ) : (
        <label className="auth-check auth-terms">
          <input type="checkbox" name="terms" required />
          <span aria-hidden="true">
            <Check size={11} />
          </span>
          <span>
            I agree to the <Link to="/about/terms">Terms</Link> and{' '}
            <Link to="/about/privacy-policy">Privacy Policy</Link>.
          </span>
        </label>
      )}

      <button className="auth-submit" type="submit">
        <span>{isLogin ? 'Sign in to WhiteBooks' : 'Create my free account'}</span>
        <ArrowRight size={18} />
      </button>

      {!isLogin && (
        <p className="auth-form-assurance">
          <Check size={13} /> No credit card required. Set up in minutes.
        </p>
      )}
    </form>
  );
}

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === 'login';

  return (
    <main className="auth-page">
      <Helmet>
        <title>{isLogin ? 'Sign in' : 'Create your account'} | WhiteBooks</title>
        <meta
          name="description"
          content={
            isLogin
              ? 'Sign in to your WhiteBooks account.'
              : 'Create a WhiteBooks account and put your books and compliance on autopilot.'
          }
        />
      </Helmet>

      <TrustPanel />

      <section className="auth-access">
        <div className="auth-mobile-brand">
          <BrandLogo compact />
        </div>

        <div className="auth-switch">
          <span>{isLogin ? 'New to WhiteBooks?' : 'Already have an account?'}</span>
          <Link to={isLogin ? '/signup' : '/login'}>{isLogin ? 'Create account' : 'Sign in'}</Link>
        </div>

        <div className="auth-card-wrap">
          <div className="auth-mobile-proof">
            <BadgeCheck size={15} /> Books, compliance and clarity — together.
          </div>
          <div className="auth-card">
            <div className="auth-card-kicker-row">
              <div className="auth-card-icon">
                {isLogin ? <LockKeyhole size={21} /> : <Sparkles size={21} />}
              </div>
              <span className="auth-assurance-pill">
                <ShieldCheck size={13} /> {isLogin ? 'Secure access' : 'Free to get started'}
              </span>
            </div>
            <div className="auth-card-heading">
              <p>{isLogin ? 'Welcome back' : 'Start building better books'}</p>
              <h2>{isLogin ? 'Sign in to your account.' : 'Create your account.'}</h2>
              <span>
                {isLogin
                  ? 'Your business is ready when you are.'
                  : 'A clearer financial picture is just a minute away.'}
              </span>
            </div>

            <AuthForm mode={mode} />

            <p className="auth-card-bottom">
              {isLogin ? "Don't have an account?" : 'Already using WhiteBooks?'}{' '}
              <Link to={isLogin ? '/signup' : '/login'}>
                {isLogin ? 'Create one free' : 'Sign in'}
              </Link>
            </p>
          </div>

          <div className="auth-security">
            <span>
              <ShieldCheck size={15} /> ISO 27001 certified
            </span>
            <i />
            <span>
              <LockKeyhole size={14} /> 256-bit SSL secured
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export function LoginPage() {
  return <AuthPage mode="login" />;
}

export function SignupPage() {
  return <AuthPage mode="signup" />;
}
