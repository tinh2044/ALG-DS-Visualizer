export enum CellType {
  clear,
  entry,
  exit,
  wall,
  visited,
  path,
}

export enum Status {
  Generating,
  Ready,
  Searching,
  Complete,
}

export interface Cell {
  row: number;
  col: number;
}

export interface CellElement extends Cell {
  cellType: CellType;
}

export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  entry: Cell;
  exit: Cell;
  status: Status;
  visitedCellCount: number;
  pathLength: number;
}

export interface SearchAlgProps {
  grid: number[][];
  entry: Cell;
  exit: Cell;
  updateCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}

export interface MazeAlgProps {
  rows: number;
  cols: number;
  entry: Cell;
  exit: Cell;
  updateGrid: (grid: number[][]) => void;
  updateCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}

export interface PathAlgProps {
  parents: Cell[][];
  entry: Cell;
  exit: Cell;
  updateCell: (value: Cell) => Promise<void>;
}

export interface AlgConfig {
  title: string;
  path: string;
  description: string;
  algorithm: string;
  buttonText: string;
  code: string;
  howItWorks: {
    description: string;
    pseudocode: string;
    keyProperties: Array<{
      title: string;
      description: string;
    }>;
  };
  visualization: {
    description: string;
    grid: Array<{
      row: number;
      col: number;
      type: 'entry' | 'exit' | 'path' | 'visited' | 'wall' | 'empty';
    }>;
  };
  advantages: string[];
  limitations: string[];
  previewGrid: Array<{
    row: number;
    col: number;
    type: 'entry' | 'exit' | 'path' | 'visited' | 'wall' | 'empty';
  }>;
}
