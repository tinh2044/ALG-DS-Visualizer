import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import StackCell from './StackCell';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';

const StackVisualizer: React.FC = () => {
  const { items, lastOperation } = useSelector(
    (state: RootState) => state.stack
  );

  // Operation type for highlighting
  const operation = lastOperation.type as 'push' | 'pop' | 'peek' | null;

  return (
    <Card>
      <CardBody className="flex flex-col items-center">
        <div className="w-full mb-4 pb-2 text-center font-semibold">
          Stack Visualization (LIFO)
        </div>
        <Divider className="mb-4" />

        <div className="w-96 max-w-full flex flex-col-reverse items-center">
          {items.length === 0 ? (
            <div className="w-full p-8 border-2 border-dashed border-muted rounded-md text-center text-muted-foreground">
              Stack is empty
            </div>
          ) : (
            <div className="flex flex-col-reverse justify-center items-start pl-10 pr-10 w-full">
              {items.map((item, index) => (
                <StackCell
                  key={item.id}
                  item={item}
                  isTop={index === items.length - 1}
                  operation={index === items.length - 1 ? operation : null}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          Stack size: <span className="font-bold">{items.length}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default StackVisualizer;
