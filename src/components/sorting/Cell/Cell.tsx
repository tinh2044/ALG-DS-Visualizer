import { CellProps } from '@/types/sorting';

const Cell = ({
  order,
  animation,
  value,
  isSorted = false,
  isHighlighted = false,
  isPivot = false,
}: CellProps) => {
  let cellClass = '';

  if (isPivot) {
    cellClass = 'pivot';
  }

  if (isSorted) {
    cellClass = 'sort';
  }

  if (isHighlighted) {
    cellClass = 'highlight';
  }

  return (
    <li
      className={`flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] 
        mx-1 bg-sort-default border border-primary/10 rounded shadow-md ${
        isPivot ? '!bg-secondary text-primary' : 
        isSorted ? '!bg-success ' : 
        isHighlighted ? '!bg-red-600 text-primary' : ''
      }`}
      style={{
        animation,
        order,
      }}
    >
      {value}
    </li>
  );
}

export default Cell;
