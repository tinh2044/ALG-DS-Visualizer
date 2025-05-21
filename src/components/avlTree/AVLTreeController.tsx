import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { insert, search, traverse, setSpeed, reset, stopAnimation } from '@/redux/avlTreeSlice';
import { deleteNode } from '@/redux/avlTreeSlice';
import { validateInput } from '@/helpers/avlTree';
import { AVL_TREE_CONFIG } from '@/configs/avlTree';
import { Button, Divider } from '@heroui/react';
import AVLTreeRandomGenerator from './AVLTreeRandomGenerator';

const AVLTreeController: React.FC = () => {
  const dispatch = useDispatch();
  const { speed, isAnimating } = useSelector((state: RootState) => state.avlTree);
  const [value, setValue] = useState<string>('');

  const handleInsert = () => {
    const numValue = parseInt(value);
    if (validateInput(numValue)) {
      dispatch(insert(numValue));
      setValue('');
    }
  };

  const handleSearch = () => {
    const numValue = parseInt(value);
    if (validateInput(numValue)) {
      dispatch(search(numValue));
      setValue('');
    }
  };

  const handleDelete = () => {
    const numValue = parseInt(value);
    if (validateInput(numValue)) {
      dispatch(deleteNode(numValue));
      setValue('');
    }
  };

  const handleTraverse = (type: 'INORDER' | 'PREORDER' | 'POSTORDER' | 'LEVELORDER') => {
    dispatch(traverse(type));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSpeed(parseFloat(e.target.value)));
  };

  const handleReset = () => {
    dispatch(reset());
    setValue('');
  };

  const handleStopAnimation = () => {
    dispatch(stopAnimation());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="space-x-2 flex">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min={AVL_TREE_CONFIG.controls.input.min}
            max={AVL_TREE_CONFIG.controls.input.max}
            step={AVL_TREE_CONFIG.controls.input.step}
            disabled={isAnimating}
          />
          <Button color="success" onPress={handleInsert} isDisabled={isAnimating}>
            Insert
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button color="default" onPress={handleSearch} className="flex-1" isDisabled={isAnimating}>
            Search
          </Button>
          <Button color="danger" onPress={handleDelete} className="flex-1" isDisabled={isAnimating}>
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Traversal</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button color="secondary" onPress={() => handleTraverse('INORDER')} isDisabled={isAnimating}>
            Inorder
          </Button>
          <Button color="secondary" onPress={() => handleTraverse('PREORDER')} isDisabled={isAnimating}>
            Preorder
          </Button>
          <Button color="secondary" onPress={() => handleTraverse('POSTORDER')} isDisabled={isAnimating}>
            Postorder
          </Button>
          <Button
            color="secondary"
            onPress={() => handleTraverse('LEVELORDER')}
            isDisabled={isAnimating}
          >
            Level Order
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="speed" className="text-sm font-medium dark:text-white">
            Animation Speed
          </label>
          <span className="text-sm dark:text-white">{speed}x</span>
        </div>
        <input
          id="speed"
          type="range"
          min={AVL_TREE_CONFIG.controls.speed.min}
          max={AVL_TREE_CONFIG.controls.speed.max}
          step={AVL_TREE_CONFIG.controls.speed.step}
          value={speed}
          onChange={handleSpeedChange}
          className="w-full"
        />
      </div>

      {isAnimating && (
        <Button color="warning" onPress={handleStopAnimation} className="w-full">
          Stop Animation
        </Button>
      )}

      <Divider className='h-[1px]' />
      <div className="grid grid-cols-2 gap-2">
        <Button color="default" onPress={handleReset} className="w-full" isDisabled={isAnimating}>
          Reset
        </Button>
        <AVLTreeRandomGenerator />
      </div>
    </div>
  );
};

export default AVLTreeController; 