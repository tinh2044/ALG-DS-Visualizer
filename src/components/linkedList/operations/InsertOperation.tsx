import React, { useState } from 'react';
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import { LinkedListNode } from '@/types/linkedList';

interface InsertOperationProps {
  isAnimating: boolean;
  inputValue: string;
  positionValue: string;
  nodes: LinkedListNode[];
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  executeInsertHead: () => void;
  executeInsertTail: () => void;
  executeInsertAt: () => void;
}

const InsertOperation: React.FC<InsertOperationProps> = ({
  isAnimating,
  inputValue,
  positionValue,
  nodes,
  handleValueChange,
  handlePositionChange,
  executeInsertHead,
  executeInsertTail,
  executeInsertAt,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button color="default" className="w-full" disabled={isAnimating}>
          Insert
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="insert-value" className="text-sm">
              Value:
            </label>
            <Input
              id="insert-value"
              variant="bordered"
              autoComplete="off"
              value={inputValue}
              onChange={handleValueChange}
              className="w-[100px] h-[32px]"
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label htmlFor="insert-position" className="text-sm">
              Position:
            </label>
            <Input
              id="insert-position"
              type="number"
              variant="bordered"
              autoComplete="off"
              value={positionValue}
              onChange={handlePositionChange}
              className="w-[100px] h-[32px]"
              min={0}
              max={nodes.length}
              size="sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button
            color="default"
            onPress={() => {
              executeInsertHead();
              setIsOpen(false);
            }}
            disabled={!inputValue || isAnimating}
          >
            Insert Head
          </Button>
          <Button
            color="default"
            onPress={() => {
              executeInsertTail();
              setIsOpen(false);
            }}
            disabled={!inputValue || isAnimating}
          >
            Insert Tail
          </Button>
          <Button
            color="default"
            onPress={() => {
              executeInsertAt();
              setIsOpen(false);
            }}
            disabled={!inputValue || !positionValue || isAnimating}
          >
            Insert Pos
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InsertOperation;
