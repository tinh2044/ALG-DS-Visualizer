import { useState } from 'react';
import {
  getRandomNumInRange,
} from '@/helpers/sorting/array';
import { useAppDispatch } from '@/redux/hooks';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';

import { NumberGenProps } from '@/types/sorting';
import { numberGenerator as defaultLimits } from '@/configs/sorting';
import { setArray } from '@/redux/sorting/visualizerSlice';

const NumberGenerator = ({ setInput }: NumberGenProps) => {
  const dispatch = useAppDispatch();
  
  // Add state for min, max, and array length
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(999);
  const [arrayLength, setArrayLength] = useState(defaultLimits.min);
  const [isOpen, setIsOpen] = useState(false);
  

  const onGenerate = () => {
    // Use the input values for array generation
    const newInput = Array.from(
      new Array(arrayLength),
      () => getRandomNumInRange(minValue, maxValue)
    );

    setInput(newInput.join(', '));
    dispatch(setArray(newInput));
    setIsOpen(false); // Close popover after generating
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button color="secondary" className="flex-1 md:flex-grow-0">
          Random
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Configure Random Array</h3>

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
              <label htmlFor="array-length" className="text-sm">
                Array Length:
              </label>
              <Input
                id="array-length"
                type="number"
                variant="bordered"
                value={arrayLength.toString()}
                onChange={(e) => setArrayLength(Number(e.target.value))}
                className="w-[100px] h-[32px]"
                min={5}
                max={100}
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

export default NumberGenerator;
