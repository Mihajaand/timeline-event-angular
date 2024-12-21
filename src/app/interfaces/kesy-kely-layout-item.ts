export interface KesyKelyLayoutItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  color: string,
  forme: string,
  nbPlace: string
}

export declare type KesyKelyGridLayout = KesyKelyLayoutItem[];
