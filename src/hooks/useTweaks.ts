import { useState, useCallback } from 'react';
import type { TweakDefaults, TweakKey, TweakValue } from '@/types/tweaks';

export function useTweaks(
  defaults: TweakDefaults
): [TweakDefaults, (keyOrEdits: TweakKey | Partial<TweakDefaults>, val?: TweakValue) => void] {
  const [values, setValues] = useState<TweakDefaults>(defaults);

  const setTweak = useCallback(
    (keyOrEdits: TweakKey | Partial<TweakDefaults>, val?: TweakValue) => {
      const edits: Partial<TweakDefaults> =
        typeof keyOrEdits === 'object' && keyOrEdits !== null
          ? keyOrEdits
          : { [keyOrEdits]: val } as Partial<TweakDefaults>;

      setValues((prev) => ({ ...prev, ...edits }));
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
      window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
    },
    []
  );

  return [values, setTweak];
}
