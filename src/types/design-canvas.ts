import type React from 'react';

export interface Transform {
  x: number;
  y: number;
  scale: number;
}

export interface SectionState {
  order?: string[];
  hidden?: string[];
  title?: string;
  label?: string;
  labels?: Record<string, string>;
  srcKey?: string;
}

export interface CanvasState {
  sections: Record<string, SectionState>;
  focus: string | null;
}

export interface DCContextValue {
  state: CanvasState;
  section: (id: string) => SectionState;
  patchSection: (
    id: string,
    patch: Partial<SectionState> | ((prev: SectionState) => SectionState)
  ) => void;
  setFocus: (slotId: string | null) => void;
}

export interface ArtboardEntry {
  sectionId: string;
  artboard: React.ReactElement;
}

export interface SectionMeta {
  title: string;
  subtitle?: string;
  slotIds: string[];
  orderedIds: string[];
}

export interface ViewportRefs {
  vpRef: React.RefObject<HTMLDivElement | null>;
  worldRef: React.RefObject<HTMLDivElement | null>;
  tf: React.MutableRefObject<Transform>;
}
