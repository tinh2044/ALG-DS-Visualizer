import {
  modifyAlgoSelection,
  setReset,
} from '@/redux/sorting/visualizerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { algList } from '@/algorithms/sorting/algList';

const AlgoSelection = () => {
  const dispatch = useAppDispatch();
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sorting.selectedAlgosStatus
  );

  const handleOnChange = (position: number) => {
    dispatch(modifyAlgoSelection(position));
    dispatch(setReset());
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {selectedAlgosStatus.map((checked, idx) => (
        <li key={idx} className="list-none">
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              id={`custom-checkbox-${algList[idx].name}`}
              name={algList[idx].name}
              value={algList[idx].name}
              checked={checked}
              onChange={() => handleOnChange(idx)}
              className="cursor-pointer"
            />
            <label 
              htmlFor={`custom-checkbox-${algList[idx].name}`}
              className="capitalize cursor-pointer"
            >
              {algList[idx].name}
            </label>
          </div>
        </li>
      ))}
    </div>
  );
}

export default AlgoSelection;
