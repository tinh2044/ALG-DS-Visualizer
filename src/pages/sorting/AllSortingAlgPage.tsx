import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import AlgoSelection from '@/components/sorting/Controller/AlgSelection';
import NoInput from '@/components/sorting/Visualizer/NoInput';
import Visualizer from '@/components/sorting/Visualizer';
import useCompletion from '@/hooks/useCompletion';
import { algList } from '@/algorithms/sorting/algList';
import { setIsPlaying } from '@/redux/sorting/visualizerSlice';
import { useEffect } from 'react';
import Controller from '@/components/sorting/Controller';

function AllSortingAlgPage() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sorting.array);
  const reset = useAppSelector((state) => state.sorting.reset);
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sorting.selectedAlgosStatus
  );

  let selectedAlgos = algList.filter((_, idx) => selectedAlgosStatus[idx]);
  if (selectedAlgos.length === 0) {
    selectedAlgos = algList;
  }
  const { onComplete, isComplete } = useCompletion(selectedAlgos.length, reset);

  useEffect(() => {
    if (isComplete) {
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);
  return (
    <div>
      <Controller />
      <AlgoSelection />

      <div className="flex justify-center flex-wrap gap-[20px] mt-[30px] mb-[80px]">
        {array.length !== 0 ? (
          selectedAlgos.map((algo) => (
            <Visualizer
              key={array.toString() + reset + algo.name}
              array={array}
              name={algo.name}
              fn={algo.fn}
              onComplete={onComplete}
            />
          ))
        ) : (
          <NoInput />
        )}
      </div>
    </div>
  );
}

export default AllSortingAlgPage;
