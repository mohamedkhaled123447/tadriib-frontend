// atrament.d.ts
declare module 'atrament2' {
    export type AtramentMode = 'draw' | 'erase' | 'fill';
  
    export interface AtramentOptions {
      width: number;
      height: number;
      color?: string;
      adaptiveStroke?: boolean;
    }
  
    export class Atrament {
      constructor(selector: string | HTMLCanvasElement, options?: AtramentOptions);
  
      // Metodi
      clear(): void;
      setMode(mode: AtramentMode): void;
      setColor(color: string): void;
      setWeight(weight: number): void;
      setAdaptiveStroke(enabled: boolean): void;
  
      // Eventi
      addEventListener(event: string, callback: Function): void;
  
      // Proprietà
      color: string;
      weight: number;
      mode: AtramentMode;
      adaptiveStroke: boolean;
    }
  
    export default Atrament;
  }
  
