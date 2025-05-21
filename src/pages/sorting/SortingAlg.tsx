import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import NoInput from '@/components/sorting/Visualizer/NoInput';
import Visualizer from '@/components/sorting/Visualizer';
import { algList } from '@/algorithms/sorting/algList';
import { setIsPlaying } from '@/redux/sorting/visualizerSlice';
import { sortCompletionMessage } from '@/configs/sorting';
import { showSuccessToast } from '@/helpers/toast';
import useCompletion from '@/hooks/useCompletion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Controller from '@/components/sorting/Controller';
import CodeDisplay from '@/components/sorting/CodeDisplay';
import { algoSourceCodeMap } from '@/helpers/sorting/algoSourceCode';

function SortingAlg() {
  const { algName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sorting.array);
  const reset = useAppSelector((state) => state.sorting.reset);
  const [highlightState, setHighlightState] = useState({
    swaps: [-1, -1],
    highlights: [-1, -1],
    sorts: [] as number[],
    pivot: -1,
  });

  const selectedAlg =
    algList.find(({ name }) => name === algName) ?? algList[0];
  const { onComplete, isComplete } = useCompletion(1, reset);

  const sourceCodeInfo = algoSourceCodeMap[selectedAlg.name] || {
    code: '',
    lineMapping: {},
  };

  useEffect(() => {
    if (isComplete) {
      showSuccessToast('Success', sortCompletionMessage);
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        <div className="md:w-1/2 lg:w-fit mb-6 md:mb-0">
          <CodeDisplay
            algoName={selectedAlg.name}
            sourceCode={sourceCodeInfo.code}
            highlightState={highlightState}
            lineMapping={sourceCodeInfo.lineMapping}
          />
        </div>
        <div className="md:w-1/2 lg:flex-grow flex items-center justify-start flex-col">
      <Controller />
          {array.length > 0 ? (
            <Visualizer
              key={selectedAlg.name + array.toString() + reset}
              array={array}
              name={selectedAlg.name}
              fn={selectedAlg.fn}
              onComplete={onComplete}
              onHighlightChange={setHighlightState}
            />
          ) : (
            <NoInput />
          )}
        </div>
      </div>
    </div>
  );
}

export default SortingAlg;
