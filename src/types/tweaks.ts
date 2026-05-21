export type FontPairKey =
  | 'syne_dmsans'
  | 'newsreader_geist'
  | 'instrument_geist'
  | 'instrument_inter'
  | 'all_grotesk';

export type HeroVariant = 'reconciliation' | 'copilot' | 'terminal';

export interface TweakDefaults {
  accent: string;
  fontPair: FontPairKey;
  heroVariant: HeroVariant;
  motion: boolean;
  gradientIntensity: number;
}

export type TweakKey = keyof TweakDefaults;
export type TweakValue = TweakDefaults[TweakKey];

export type SetTweakFn = (
  keyOrEdits: TweakKey | Partial<TweakDefaults>,
  val?: TweakValue
) => void;

export interface FontPair {
  serif: string;
  sans: string;
}

export interface TweakOption<T = string> {
  value: T;
  label: string;
}
