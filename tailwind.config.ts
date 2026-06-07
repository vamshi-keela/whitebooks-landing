import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx,ts}', './*.html'],
  corePlugins: {
    preflight: false,
  },
  /*
   * darkMode: ['class', '[data-theme="dark"]'] enables Tailwind's dark: utilities
   * to activate when the data-theme="dark" attribute is present on any ancestor.
   * The codebase is primarily CSS-variable-driven so dark: utilities are rarely
   * needed, but this ensures they work correctly if added in the future.
   */
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── Surface tokens ──────────────────────────────────────────
        surface:         'var(--bg-base, var(--bg))',
        'surface-raised':'var(--bg-elevated, var(--bg-elev))',
        'surface-card':  'var(--bg-card, var(--bg-3))',

        // ── Text tokens ─────────────────────────────────────────────
        primary:         'var(--fg-primary, var(--text))',
        secondary:       'var(--fg-secondary, var(--muted-2))',
        muted:           'var(--fg-tertiary, var(--muted))',
        subtle:          'var(--fg-quaternary)',

        // ── Brand / accent tokens ───────────────────────────────────
        brand:           'var(--brand)',
        'brand-soft':    'var(--brand-soft)',
        'brand-softer':  'var(--brand-softer)',
        'brand-border':  'var(--brand-border)',
        'brand-glow':    'var(--brand-glow)',
        accent:          'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-glow':   'var(--accent-glow)',
        'accent-soft':   'var(--accent-soft)',

        // ── Border token ────────────────────────────────────────────
        hairline:        'var(--line, var(--hairline))',

        // ── Status tokens ───────────────────────────────────────────
        ok:              'var(--success, var(--ok))',
        warn:            'var(--warn)',
        crit:            'var(--danger, var(--crit))',

        // ── Legacy aliases (kept for gradual migration) ─────────────
        'bg-base':       'var(--bg-base)',
        'bg-elevated':   'var(--bg-elevated)',
        'bg-card':       'var(--bg-card)',
        'fg-primary':    'var(--fg-primary)',
        'fg-secondary':  'var(--fg-secondary)',
        'fg-tertiary':   'var(--fg-tertiary)',
        'fg-quaternary': 'var(--fg-quaternary)',
        'wb-bg':         'var(--bg)',
        'wb-text':       'var(--text)',
        'wb-brand':      'var(--brand)',
        'wb-muted':      'var(--muted)',
      },
      fontFamily: {
        serif:   ['var(--font-serif)'],
        sans:    ['var(--font-sans)'],
        mono:    ['var(--font-mono)'],
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius, 8px)',
        sm:      'var(--radius-sm, 4px)',
        lg:      'var(--radius-lg, 12px)',
        xl:      'var(--radius-xl, 16px)',
      },
      boxShadow: {
        brand:   '0 0 0 1px var(--brand-border), 0 0 24px var(--brand-glow)',
        glow:    '0 0 40px var(--brand-glow)',
        card:    '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px var(--line)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px var(--line-2)',
      },
      keyframes: {
        'pmap-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220,47,101,0.4)', opacity: '1' },
          '50%':       { boxShadow: '0 0 0 6px rgba(220,47,101,0)', opacity: '0.6' },
        },
        'pmap-coredot': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(220,47,101,0.8), 0 0 0 3px rgba(220,47,101,0.18)' },
          '50%':       { boxShadow: '0 0 18px rgba(220,47,101,1), 0 0 0 5px rgba(220,47,101,0.08)' },
        },
      },
      animation: {
        'pmap-pulse':   'pmap-pulse 2.6s ease-in-out infinite',
        'pmap-coredot': 'pmap-coredot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
