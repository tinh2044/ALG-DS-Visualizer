import Cell from './Cell';
import MovingCell from './MovingCell';
import SwappingCell from './SwappingCell';
import { UIProps } from '@/types/sorting';

const CellUI = ({
  array,
  swaps,
  sorts,
  highlights,
  moves,
  pivot,
}: UIProps) => {
  const getCell = (idx: number, item: number) => {
    if (swaps.includes(idx)) {
      return (
        <SwappingCell
          key={idx}
          originalOrder={idx}
          order={swaps[0] === idx ? swaps[1] : swaps[0]}
          value={item}
          isHighlighted={highlights.includes(idx)}
        />
      );
    }

    if (moves && idx >= moves[0] && idx <= moves[1]) {
      return (
        <MovingCell
          key={idx}
          originalOrder={idx}
          order={idx === moves[0] ? moves[1] : idx - 1}
          isSwap={idx === moves[0]}
          value={item}
          isHighlighted={highlights.includes(idx)}
        />
      );
    }

    return (
      <Cell
        key={idx}
        order={idx}
        value={item}
        isSorted={sorts.includes(idx)}
        isHighlighted={highlights.includes(idx)}
        isPivot={idx === pivot}
      />
    );
  }

  return (
    <div className="relative px-5 w-full overflow-x-scroll">
      <ul className="flex py-[25px] pt-[25px] pb-[25px]" data-testid="cell-values">
        {array.map((item, idx) => getCell(idx, item))}
      </ul>

      <ul className="absolute bottom-[4px] -z-10 flex text-xs opacity-25">
        {array.map((_, idx) => (
          <li key={idx} className="w-[40px] mx-1 flex justify-center">{idx}</li>
        ))}
      </ul>
    </div>
  );
};

export default CellUI;
