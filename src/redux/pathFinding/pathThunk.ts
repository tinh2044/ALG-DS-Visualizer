import { AppDispatch, RootState } from '@/redux/store';
import {
  setCell as setStateCell,
  setPathLength,
} from './pathFindingSlice';

import { Cell, CellType, Status } from '@/types/pathFinding';
import { toast } from 'sonner';
import { tracePath } from '@/algorithms/pathFinding/pathTracer';
import { delay } from '@/helpers/async';

export function highlightPath(
  grid: CellType[][],
  parents: Cell[][] | null,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let pathLength = 0;

    function isSearching() {
      return getState().pathFinding.status === Status.Searching;
    }

    async function updateCell(cell: Cell, cellType = CellType.path) {
      if (!isSearching()) {
        throw new Error('Path search cancelled');
      }

      grid[cell.row][cell.col] = cellType;

      pathLength += 1;
      if (delayDuration) {
        dispatch(setPathLength(pathLength));
        dispatch(setStateCell({ ...cell, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().pathFinding;
    if (parents) {
      toast.success('Path found!!! 😃');
      const pathLength = await tracePath({
        parents,
        entry: state.entry,
        exit: state.exit,
        updateCell,
      });

      dispatch(setPathLength(pathLength + 1));
    } else {
      toast.error('No path found 😔');
    }
  };
}
