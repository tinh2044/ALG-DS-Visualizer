import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardHeader, CardBody } from '@heroui/card';
import QueueCell from './QueueCell';

const QueueVisualizer: React.FC = () => {
  const { items, lastOperation } = useSelector((state: RootState) => state.queue);
  
  const getOperationType = () => {
    if (lastOperation.type === 'enqueue' || lastOperation.type === 'dequeue' || lastOperation.type === 'peek') {
      return lastOperation.type;
    }
    return null;
  };

  const operation = getOperationType();

  return (
    <Card className="w-full h-full flex-grow">
      <CardHeader className="flex gap-1">
        <h3 className="text-lg font-semibold">Queue Visualization</h3>
      </CardHeader>
      <CardBody>
        <div className="w-full h-full flex flex-col items-center justify-start">
          {items.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full">
              <p className="text-muted-foreground">Queue is empty</p>
              <p className="text-sm text-muted-foreground mt-2">
                Use the enqueue operation to add items
              </p>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-start pl-10 pr-10">
              {items.map((item, index) => (
                <QueueCell
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  operation={operation}
                />
              ))}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default QueueVisualizer; 