// import React from 'react';
// import { useTweaks } from '@/hooks/useTweaks';
// import { useHashRoute } from '@/hooks/useHashRoute';
// import { hexToRgb, lighten } from '@/utils/color';
// import { SiteNav } from '@/sections/SiteNav';
// import { SiteFooter } from '@/sections/SiteFooter';
// import { TweaksPanel } from '@/components/tweaks/TweaksPanel';
// import {
//   TweakSection,
//   TweakColor,
//   TweakSlider,
//   TweakSelect,
//   TweakRadio,
//   TweakToggle,
//   TweakButton,
// } from '@/components/tweaks/TweakControls';
// import { PageHome } from '@/pages/home/PageHome';
// import { PageGSTSoftware } from '@/pages/gst-software/PageGSTSoftware';
// import { PageGSTAPI } from '@/pages/gst-api/PageGSTAPI';
// import type { TweakDefaults, FontPairKey } from '@/types/tweaks';

// const TWEAK_DEFAULTS: TweakDefaults = {
//   accent: '#d33568',
//   fontPair: 'poppins_dmsans',
//   heroVariant: 'reconciliation',
//   motion: true,
//   gradientIntensity: 0.55,
// };

// interface FontPair {
//   serif: string;
//   sans: string;
// }

// const FONT_PAIRS: Record<FontPairKey, FontPair> = {
//   poppins_dmsans: { serif: "'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif", sans: "'DM Sans', ui-sans-serif, sans-serif" },
//   newsreader_geist: { serif: "'Newsreader', Georgia, serif", sans: "'Geist', system-ui, sans-serif" },
//   instrument_geist: { serif: "'Instrument Serif', Georgia, serif", sans: "'Geist', system-ui, sans-serif" },
//   instrument_inter: { serif: "'Instrument Serif', Georgia, serif", sans: "'Inter Tight', system-ui, sans-serif" },
//   all_grotesk: { serif: "'Geist', system-ui, sans-serif", sans: "'Geist', system-ui, sans-serif" },
// };

// const FONT_PAIR_LABELS: Record<FontPairKey, string> = {
//   poppins_dmsans: 'Poppins + DM Sans (Homepage)',
//   newsreader_geist: 'Newsreader + Geist',
//   instrument_geist: 'Instrument Serif + Geist',
//   instrument_inter: 'Instrument Serif + Inter Tight',
//   all_grotesk: 'All Geist (grotesk only)',
// };

// const ACCENTS = ['#d33568', '#7c3aed', '#0ea5e9', '#10b981', '#f59e0b'];

// export function AppShell(): React.ReactElement {
//   const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//   const [route, navigate] = useHashRoute();

//   const pair = FONT_PAIRS[t.fontPair] ?? FONT_PAIRS.poppins_dmsans;
//   const accentHex = t.accent;
//   const accentRgb = hexToRgb(accentHex);
//   const accentBright = lighten(accentHex, 0.08);

//   const accentGlow = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.35)`;
//   const accentSoft = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.10)`;
//   const brandGlow = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.18)`;
//   const brandBorder = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.25)`;

//   const cssVars: React.CSSProperties = {
//     // font — drive both wb vars and site-compat aliases
//     ['--font-display' as string]: pair.serif,
//     ['--font-body' as string]: pair.sans,
//     ['--font-serif' as string]: pair.serif,
//     ['--font-sans' as string]: pair.sans,
//     // accent — drive both wb (--brand) and site-compat (--accent) together
//     ['--accent' as string]: accentHex,
//     ['--brand' as string]: accentHex,
//     ['--accent-bright' as string]: accentBright,
//     ['--accent-glow' as string]: accentGlow,
//     ['--accent-soft' as string]: accentSoft,
//     ['--brand-glow' as string]: brandGlow,
//     ['--brand-soft' as string]: accentSoft,
//     ['--brand-softer' as string]: `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.05)`,
//     ['--brand-border' as string]: brandBorder,
//     ['--gradient-1' as string]: accentHex,
//   };

//   return (
//     <div style={cssVars} className={t.motion ? '' : 'no-motion'}>
//       <SiteNav route={route} navigate={navigate} />

//       {route === 'home' && (
//         <PageHome
//           motion={t.motion}
//           intensity={t.gradientIntensity}
//           heroVariant={t.heroVariant}
//           navigate={navigate}
//         />
//       )}
//       {route === 'gst-soft' && (
//         <PageGSTSoftware
//           motion={t.motion}
//           intensity={t.gradientIntensity}
//           navigate={navigate}
//         />
//       )}
//       {route === 'gst-api' && (
//         <PageGSTAPI
//           motion={t.motion}
//           intensity={t.gradientIntensity}
//           navigate={navigate}
//         />
//       )}

//       <SiteFooter navigate={navigate} />

//       <TweaksPanel>
//         <TweakSection label="Brand" />
//         <TweakColor
//           label="Primary accent"
//           value={t.accent}
//           options={ACCENTS}
//           onChange={(v) => setTweak('accent', v as string)}
//         />
//         <TweakSlider
//           label="Gradient intensity"
//           value={t.gradientIntensity}
//           min={0}
//           max={1}
//           step={0.05}
//           onChange={(v) => setTweak('gradientIntensity', v)}
//         />

//         <TweakSection label="Type" />
//         <TweakSelect
//           label="Font pairing"
//           value={t.fontPair}
//           options={Object.keys(FONT_PAIRS).map((k) => ({
//             value: k,
//             label: FONT_PAIR_LABELS[k as FontPairKey],
//           }))}
//           onChange={(v) => setTweak('fontPair', v as FontPairKey)}
//         />

//         <TweakSection label="Hero" />
//         <TweakRadio
//           label="Hero variant"
//           value={t.heroVariant}
//           options={[
//             { value: 'reconciliation', label: 'Recon' },
//             { value: 'copilot', label: 'Copilot' },
//             { value: 'terminal', label: 'Terminal' },
//           ]}
//           onChange={(v) => setTweak('heroVariant', v as TweakDefaults['heroVariant'])}
//         />

//         <TweakSection label="Motion" />
//         <TweakToggle
//           label="AI motion effects"
//           value={t.motion}
//           onChange={(v) => setTweak('motion', v)}
//         />

//         <TweakSection label="Variations" />
//         {/* <TweakButton
//           label="Open hero variations canvas →"
//           onClick={() => { window.location.href = '/hero-variations'; }}
//         /> */}
//       </TweaksPanel>
//     </div>
//   );
// }
