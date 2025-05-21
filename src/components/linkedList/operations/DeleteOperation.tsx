import React, { useState } from 'react';
import { 
  Button, 
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import { LinkedListNode } from '@/types/linkedList';

interface DeleteOperationProps {
  isAnimating: boolean;
  positionValue: string;
  nodes: LinkedListNode[];
  handlePositionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  executeDeleteHead: () => void;
  executeDeleteTail: () => void;
  executeDeleteAt: () => void;
}

const DeleteOperation: React.FC<DeleteOperationProps> = ({
  isAnimating,
  positionValue,
  nodes,
  handlePositionChange,
  executeDeleteHead,
  executeDeleteTail,
  executeDeleteAt
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button 
          color="danger" 
          className="w-full"
          disabled={isAnimating || nodes.length === 0}
        >
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
          
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex items-start justify-between gap-2">
              <label htmlFor="delete-position" className="text-sm">
                Position:
              </label>
              <Input
                id="delete-position"
                type="number"
                variant="bordered"
                autoComplete='off'
                value={positionValue}
                onChange={handlePositionChange}
                className="w-[100px] h-[32px]"
                min={0}
                max={nodes.length - 1}
                size="sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button 
              color="danger" 
              onPress={() => {
                executeDeleteHead();
                setIsOpen(false);
              }} 
              disabled={nodes.length === 0 || isAnimating}
            >
              Del Head
            </Button>
            <Button 
              color="danger" 
              onPress={() => {
                executeDeleteTail();
                setIsOpen(false);
              }} 
              disabled={nodes.length === 0 || isAnimating}
            >
              Del Tail
            </Button>
            <Button 
              color="danger" 
              onPress={() => {
                executeDeleteAt();
                setIsOpen(false);
              }} 
              disabled={!positionValue || nodes.length === 0 || isAnimating}
            >
              Del Pos
            </Button>
          </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteOperation; 