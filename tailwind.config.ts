import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx,ts}', './*.html'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'bg-base':       'var(--bg-base)',
        'bg-elevated':   'var(--bg-elevated)',
        'bg-card':       'var(--bg-card)',
        'fg-primary':    'var(--fg-primary)',
        'fg-secondary':  'var(--fg-secondary)',
        'fg-tertiary':   'var(--fg-tertiary)',
        'fg-quaternary': 'var(--fg-quaternary)',
        accent:          'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-glow':   'var(--accent-glow)',
        'accent-soft':   'var(--accent-soft)',
        hairline:        'var(--hairline)',
        ok:              'var(--ok)',
        warn:            'var(--warn)',
        crit:            'var(--crit)',
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
        DEFAULT: 'var(--radius)',
        sm:      'var(--radius-sm)',
        lg:      'var(--radius-lg)',
        xl:      'var(--radius-xl)',
      },
    },
  },
  plugins: [],
} satisfies Config;
