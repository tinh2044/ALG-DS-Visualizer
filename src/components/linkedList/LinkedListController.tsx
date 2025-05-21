/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
} from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  insertHeadNode,
  insertTailNode,
  insertAtNode,
  deleteHeadNode,
  deleteTailNode,
  deleteAtNode,
  updateNode,
  setIsAnimating,
  setInputValue,
  setPositionValue,
} from '@/redux/linkedListSlice';

import {
  InsertOperation,
  DeleteOperation,
  UpdateOperation,
} from './operations';

interface LinkedListControllerProps {
  onOperationComplete?: (operation: string, success: boolean, message?: string) => void;
  onClearList?: () => void;
}

const LinkedListController: React.FC<LinkedListControllerProps> = ({ 
  onOperationComplete,
  onClearList 
}) => {
  const dispatch = useAppDispatch();
  const { 
    nodes, 
    isAnimating, 
    inputValue, 
    positionValue,
    lastOperation
  } = useAppSelector((state) => state.linkedList);
  
    const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  }, [dispatch]);

  const handlePositionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPositionValue(e.target.value));
  }, [dispatch]);

  const executeInsertHead = useCallback(() => {
    // if (isAnimating || !inputValue) return;
    
    dispatch(setIsAnimating(true));
    dispatch(insertHeadNode(inputValue));
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      dispatch(setInputValue(''));
      if (onOperationComplete) {
        onOperationComplete('insertHead', true);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, inputValue, isAnimating, onOperationComplete]);

  const executeInsertTail = useCallback(() => {
    if (isAnimating || !inputValue) return;
    
    dispatch(setIsAnimating(true));
    dispatch(insertTailNode(inputValue));
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      dispatch(setInputValue(''));
      if (onOperationComplete) {
        onOperationComplete('insertTail', true);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, inputValue, isAnimating, onOperationComplete]);

  const executeInsertAt = useCallback(() => {
    if (isAnimating || !inputValue || !positionValue) return;
    
    dispatch(setIsAnimating(true));
    dispatch(insertAtNode({ 
      value: inputValue, 
      position: parseInt(positionValue, 10) 
    }));
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      dispatch(setInputValue(''));
      dispatch(setPositionValue(''));
      if (onOperationComplete) {
        const success = lastOperation.result !== 'Invalid position';
        onOperationComplete('insertAt', success, typeof lastOperation.result === 'string' ? lastOperation.result : undefined);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, inputValue, positionValue, isAnimating, onOperationComplete, lastOperation]);

  const executeDeleteHead = useCallback(() => {
    if (isAnimating) return;
    
    dispatch(setIsAnimating(true));
    dispatch(deleteHeadNode());
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      if (onOperationComplete) {
        const success = lastOperation.result !== 'List is empty';
        onOperationComplete('deleteHead', success, typeof lastOperation.result === 'string' ? lastOperation.result : undefined);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, isAnimating, onOperationComplete, lastOperation]);

  const executeDeleteTail = useCallback(() => {
    if (isAnimating) return;
    
    dispatch(setIsAnimating(true));
    dispatch(deleteTailNode());
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      if (onOperationComplete) {
        const success = lastOperation.result !== 'List is empty';
        onOperationComplete('deleteTail', success, typeof lastOperation.result === 'string' ? lastOperation.result : undefined);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, isAnimating, onOperationComplete, lastOperation]);

  const executeDeleteAt = useCallback(() => {
    if (isAnimating || !positionValue) return;
    
    dispatch(setIsAnimating(true));
    dispatch(deleteAtNode(parseInt(positionValue, 10)));
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      dispatch(setPositionValue(''));
      if (onOperationComplete) {
        const success = !(lastOperation.result === 'List is empty' || lastOperation.result === 'Invalid position');
        onOperationComplete('deleteAt', success, typeof lastOperation.result === 'string' ? lastOperation.result : undefined);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, positionValue, isAnimating, onOperationComplete, lastOperation]);

  const executeUpdate = useCallback(() => {
    if (isAnimating || !inputValue || !positionValue) return;
    
    dispatch(setIsAnimating(true));
    dispatch(updateNode({ 
      position: parseInt(positionValue, 10), 
      value: inputValue 
    }));
    
    const timeout = setTimeout(() => {
      dispatch(setIsAnimating(false));
      dispatch(setInputValue(''));
      dispatch(setPositionValue(''));
      if (onOperationComplete) {
        const success = !(lastOperation.result === 'List is empty' || lastOperation.result === 'Invalid position');
        onOperationComplete('update', success, typeof lastOperation.result === 'string' ? lastOperation.result : undefined);
      }
    }, 1000);
    
    setAnimationTimeout(timeout);
  }, [dispatch, inputValue, positionValue, isAnimating, onOperationComplete, lastOperation]);

  useEffect(() => {
    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [animationTimeout]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">LinkedList Operations</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-4">
          

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <InsertOperation
              isAnimating={isAnimating}
              inputValue={inputValue}
              positionValue={positionValue}
              nodes={nodes}
              handleValueChange={handleValueChange}
              handlePositionChange={handlePositionChange}
              executeInsertHead={executeInsertHead}
              executeInsertTail={executeInsertTail}
              executeInsertAt={executeInsertAt}
            />

            <DeleteOperation
              isAnimating={isAnimating}
              positionValue={positionValue}
              nodes={nodes}
              handlePositionChange={handlePositionChange}
              executeDeleteHead={executeDeleteHead}
              executeDeleteTail={executeDeleteTail}
              executeDeleteAt={executeDeleteAt}
            />

            <UpdateOperation
              isAnimating={isAnimating}
              inputValue={inputValue}
              positionValue={positionValue}
              nodes={nodes}
              handleValueChange={handleValueChange}
              handlePositionChange={handlePositionChange}
              executeUpdate={executeUpdate}
            />
            {/* <NavigationOperations
              isAnimating={isAnimating}
              nodes={nodes}
              executeTraverse={executeTraverse}
              executeReverse={executeReverse}
            /> */}
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SearchOperation
              isAnimating={isAnimating}
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
              executeSearch={executeSearch}
            />
          </div> */}

          <div className="flex justify-end mt-2">
            <Button
              color="danger"
              variant="light"
              onPress={onClearList}
              disabled={isAnimating || nodes.length === 0}
            >
              Clear List
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LinkedListController; 