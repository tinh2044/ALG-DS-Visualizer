import { AppDispatch, RootState } from '@/redux/store';
import {
  setCells as setStateCells,
  setGrid,
  setStatus,
  setVisitedCellCount,
} from './pathFindingSlice';
import { Cell, CellType, MazeAlgProps, Status } from '@/types/pathFinding';
import { delay } from '@/helpers/async';

export function generateMaze(
  mazeAlgo: (props: MazeAlgProps) => Promise<CellType[][]>,
  delayDuration: number
) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().pathFinding;
    dispatch(setVisitedCellCount(0));

    dispatch(setStatus(Status.Generating));

    function updateGrid(grid: CellType[][]) {
      if (delayDuration) {
        dispatch(setGrid({ grid, clone: true }));
      }
    }

    function isGenerating() {
      return getState().pathFinding.status === Status.Generating;
    }

    async function updateCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isGenerating()) {
        throw new Error('Maze generation cancelled');
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }

      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
      });

      if (delayDuration) {
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
      }
    }

    try {
      const grid = await mazeAlgo({
        rows: state.rows,
        cols: state.cols,
        entry: state.entry,
        exit: state.exit,
        updateGrid,
        updateCells,
      });

      dispatch(setGrid({ grid }));
      dispatch(setStatus(Status.Ready));
    } catch {
      // maze generation cancelled
      // no action needed
    }
  };
}
