import { useEffect, useRef } from 'react';
import { CellElement, CellType } from '@/types/pathFinding';
import useMouseActions from './useMouseActions';
import { getCellDetails } from '@/helpers/pathFinding/action';
import { useAppDispatch } from '@/redux/hooks';
import { setCell } from '@/redux/pathFinding/pathFindingSlice';

interface Props {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export function useMouse({ isMobile, ref }: Props) {
  const dispatch = useAppDispatch();
  const { element, isMouseDown } = useMouseActions({ isMobile, ref });
  const { isValidCell, selectedCell } = getCellDetails(element);
  const targetCellRef = useRef<CellElement | null>(null);
  const prevCellRef = useRef<CellElement | null>(null);

  useEffect(() => {
    if (!isMouseDown) {
      targetCellRef.current = null;
      prevCellRef.current = null;
    }
  }, [isMouseDown]);

  useEffect(() => {
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
      return;
    }

    if ([CellType.entry, CellType.exit].includes(selectedCell.cellType)) {
      targetCellRef.current = selectedCell;
      return;
    }

    const sameAsPrevCell =
      prevCellRef.current?.row === selectedCell.row &&
      prevCellRef.current?.col === selectedCell.col;
    if (!sameAsPrevCell) {
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
      prevCellRef.current = selectedCell;
    }
  }, [isValidCell, selectedCell, dispatch]);
}
