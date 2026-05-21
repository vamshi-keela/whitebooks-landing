import { useQuery } from '@tanstack/react-query';
import { fetchCanvasState } from '@/services/canvas-state';
import type { CanvasState } from '@/types/design-canvas';

export function useDesignCanvasState() {
  return useQuery<CanvasState | null>({
    queryKey: ['design-canvas-state'],
    queryFn: fetchCanvasState,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
