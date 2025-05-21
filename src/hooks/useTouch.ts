import { useCallback, useEffect, useRef } from 'react';
import { CellElement, CellType } from '@/types/pathFinding';
import { getCellDetails } from '@/helpers/pathFinding/action';
import { useAppDispatch } from '@/redux/hooks';
import { setCell } from '@/redux/pathFinding/pathFindingSlice';

interface Props {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export function useTouch({ isMobile, ref }: Props) {
  const dispatch = useAppDispatch();
  const targetCellRef = useRef<CellElement | null>(null);

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { isValidCell, selectedCell } = getCellDetails(
        e.target as HTMLElement
      );

      if (!isValidCell) {
        return;
      }

      if (targetCellRef.current) {
        if (
          ![CellType.entry, CellType.exit, CellType.wall].includes(
            selectedCell.cellType
          )
        ) {
          dispatch(
            setCell({
              ...selectedCell,
              cellType: targetCellRef.current.cellType,
            })
          );
        }
        targetCellRef.current = null;
        return;
      }

      if ([CellType.entry, CellType.exit].includes(selectedCell.cellType)) {
        targetCellRef.current = selectedCell;
        return;
      }

      dispatch(
        setCell({
          row: selectedCell.row,
          col: selectedCell.col,
          cellType:
            selectedCell.cellType === CellType.wall
              ? CellType.clear
              : CellType.wall,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener('click', onClick);
    return () => {
      referenceEl.removeEventListener('mousedown', onClick);
    };
  }, [isMobile, onClick, ref]);
}
