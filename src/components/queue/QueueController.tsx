import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  enqueueItem,
  dequeueItem,
  peekItem,
  setInputValue,
  resetQueue,
  resetHighlight,
} from '@/redux/queueSlice';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardHeader, CardBody } from '@heroui/card';
import QueueRandomGenerator from './QueueRandomGenerator';

const QueueController: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, isAnimating, lastOperation } = useSelector(
    (state: RootState) => state.queue
  );

  const handleEnqueue = () => {
    if (inputValue.trim()) {
      dispatch(
        enqueueItem(isNaN(Number(inputValue)) ? inputValue : Number(inputValue))
      );
      dispatch(setInputValue(''));
    }
  };

  const handleDequeue = () => {
    dispatch(resetHighlight());
    dispatch(dequeueItem());
  };

  const handlePeek = () => {
    dispatch(resetHighlight());
    dispatch(peekItem());
  };
  const handleReset = () => {
    dispatch(resetQueue());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEnqueue();
    }
  };


  return (
    <Card className="">
      <CardHeader>
        <h3 className="text-lg font-semibold">Queue Operations</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter a value"
              variant="bordered"
              value={inputValue}
              onChange={(e) => dispatch(setInputValue(e.target.value))}
              onKeyDown={handleKeyDown}
              disabled={isAnimating}
              className="flex-1"
            />
            <Button
              onPress={handleEnqueue}
              disabled={isAnimating || !inputValue.trim()}
              color="success"
            >
              Enqueue
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <QueueRandomGenerator />
            <Button
              onPress={handleReset}
              disabled={isAnimating}
              className="w-full"
              color="warning"
            >
              Reset Queue
            </Button>

            <Button
              onPress={handleDequeue}
              disabled={isAnimating}
              color="danger"
            >
              Dequeue
            </Button>
            <Button
              onPress={handlePeek}
              disabled={isAnimating}
              color="secondary"
            >
              Peek
            </Button>
          </div>
        </div>

        {lastOperation.type && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Last Operation:</h3>
            <div>
              <span className="font-mono">{lastOperation.type}</span>
              {lastOperation.result !== undefined && (
                <span className="ml-2 font-mono">
                  → {JSON.stringify(lastOperation.result)}
                </span>
              )}
            </div>
          </div>
        )}
        {/* </div> */}
      </CardBody>
    </Card>
  );
};

export default QueueController; 