import { initialStackItems } from '@/configs/stack';
import { StackItem, StackAppState } from '@/types/stack';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialItems: StackItem[] = initialStackItems.map((value) => ({
  value,
  id: uuid(),
  highlighted: false,
}));

const initialState: StackAppState = {
  items: initialItems,
  isAnimating: false,
  speed: 5,
  lastOperation: {
    type: null,
    result: undefined,
  },
  inputValue: '',
};

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<StackItem[]>) => {
      state.items = action.payload;
    },
    setIsAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setLastOperation: (
      state,
      action: PayloadAction<{
        type: 'push' | 'pop' | 'peek' | 'isEmpty' | 'size' | null;
        result?: unknown;
      }>
    ) => {
      state.lastOperation = action.payload;
    },
    pushItem: (state, action: PayloadAction<string | number>) => {
      if (!state.isAnimating) {
        state.items.push({
          value: action.payload,
          id: uuid(),
          highlighted: false,
        });
        state.lastOperation = {
          type: 'push',
          result: action.payload,
        };
      }
    },
    popItem: (state) => {
      if (!state.isAnimating && state.items.length > 0) {
        const popped = state.items.pop();
        state.lastOperation = {
          type: 'pop',
          result: popped?.value,
        };
      } else if (!state.isAnimating) {
        state.lastOperation = {
          type: 'pop',
          result: 'Stack is empty',
        };
      }
    },
    peekItem: (state) => {
      if (!state.isAnimating && state.items.length > 0) {
        state.lastOperation = {
          type: 'peek',
          result: state.items[state.items.length - 1].value,
        };
       
        state.items[state.items.length - 1].highlighted = true;
      } else if (!state.isAnimating) {
        state.lastOperation = {
          type: 'peek',
          result: 'Stack is empty',
        };
      }
    },
    checkIsEmpty: (state) => {
      state.lastOperation = {
        type: 'isEmpty',
        result: state.items.length === 0,
      };
    },
    getSize: (state) => {
      state.lastOperation = {
        type: 'size',
        result: state.items.length,
      };
    },
    resetHighlight: (state) => {
      state.items = state.items.map(item => ({
        ...item,
        highlighted: false
      }));
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    resetStack: (state) => {
      state.items = [];
      state.lastOperation = {
        type: null,
        result: undefined,
      };
      state.inputValue = '';
    },
  },
});

export const {
  setItems,
  setIsAnimating,
  setSpeed,
  setLastOperation,
  pushItem,
  popItem,
  peekItem,
  checkIsEmpty,
  getSize,
  resetHighlight,
  setInputValue,
  resetStack,
} = stackSlice.actions;

export default stackSlice.reducer; 