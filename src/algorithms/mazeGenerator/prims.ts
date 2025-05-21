import { generateGrid } from '@/helpers/pathFinding/grid';
import { Cell, CellType, MazeAlgProps } from '@/types/pathFinding';
import {
  getRandomIndexFromArray,
  getValidTypeNeighbors,
  spliceRandomIndexFromArray,
} from '@/helpers/pathFinding/maze';

export const createPassage = (grid: CellType[][], cell: Cell) => {
  const mazeCells = getValidTypeNeighbors(grid, cell);

  const {
    value: { row, col },
  } = getRandomIndexFromArray(mazeCells);
  const middleCell = {
    row: cell.row + (row - cell.row) / 2,
    col: cell.col + (col - cell.col) / 2,
  };
  return middleCell;
}

export const generatePrimsMaze = async ({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgProps) => {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  const neighbors: Cell[] = [];
  const startCell = { row: 0, col: 0 };
  updateCells(grid, startCell);

  neighbors.push(...getValidTypeNeighbors(grid, startCell, CellType.wall));
  while (neighbors.length) {
    const neighbor = spliceRandomIndexFromArray(neighbors);

    if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
      const middleCell = createPassage(grid, neighbor);
      await updateCells(grid, [middleCell, neighbor]);
      neighbors.push(...getValidTypeNeighbors(grid, neighbor, CellType.wall));
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
