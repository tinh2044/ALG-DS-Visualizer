import { generateGrid } from '@/helpers/pathFinding/grid';
import { CellType, MazeAlgProps } from '@/types/pathFinding';
import {
  getRandomEvenNumber,
  getRandomOddNumber,
} from '@/helpers/pathFinding/maze';

interface DrawWallConfig {
  updateCells: MazeAlgProps['updateCells'];
  divisionPoint: number;
  passagePoint: number;
  start: number;
  end: number;
}

export const drawHorizontalWall = async (
  grid: CellType[][],
  { updateCells, divisionPoint, passagePoint, start, end }: DrawWallConfig
) => {
  for (let pos = start; pos <= end; pos++) {
    await updateCells(grid, { row: divisionPoint, col: pos }, CellType.wall);
  }
  await updateCells(grid, { row: divisionPoint, col: passagePoint });
}

export const drawVerticalWall = async (
  grid: CellType[][],
  { updateCells, divisionPoint, passagePoint, start, end }: DrawWallConfig
) => {
  for (let pos = start; pos <= end; pos++) {
    await updateCells(grid, { row: pos, col: divisionPoint }, CellType.wall);
  }
  await updateCells(grid, { row: passagePoint, col: divisionPoint });
}

export const recursiveDivision = async (
  grid: CellType[][],
  updateCells: MazeAlgProps['updateCells'],
  {
    rowStart,
    rowEnd,
    colStart,
    colEnd,
  }: {
    rowStart: number;
    rowEnd: number;
    colStart: number;
    colEnd: number;
  }
) => {
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
    return;
  }

  const width = colEnd - colStart;
  const height = rowEnd - rowStart;
  const isHorizontal = width < height;

  if (isHorizontal) {
    const divisionPoint = getRandomOddNumber(rowStart, rowEnd);
    const passagePoint = getRandomEvenNumber(colStart, colEnd);

    await drawHorizontalWall(grid, {
      updateCells,
      divisionPoint,
      passagePoint,
      start: colStart,
      end: colEnd,
    });

    await recursiveDivision(grid, updateCells, {
      rowStart,
      rowEnd: divisionPoint - 1,
      colStart,
      colEnd,
    });
    await recursiveDivision(grid, updateCells, {
      rowStart: divisionPoint + 1,
      rowEnd,
      colStart,
      colEnd,
    });
  } else {
    const divisionPoint = getRandomOddNumber(colStart, colEnd);
    const passagePoint = getRandomEvenNumber(rowStart, rowEnd);

    await drawVerticalWall(grid, {
      updateCells,
      divisionPoint,
      passagePoint,
      start: rowStart,
      end: rowEnd,
    });

    await recursiveDivision(grid, updateCells, {
      rowStart,
      rowEnd,
      colStart,
      colEnd: divisionPoint - 1,
    });
    await recursiveDivision(grid, updateCells, {
      rowStart,
      rowEnd,
      colStart: divisionPoint + 1,
      colEnd,
    });
  }
}

export const generateRecursiveDivisionMaze = async ({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgProps) => {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);

  await recursiveDivision(grid, updateCells, {
    rowStart: 0,
    rowEnd: rows - 1,
    colStart: 0,
    colEnd: cols - 1,
  });
  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);

  return grid;
}
