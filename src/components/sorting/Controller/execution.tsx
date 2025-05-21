import {
  setIsPlaying,
  setReset,
  setSpeed,
  startTimer,
} from '@/redux/sorting/visualizerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { Slider, Button, Tooltip } from '@heroui/react';
import { FaPlay, FaPause, FaUndo, FaRocket } from 'react-icons/fa';

const Execution = () => {
  const dispatch = useAppDispatch();
  const { array, speed, isPlaying, reset } = useAppSelector((state) => state.sorting);
  
  useEffect(() => {
    if (isPlaying) {
      dispatch(startTimer());
    }
  }, [dispatch, isPlaying]);

  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch, reset]);

  useEffect(() => {
    dispatch(setSpeed(speed));
  }, [dispatch, speed]);

  return (
    <div className="flex flex-1 items-center gap-4 mt-5 md:mt-0">
      <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
        <Button
          isIconOnly
          onPress={() => dispatch(setIsPlaying(!isPlaying))}
          isDisabled={array.length === 0 || isPlaying === null}
          color={isPlaying ? 'warning' : 'success'}
          variant="light"
          radius="full"
          size="sm"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </Button>
      </Tooltip>

      <Tooltip content="Reset">
        <Button
          isIconOnly
          onPress={() => dispatch(setReset())}
          isDisabled={array.length === 0}
          color="danger"
          variant="light"
          radius="full"
          size="sm"
        >
          <FaUndo size={20} />
        </Button>
      </Tooltip>

      <Slider
        id="speed"
        aria-label="Animation speed"
        minValue={1}
        maxValue={20}
        value={speed}
        onChange={(value) => dispatch(setSpeed(Number(value)))}
        className="flex-1"
        size="sm"
        color="warning"
        radius="full"
        showTooltip
        tooltipProps={{
          content: `Speed: ${speed}`,
        }}
      />
    </div>
  );
}

export default Execution;
