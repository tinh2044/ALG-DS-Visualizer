import { AppDispatch, RootState } from '@/redux/store';
import { delay } from '@/helpers/async';
import { Cell, CellType, SearchAlgProps, Status } from '@/types/pathFinding';
import {
  setCells as setStateCells,
  setVisitedCellCount,
} from './pathFindingSlice';

export function searchPath(
  pathFindingAlgo: (
    props: SearchAlgProps
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let visitedCellCount = 0;

    function isSearching() {
      return getState().pathFinding.status === Status.Searching;
    }

    async function updateCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isSearching()) {
        throw new Error('Path search cancelled');
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }
      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
      });

      visitedCellCount += cells.length;
      if (delayDuration) {
        dispatch(setVisitedCellCount(visitedCellCount));
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().pathFinding;
    const { grid, parents } = await pathFindingAlgo({
      grid: state.grid,
      entry: state.entry,
      exit: state.exit,
      updateCells,
    });
    dispatch(setVisitedCellCount(visitedCellCount));
    return { grid, parents };
  };
}
