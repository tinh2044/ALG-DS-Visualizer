import { useState } from 'react';
import { getRandomNumInRange } from '@/helpers/sorting/array';
import { useDispatch } from 'react-redux';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { v4 as uuid } from 'uuid';
import { setItems } from '@/redux/queueSlice';

function QueueRandomGenerator() {
  const dispatch = useDispatch();
  
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(999);
  const [queueSize, setQueueSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  
  const onGenerate = () => {
    const newItems = Array.from(
      new Array(queueSize),
      () => ({
        value: getRandomNumInRange(minValue, maxValue),
        id: uuid(),
        highlighted: false
      })
    );

    dispatch(setItems(newItems));
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button color="secondary" className="w-full">
          Random Queue
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Configure Random Queue</h3>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="min-value" className="text-sm">
                Min Value:
              </label>
              <Input
                id="min-value"
                type="number"
                variant="bordered"
                value={minValue.toString()}
                onChange={(e) => setMinValue(Number(e.target.value))}
                className="w-[100px] h-[32px]"
                min={0}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <label htmlFor="max-value" className="text-sm">
                Max Value:
              </label>
              <Input
                id="max-value"
                type="number"
                variant="bordered"
                value={maxValue.toString()}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                className="w-[100px] h-[32px]"
                min={minValue + 1}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <label htmlFor="queue-size" className="text-sm">
                Queue Size:
              </label>
              <Input
                id="queue-size"
                type="number"
                variant="bordered"
                value={queueSize.toString()}
                onChange={(e) => setQueueSize(Number(e.target.value))}
                className="w-[100px] h-[32px]"
                min={1}
                max={20}
                size="sm"
              />
            </div>
          </div>

          <Button color="secondary" className="mt-2" onPress={onGenerate}>
            Generate
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default QueueRandomGenerator; 