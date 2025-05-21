import { initialQueueItems } from '@/configs/queue';
import { QueueItem, QueueAppState } from '@/types/queue';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialItems: QueueItem[] = initialQueueItems.map((value) => ({
  value,
  id: uuid(),
  highlighted: false,
}));

const initialState: QueueAppState = {
  items: initialItems,
  isAnimating: false,
  speed: 5,
  lastOperation: {
    type: null,
    result: undefined,
  },
  inputValue: '',
};

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<QueueItem[]>) => {
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
        type: 'enqueue' | 'dequeue' | 'peek' | 'isEmpty' | 'size' | null;
        result?: unknown;
      }>
    ) => {
      state.lastOperation = action.payload;
    },
    enqueueItem: (state, action: PayloadAction<string | number>) => {
      if (!state.isAnimating) {
        state.items.push({
          value: action.payload,
          id: uuid(),
          highlighted: false,
        });
        state.lastOperation = {
          type: 'enqueue',
          result: action.payload,
        };
      }
    },
    dequeueItem: (state) => {
      if (!state.isAnimating && state.items.length > 0) {
        const dequeued = state.items.shift();
        state.lastOperation = {
          type: 'dequeue',
          result: dequeued?.value,
        };
      } else if (!state.isAnimating) {
        state.lastOperation = {
          type: 'dequeue',
          result: 'Queue is empty',
        };
      }
    },
    peekItem: (state) => {
      if (!state.isAnimating && state.items.length > 0) {
        state.lastOperation = {
          type: 'peek',
          result: state.items[0].value,
        };
        
        state.items[0].highlighted = true;
      } else if (!state.isAnimating) {
        state.lastOperation = {
          type: 'peek',
          result: 'Queue is empty',
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
    resetQueue: (state) => {
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
  enqueueItem,
  dequeueItem,
  peekItem,
  checkIsEmpty,
  getSize,
  resetHighlight,
  setInputValue,
  resetQueue,
} = queueSlice.actions;

export default queueSlice.reducer; 