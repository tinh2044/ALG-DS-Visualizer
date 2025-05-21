import { useState } from 'react';
import { getRandomNumInRange } from '@/helpers/sorting/array';
import { useDispatch } from 'react-redux';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { v4 as uuid } from 'uuid';
import { setItems } from '@/redux/stackSlice';

function StackRandomGenerator() {
  const dispatch = useDispatch();
  
  // Add state for min, max, and stack size
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(999);
  const [stackSize, setStackSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  
  const onGenerate = () => {
    // Generate random stack items
    const newItems = Array.from(
      new Array(stackSize),
      () => ({
        value: getRandomNumInRange(minValue, maxValue),
        id: uuid(),
        highlighted: false
      })
    );

    dispatch(setItems(newItems));
    setIsOpen(false); // Close popover after generating
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button color="secondary" className="w-full">
          Random Stack
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Configure Random Stack</h3>

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
              <label htmlFor="stack-size" className="text-sm">
                Stack Size:
              </label>
              <Input
                id="stack-size"
                type="number"
                variant="bordered"
                value={stackSize.toString()}
                onChange={(e) => setStackSize(Number(e.target.value))}
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

export default StackRandomGenerator; 