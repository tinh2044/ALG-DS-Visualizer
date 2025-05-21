import { useEffect, useRef } from 'react';

import Header from './Header';
import BarUI from '@/components/sorting/BarUI';
import CellUI from '@/components/sorting/Cell/CellUI';
import useAlg from '@/hooks/useSortAlg';
import { SortAsyncGenerator } from '@/types/sorting';
import { useAppSelector } from '@/redux/hooks';

export interface VisualizerProps {
  array: number[];
  name: string;
  fn: (array: number[]) => SortAsyncGenerator;
  onComplete: () => void;
  onHighlightChange?: React.Dispatch<React.SetStateAction<{
    swaps: number[];
    highlights: number[];
    sorts: number[];
    pivot: number;
  }>>;
}

const Visualizer = ({
  array,
  name,
  fn,
  onComplete,
  onHighlightChange,
}: VisualizerProps) => {
  const sortingArray = useRef([...array]);

  const {
    swapCount,
    compareCount,
    isCompleted,
    swaps,
    sorts,
    highlights,
    pivot,
    moves,
  } = useAlg(sortingArray.current, fn);

  useEffect(() => {
    if (isCompleted) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  useEffect(() => {
    if (onHighlightChange) {
      onHighlightChange({
        swaps,
        highlights,
        sorts,
        pivot
      });
    }
  }, [swaps, sorts, highlights, pivot, onHighlightChange]);

  const visualizerType = useAppSelector(
    (state) => state.sorting.visualizerType
  );

  return (
    <section className="inline-block min-w-[300px] max-w-full p-5 shadow">
      <Header algoName={name} isCompleted={isCompleted} />

     {visualizerType === 'cell' && (
      <CellUI
        array={sortingArray.current}
        swaps={swaps}
        sorts={sorts}
        highlights={highlights}
        moves={moves}
        pivot={pivot}
      />
    )}

    {visualizerType === 'bar' && (
      <BarUI
        array={sortingArray.current}
        swaps={swaps}
        sorts={sorts}
        highlights={highlights}
        moves={moves}
        pivot={pivot}
      />
    )}

      <footer className="flex items-center justify-between">
        <span>
          Swaps: <strong>{swapCount}</strong>
        </span>
        <span>
          Comparisons: <strong>{compareCount}</strong>
        </span>
      </footer>
    </section>
  );
};

export default Visualizer;
