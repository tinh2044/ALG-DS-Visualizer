import React, { useState } from 'react';
import { 
  Button, 
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import { LinkedListNode } from '@/types/linkedList';

interface UpdateOperationProps {
  isAnimating: boolean;
  inputValue: string;
  positionValue: string;
  nodes: LinkedListNode[];
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  executeUpdate: () => void;
}

const UpdateOperation: React.FC<UpdateOperationProps> = ({
  isAnimating,
  inputValue,
  positionValue,
  nodes,
  handleValueChange,
  handlePositionChange,
  executeUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button 
          color="warning" 
          className="w-full"
          disabled={isAnimating || nodes.length === 0}
        >
          Update
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[280px]">
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="update-value" className="text-sm">
                New Value:
              </label>
              <Input
                id="update-value"
                variant="bordered"
                autoComplete='off'
                value={inputValue}
                onChange={handleValueChange}
                className="w-[100px] h-[32px]"
                size="sm"
              />
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="update-position" className="text-sm">
                Position:
              </label>
              <Input
                id="update-position"
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
          
          <Button 
            color="warning" 
            onPress={() => {
              executeUpdate();
              setIsOpen(false);
            }} 
            disabled={!inputValue || !positionValue || nodes.length === 0 || isAnimating}
            className="mt-2"
          >
            Update Node
          </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UpdateOperation; 