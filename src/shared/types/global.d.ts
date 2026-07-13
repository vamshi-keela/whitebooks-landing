export {};

declare global {
  interface Window {
    omelette?: {
      writeFile: (path: string, content: string) => Promise<void>;
    };
  }

  interface GestureEvent extends UIEvent {
    scale: number;
    rotation: number;
    clientX: number;
    clientY: number;
  }
}
