import { initialLinkedListItems } from '@/configs/linkedList';
import { LinkedListNode, LinkedListAppState } from '@/types/linkedList';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialNodes: LinkedListNode[] = initialLinkedListItems.map((value) => ({
  value,
  id: uuid(),
  highlighted: false,
}));

const initialState: LinkedListAppState = {
  nodes: initialNodes,
  isAnimating: false,
  speed: 5,
  lastOperation: {
    type: null,
    result: undefined,
  },
  inputValue: '',
  positionValue: '',
};

export const linkedListSlice = createSlice({
  name: 'linkedList',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<LinkedListNode[]>) => {
      state.nodes = action.payload;
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
        type: 'insertHead' | 'insertTail' | 'insertAt' | 'deleteHead' | 'deleteTail' | 'deleteAt' | 'search' | 'update' | 'traverse' | 'reverse' | null;
        result?: unknown;
        position?: number;
      }>
    ) => {
      state.lastOperation = action.payload;
    },
    insertHeadNode: (state, action: PayloadAction<string | number>) => {
        state.nodes.unshift({
          value: action.payload,
          id: uuid(),
          highlighted: false,
        });
        state.lastOperation = {
          type: 'insertHead',
          result: action.payload,
        };
    },
    insertTailNode: (state, action: PayloadAction<string | number>) => {
        state.nodes.push({
          value: action.payload,
          id: uuid(),
          highlighted: false,
        });
        state.lastOperation = {
          type: 'insertTail',
          result: action.payload,
        };
    },
    insertAtNode: (state, action: PayloadAction<{ value: string | number, position: number }>) => {
        const { value, position } = action.payload;
        if (position < 0 || position > state.nodes.length) {
          state.lastOperation = {
            type: 'insertAt',
            result: 'Invalid position',
            position,
          };
          return;
        }
        
        state.nodes.splice(position, 0, {
          value,
          id: uuid(),
          highlighted: false,
        });
        state.lastOperation = {
          type: 'insertAt',
          result: value,
          position,
        };
    },
    deleteHeadNode: (state) => {
      if (state.nodes.length > 0) {
        const deleted = state.nodes.shift();
        state.lastOperation = {
          type: 'deleteHead',
          result: deleted?.value,
        };
      } else {
        state.lastOperation = {
          type: 'deleteHead',
          result: 'List is empty',
        };
      }
    },
    deleteTailNode: (state) => {
      if (state.nodes.length > 0) {
        const deleted = state.nodes.pop();
        state.lastOperation = {
          type: 'deleteTail',
          result: deleted?.value,
        };
      } else {
        state.lastOperation = {
          type: 'deleteTail',
          result: 'List is empty',
        };
      }
    },
    deleteAtNode: (state, action: PayloadAction<number>) => {
      if (state.nodes.length > 0) {
        const position = action.payload;
        if (position < 0 || position >= state.nodes.length) {
          state.lastOperation = {
            type: 'deleteAt',
            result: 'Invalid position',
            position,
          };
          return;
        }
        
        const deleted = state.nodes.splice(position, 1)[0];
        state.lastOperation = {
          type: 'deleteAt',
          result: deleted.value,
          position,
        };
      } else {
        state.lastOperation = {
          type: 'deleteAt',
          result: 'List is empty',
          position: action.payload,
        };
      }
    },
    searchNode: (state, action: PayloadAction<string | number>) => {
      const value = action.payload;
      const position = state.nodes.findIndex((node: LinkedListNode) => node.value === value);
      
        if (position !== -1) {
          state.nodes = state.nodes.map((node: LinkedListNode, i: number) => ({
            ...node,
            highlighted: i === position,
          }));
        }
        
        state.lastOperation = {
          type: 'search',
          result: position !== -1 ? position : 'Value not found',
        };
    },
    updateNode: (state, action: PayloadAction<{ position: number, value: string | number }>) => {
      if (state.nodes.length > 0) {
        const { position, value } = action.payload;
        if (position < 0 || position >= state.nodes.length) {
          state.lastOperation = {
            type: 'update',
            result: 'Invalid position',
            position,
          };
          return;
        }
        
        const oldValue = state.nodes[position].value;
        state.nodes[position].value = value;
        state.nodes[position].highlighted = true;
        
        state.lastOperation = {
          type: 'update',
          result: oldValue,
          position,
        };
      } else {
        state.lastOperation = {
          type: 'update',
          result: 'List is empty',
          position: action.payload.position,
        };
      }
    },
    
    reverseNodes: (state) => {
      if (state.nodes.length > 0) {
        state.nodes = [...state.nodes].reverse();
        state.lastOperation = {
          type: 'reverse',
          result: 'List reversed',
        };
      } else {
        state.lastOperation = {
          type: 'reverse',
          result: 'List is empty',
        };
      }
    },
    resetHighlight: (state) => {
      state.nodes = state.nodes.map((node: LinkedListNode) => ({
        ...node,
        highlighted: false
      }));
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setPositionValue: (state, action: PayloadAction<string>) => {
      state.positionValue = action.payload;
    },
    resetLinkedList: (state) => {
      state.nodes = [];
      state.lastOperation = {
        type: null,
        result: undefined,
      };
      state.inputValue = '';
      state.positionValue = '';
    },
  },
});

export const {
  setNodes,
  setIsAnimating,
  setSpeed,
  setLastOperation,
  insertHeadNode,
  insertTailNode,
  insertAtNode,
  deleteHeadNode,
  deleteTailNode,
  deleteAtNode,
  searchNode,
  updateNode,
  reverseNodes,
  resetHighlight,
  setInputValue,
  setPositionValue,
  resetLinkedList,
} = linkedListSlice.actions;

export default linkedListSlice.reducer; 
 