import {
  setIsPlaying,
  setReset,
} from '@/redux/sorting/visualizerSlice';

import ArrayInput from './ArrayInput';
import Execution from './execution';
import TypeSwitch from './TypeSwitch';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Controller = () => {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [algoName, dispatch]);

  return (
    <section className="px-5 mb-4 w-full">
      <ArrayInput />
      <div className=" flex mt-2 gap-2">
        <div className='w-4/12'>
          <TypeSwitch />
        </div>
        <Execution />
      </div>
    </section>
  );
}

export default Controller;
