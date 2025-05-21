import {
  getMovingAnimation,
  getSwapAnimation,
} from '@/helpers/sorting/keyFrames';

import Cell from './Cell';
import { MovingCellProps } from '@/types/sorting';
import { swapInterval } from '@/redux/sorting/globalState';

const MovingCell = ({
  originalOrder,
  isSwap,
  order,
  value,
  isHighlighted,
}: MovingCellProps) => {
  let animation = getMovingAnimation(originalOrder - order, swapInterval);

  if (isSwap) {
    animation = getSwapAnimation(originalOrder - order, swapInterval);
  }

  return (
    <Cell
      animation={animation}
      order={order}
      value={value}
      isHighlighted={isHighlighted}
    />
  );
}

export default MovingCell;
