import {GridsterItemComponentInterface} from "angular-gridster2/lib/gridsterItem.interface";
import {GridsterItem} from "angular-gridster2";

export interface KesyTableInterface {
  x: number;
  y: number;
  rows: number;
  cols: number;
  layerIndex?: number;
  initCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  resizableHandles?: {
    s?: boolean;
    e?: boolean;
    n?: boolean;
    w?: boolean;
    se?: boolean;
    ne?: boolean;
    sw?: boolean;
    nw?: boolean;
  };
  compactEnabled?: boolean;
  maxItemRows?: number;
  minItemRows?: number;
  maxItemCols?: number;
  minItemCols?: number;
  minItemArea?: number;
  maxItemArea?: number;
  [propName: string]: any;
  type: string;
  nbPlace: number;
  nom: string;
  variante?: number;
  id?: string;
}
