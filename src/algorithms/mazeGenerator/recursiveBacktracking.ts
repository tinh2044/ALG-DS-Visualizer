import { generateGrid } from '@/helpers/pathFinding/grid';
import { Cell, CellType, MazeAlgProps } from '@/types/pathFinding';
import { getValidTypeNeighbors } from '@/helpers/pathFinding/maze';

const createPassage = async (
  grid: CellType[][],
  updateCells: MazeAlgProps['updateCells'],
  cell: Cell,
  { row, col }: Cell
) => {
  const middleCell = {
    row: row + (cell.row - row) / 2,
    col: col + (cell.col - col) / 2,
  };

  await updateCells(grid, [middleCell, { row, col }]);
}

export const generateRecursiveBacktrackingMaze = async ({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgProps) => {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);
  updateCells(grid, { row: 0, col: 0 });

  const recursiveBacktracking = async (cell: Cell) => {
    const neighbors = getValidTypeNeighbors(grid, cell, CellType.wall);
    while (neighbors.length) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const neighbor = neighbors[randomIndex];
      neighbors.splice(randomIndex, 1);

      if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
        await createPassage(grid, updateCells, cell, neighbor);
        await recursiveBacktracking(neighbor);
      }
    }
  }

  await recursiveBacktracking({ row: 0, col: 0 });

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
