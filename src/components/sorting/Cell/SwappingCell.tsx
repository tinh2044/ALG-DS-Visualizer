import Cell from './Cell';
import { MovingCellProps } from '@/types/sorting';
import { getSwapAnimation } from '@/helpers/sorting/keyFrames';
import { swapInterval } from '@/redux/sorting/globalState';

const SwappingCell = ({
  originalOrder,
  order,
  value,
  isHighlighted,
}: MovingCellProps) => {
  const animation = getSwapAnimation(originalOrder - order, swapInterval);

  return (
    <Cell
      animation={animation}
      order={order}
      value={value}
      isHighlighted={isHighlighted}
    />
  );
} 

export default SwappingCell;
