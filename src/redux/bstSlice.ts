import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BSTState, BSTNode, BSTOperation } from '@/types/bst';
import { BinarySearchTree } from '@/algorithms/ds/bst';
import { showErrorToast, showSuccessToast } from '@/helpers/toast';

// Interface for random tree generation
interface RandomTreeParams {
  count: number;
  minValue: number;
  maxValue: number;
}

const initialState: BSTState = {
  tree: null,
  operations: [],
  currentOperation: 0,
  // isPlaying: false,
  speed: 1,
  traversalType: null,
  error: null,
  isAnimating: false,
  buildSteps: undefined,
  currentStep: 0
};

// Helper function to generate unique random numbers
const generateUniqueRandomNumbers = (count: number, min: number, max: number): number[] => {
  const numbers = new Set<number>();
  
  while (numbers.size < count && numbers.size < (max - min + 1)) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  
  return Array.from(numbers);
};

// Helper function to create a BST step by step
const createStepByStepTree = (numbers: number[]): {operations: BSTOperation[], steps: BSTNode[]} => {
  const bst = new BinarySearchTree();
  const steps: BSTNode[] = [];
  let allOperations: BSTOperation[] = [];

  // For each number, add it to the tree and save intermediate state
  for (let i = 0; i < numbers.length; i++) {
    const ops = bst.insert(numbers[i]);
    allOperations = [...allOperations, ...ops];
    
    // Save a copy of the current tree state after each insertion
    const currentRoot = bst.getRoot();
    if (currentRoot) {
      // Deep clone the current tree to save its state
      const clonedTree = JSON.parse(JSON.stringify(currentRoot));
      steps.push(clonedTree);
    }
  }

  return { operations: allOperations, steps };
};

// Helper function to create snapshots during delete operation
const createDeleteStepByStepTree = (tree: BSTNode | null, valueToDelete: number): {operations: BSTOperation[], steps: BSTNode[]} => {
  const bst = new BinarySearchTree();
  if (tree) {
    bst.setRoot(JSON.parse(JSON.stringify(tree))); // Deep clone to avoid modifying original
  }
  
  // Capture initial state
  const initialTree = JSON.parse(JSON.stringify(bst.getRoot()));
  const steps: BSTNode[] = [initialTree];
  
  // Perform delete operation and capture operations
  const operations = bst.delete(valueToDelete);
  
  // Capture final state after deletion
  const finalTree = JSON.parse(JSON.stringify(bst.getRoot()));
  steps.push(finalTree);
  
  return { operations, steps };
};

const bstSlice = createSlice({
  name: 'bst',
  initialState,
  reducers: {
    insert: (state, action: PayloadAction<number>) => {
      const bst = new BinarySearchTree();
      if (state.tree) {
        bst.setRoot(state.tree);
      }
      const operations = bst.insert(action.payload);
      state.tree = bst.getRoot();
      state.operations = operations;
      state.currentOperation = 0;
      // state.isPlaying = true;
      state.isAnimating = true;
      state.error = null;
    },
    search: (state, action: PayloadAction<number>) => {
      const bst = new BinarySearchTree();
      if (state.tree) {
        bst.setRoot(state.tree);
      }
      state.operations = bst.search(action.payload);
      state.currentOperation = 0;
      // state.isPlaying = true;
      state.isAnimating = true;
      state.error = null;
    },
    delete: (state, action: PayloadAction<number>) => {
      const valueToDelete = action.payload;
      
      // Store current tree for animation
      const currentTree = state.tree;
      
      // Create animation data for step-by-step deletion
      const { operations, steps } = createDeleteStepByStepTree(currentTree, valueToDelete);
      
      // Store the operations and all tree steps
      state.operations = operations;
      state.buildSteps = steps;
      state.currentStep = 0;
      state.currentOperation = 0;
      state.isAnimating = true;
      state.error = null;
    },
    generateRandomTree: (state, action: PayloadAction<RandomTreeParams>) => {
      const { count, minValue, maxValue } = action.payload;
      
      // Reset state first
      state.tree = null;
      state.operations = [];
      
      // Generate unique random numbers
      const randomNumbers = generateUniqueRandomNumbers(count, minValue, maxValue);
      
      // Create animation data for step by step tree building
      const { operations, steps } = createStepByStepTree(randomNumbers);
      
      // Store the operations and all tree steps
      state.operations = operations;
      state.buildSteps = steps;
      state.currentStep = 0;
      state.currentOperation = 0;
      state.isAnimating = true;
      state.error = null;
    },
    traverse: (state, action: PayloadAction<'INORDER' | 'PREORDER' | 'POSTORDER' | 'LEVELORDER'>) => {
      const bst = new BinarySearchTree();
      if (state.tree) {
        bst.setRoot(state.tree);
      }
      state.traversalType = action.payload;
      
      switch (action.payload) {
        case 'INORDER':
          state.operations = bst.inorder();
          break;
        case 'PREORDER':
          state.operations = bst.preorder();
          break;
        case 'POSTORDER':
          state.operations = bst.postorder();
          break;
        case 'LEVELORDER':
          state.operations = bst.levelOrder();
          break;
      }
      
      state.currentOperation = 0;
      // state.isPlaying = true;
      state.isAnimating = true;
      state.error = null;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    nextOperation: (state) => {
      if (state.currentOperation < state.operations.length - 1) {
        state.currentOperation += 1;
        
        // Show toast notification based on operation type
        const currentOp = state.operations[state.currentOperation];
        
        // Only show toasts for significant operations, not for every comparison
        if (currentOp && currentOp.type !== 'COMPARE') {
          // For traversal (VISIT operations), only show toast for the first node
          // to avoid too many toasts during traversal
          const isFirstVisit = currentOp.type === 'VISIT' && 
            !state.operations.slice(0, state.currentOperation)
              .some(op => op.type === 'VISIT');
          
          switch (currentOp.type) {
            case 'INSERT':
              if (currentOp.node) {
                showSuccessToast(`Node Inserted: ${currentOp.node.value}`, `Successfully added to the tree`);
              }
              break;
            case 'FOUND':
              if (currentOp.node) {
                showSuccessToast(`Node Found: ${currentOp.node.value}`, `Value exists in the tree`);
              }
              break;
            case 'NOT_FOUND':
              showErrorToast(`Not Found`, `Value does not exist in the tree`);
              break;
            case 'NODE_FOUND_FOR_DELETE':
              if (currentOp.node) {
                showErrorToast(`Deleting node ${currentOp.node.value}`, `Node found and marked for deletion`);
              }
              break;
            case 'DUPLICATE':
              if (currentOp.node) {
                showErrorToast(`Duplicate Value: ${currentOp.node.value}`, `Value already exists in tree`);
              }
              break;
            case 'VISIT':
              // Only show toast for first visit during traversal
              if (currentOp.node && isFirstVisit) {
                const traversalType = state.traversalType || 'Unknown';
                showSuccessToast(`${traversalType} Traversal`, `Starting traversal from node ${currentOp.node.value}`);
              }
              break;
          }
        }
        
        // If we're building the tree, check what step we should be at
        if (state.buildSteps && state.buildSteps.length > 0) {
          // For deletion operation, don't update the tree until animation completes
          if (state.operations[0]?.type === 'DELETE' || 
              state.operations.some(op => op.type === 'DELETE')) {
            // Only update tree at the end of the animation
            if (state.currentOperation >= state.operations.length - 1) {
              // Use the final state
              state.currentStep = state.buildSteps.length - 1;
              state.tree = state.buildSteps[state.currentStep];
            } else {
              // Keep initial state until the end
              state.currentStep = 0;
              state.tree = state.buildSteps[0];
            }
          } else {
            // For normal insertion, update step by step
            const insertOps = state.operations.slice(0, state.currentOperation + 1)
              .filter(op => op.type === 'INSERT');
            
            // Update current step based on insert operations seen so far
            const newStep = insertOps.length - 1;
            if (newStep >= 0 && newStep < state.buildSteps.length) {
              state.currentStep = newStep;
              state.tree = state.buildSteps[newStep];
            }
          }
        }
      } else {
        // Animation complete
        state.isAnimating = false;
        
        // If we were building a tree, set the final result
        if (state.buildSteps && state.buildSteps.length > 0) {
          state.tree = state.buildSteps[state.buildSteps.length - 1];
        }
        // Clear build steps to free memory
        state.buildSteps = undefined;
      }
    },
    stopAnimation: (state) => {
      state.isAnimating = false;
    },
    reset: (state) => {
      state.tree = null;
      state.operations = [];
      state.currentOperation = 0;
      // state.isPlaying = false;
      state.isAnimating = false;
      state.traversalType = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const {
  insert,
  search,
  delete: deleteNode,
  generateRandomTree,
  traverse,
  setSpeed,
  nextOperation,
  stopAnimation,
  reset,
  setError
} = bstSlice.actions;

export default bstSlice.reducer; 