import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { generateRandomTree } from '@/redux/avlTreeSlice';
import { AVL_TREE_CONFIG } from '@/configs/avlTree';
import { RootState } from '@/redux/store';

const AVLTreeRandomGenerator: React.FC = () => {
  const dispatch = useDispatch();
  const { isAnimating } = useSelector((state: RootState) => state.avlTree);
  const [nodeCount, setNodeCount] = useState<number>(10);
  const [minValue, setMinValue] = useState<number>(AVL_TREE_CONFIG.controls.input.min);
  const [maxValue, setMaxValue] = useState<number>(AVL_TREE_CONFIG.controls.input.max);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = () => {
    dispatch(generateRandomTree({
      count: nodeCount,
      minValue,
      maxValue
    }));
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => !isAnimating && setIsOpen(open)}>
      <PopoverTrigger>
        <Button color="secondary" className="w-full" isDisabled={isAnimating}>
          Random Tree
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Configure Random Tree</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="node-count" className="text-sm">
                Node Count:
              </label>
              <Input
                id="node-count"
                type="number"
                variant="bordered"
                value={nodeCount.toString()}
                onChange={(e) => setNodeCount(Number(e.target.value))}
                className="w-[100px] h-[32px]"
                min={1}
                max={40}
                size="sm"
              />
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="min-value" className="text-sm">
                Min Value:
              </label>
              <Input
                id="min-value"
                type="number"
                variant="bordered"
                value={minValue.toString()}
                onChange={(e) => {
                  const newMin = Number(e.target.value);
                  setMinValue(newMin);
                  if (newMin >= maxValue) {
                    setMaxValue(newMin + 1);
                  }
                }}
                className="w-[100px] h-[32px]"
                min={AVL_TREE_CONFIG.controls.input.min}
                max={AVL_TREE_CONFIG.controls.input.max}
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
                onChange={(e) => {
                  const newMax = Number(e.target.value);
                  setMaxValue(newMax);
                  if (newMax <= minValue) {
                    setMinValue(newMax - 1);
                  }
                }}
                className="w-[100px] h-[32px]"
                min={minValue + 1}
                max={AVL_TREE_CONFIG.controls.input.max}
                size="sm"
              />
            </div>
          </div>
          
          <Button color="secondary" className="mt-2" onPress={handleGenerate}>
            Generate
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AVLTreeRandomGenerator; 