import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  pushItem,
  popItem,
  peekItem,
  setInputValue,
  resetStack,
  resetHighlight,
} from '@/redux/stackSlice';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardHeader, CardBody } from '@heroui/card';
import StackRandomGenerator from './StackRandomGenerator';

const StackController: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, isAnimating, lastOperation } = useSelector(
    (state: RootState) => state.stack
  );

  const handlePush = () => {
    if (inputValue.trim()) {
      dispatch(
        pushItem(isNaN(Number(inputValue)) ? inputValue : Number(inputValue))
      );
      dispatch(setInputValue(''));
    }
  };

  const handlePop = () => {
    dispatch(resetHighlight());
    dispatch(popItem());
  };

  const handlePeek = () => {
    dispatch(resetHighlight());
    dispatch(peekItem());
  };


  const handleReset = () => {
    dispatch(resetStack());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePush();
    }
  };


  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-semibold">Stack Operations</h3>
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
              onPress={handlePush}
              disabled={isAnimating || !inputValue.trim()}
              color="default"
            >
              Push
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <StackRandomGenerator />
            <Button
              onPress={handleReset}
              disabled={isAnimating}
              className="w-full"
              color="danger"
            >
              Reset Stack
            </Button>
            <Button onPress={handlePop} disabled={isAnimating} color="warning">
              Pop
            </Button>
            <Button
              onPress={handlePeek}
              disabled={isAnimating}
              color="secondary"
            >
              Peek
            </Button>
            
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
        </div>
      </CardBody>
    </Card>
  );
};

export default StackController;
