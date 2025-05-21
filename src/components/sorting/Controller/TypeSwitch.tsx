import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@heroui/react';
import { toggleVisualizerType } from '@/redux/sorting/visualizerSlice';

const TypeSwitch = () => {
  const dispatch = useAppDispatch();
  const visualizerType = useAppSelector(
    (state) => state.sorting.visualizerType
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        size="sm"
        color={visualizerType === 'cell' ? 'default' : 'secondary'}
        variant={visualizerType === 'cell' ? 'solid' : 'light'}
        onPress={() => {
          if (visualizerType !== 'cell') {
            dispatch(toggleVisualizerType());
          }
        }}
        className="min-w-16 text-[14px]"
      >
        Cell
      </Button>
      <Button
        size="sm"
        color={visualizerType === 'bar' ? 'default' : 'secondary'}
        variant={visualizerType === 'bar' ? 'solid' : 'light'}
        onPress={() => {
          if (visualizerType !== 'bar') {
            dispatch(toggleVisualizerType());
          }
        }}
        className="min-w-16 text-[14px]"
      >
        Bar
      </Button>
    </div>
  );
}

export default TypeSwitch;
