import { generateGrid } from '@/helpers/pathFinding/grid';
import { CellType, MazeAlgProps } from '@/types/pathFinding';

export const generateRandomMaze = async ({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgProps) => {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (Math.random() < 0.25) {
        await updateCells(grid, { row, col }, CellType.wall);
      }
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
