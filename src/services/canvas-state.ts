import { apiClient } from './axios';
import type { CanvasState } from '@/types/design-canvas';

const DC_STATE_FILE = '.design-canvas.state.json';

export async function fetchCanvasState(): Promise<CanvasState | null> {
  try {
    const response = await apiClient.get<CanvasState>(DC_STATE_FILE);
    if (response.data?.sections) return response.data;
    return null;
  } catch {
    return null;
  }
}

export function writeCanvasState(sections: CanvasState['sections']): void {
  window.omelette
    ?.writeFile(DC_STATE_FILE, JSON.stringify({ sections }))
    .catch(() => {});
}
