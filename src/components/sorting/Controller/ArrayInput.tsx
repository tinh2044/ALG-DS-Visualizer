import React, { useEffect, useState } from 'react';
import {
  convertArrayStringToArray,
  convertInputToArrayString,
} from '@/helpers/sorting/array';
import {
  setArray,
  setIsPlaying,
  setReset,
} from '@/redux/sorting/visualizerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import NumberGenerator from './NumberGenerator';

const ArrayInput = () => {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sorting.array);
  const [input, setInput] = useState(array.join(', '));

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [array, dispatch]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAsStr = convertInputToArrayString(e.target.value);
    setInput(inputAsStr);
    const inputAsArray = convertArrayStringToArray(inputAsStr);
    dispatch(setArray(inputAsArray));
  };

  return (
    <div className="flex flex-wrap flex-[0_0_80%] gap-4 items-center">
      <NumberGenerator setInput={setInput} />
    
      <input
        id="user-input"
        className="flex-[2_2_0%] w-full min-w-[300px] p-1.5 text-black bg-white border border-gray-800 rounded placeholder:border placeholder:border-transparent placeholder:outline-2 placeholder:outline-solid placeholder:outline-red-500"
        type="text"
        placeholder="Numbers to sort (comma separate - max 3 digits)"
        value={input}
        onChange={onInputChange}
      />
    </div>
  );
}

export default ArrayInput;
