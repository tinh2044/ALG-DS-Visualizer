export interface Cell {
  row: number;
  col: number;
  isWall: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isVisited?: boolean;
  isPath?: boolean;
}

export type Grid = Cell[][];
export type Path = Cell[];  