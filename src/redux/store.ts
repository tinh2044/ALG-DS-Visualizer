import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import pathFindingReducer from './pathFinding/pathFindingSlice';
import sortingVisualizerReducer from './sorting/visualizerSlice';
import stackReducer from './stackSlice';
import queueReducer from './queueSlice';
import linkedListReducer from './linkedListSlice';
import bstSliceReducer from "./bstSlice"
import avlTreeSliceReducer from "./avlTreeSlice"
import storage from 'redux-persist/lib/storage';

// Configuration to exclude specific paths from persistence for RBT
// This prevents circular reference errors with the tree structure
const rbtPersistConfig = {
  key: 'rbt',
  storage,
  blacklist: [
    'tree', 
    'operations', 
    'buildSteps',
    'operationSnapshots',
    'error'  // Also exclude error messages from persistence
  ],
  debug: false  // Disable debug logs for cleaner console
};

const avlPersistConfig = {
  key: 'avl',
  storage
};

const bstPersistConfig = {
  key: 'bst',
  storage
};

// Tạo các reducers với persistence
const persistedAVLReducer = persistReducer(avlPersistConfig, avlTreeSliceReducer);
const persistedBSTReducer = persistReducer(bstPersistConfig, bstSliceReducer);

export const store = configureStore({
  reducer: {
    sorting: persistReducer<ReturnType<typeof sortingVisualizerReducer>>(
      {
        key: 'sorting',
        storage,
      },
      sortingVisualizerReducer
    ),
    pathFinding: persistReducer<ReturnType<typeof pathFindingReducer>>(
      {
        key: 'pathFinding',
        storage,
      },
      pathFindingReducer
    ),
    stack: persistReducer<ReturnType<typeof stackReducer>>(
      {
        key: 'stack',
        storage,
      },
      stackReducer
    ),
    queue: persistReducer<ReturnType<typeof queueReducer>>(
      {
        key: 'queue',
        storage,
      },
      queueReducer
    ),
    linkedList: persistReducer<ReturnType<typeof linkedListReducer>>(
      {
        key: 'linkedList',
        storage,
      },
      linkedListReducer
    ),
    bst: persistedBSTReducer,
    avlTree: persistedAVLReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // Ignore actions that might contain non-serializable data
          'rbt/insert',
          'rbt/search',
          'rbt/delete',
          'rbt/reset',
          'rbt/generateRandomTree',
          'rbt/traverse',
          'rbt/nextOperation',
          // Bỏ qua các actions từ redux-persist
          FLUSH, 
          REHYDRATE, 
          PAUSE, 
          PERSIST, 
          PURGE, 
          REGISTER
        ],
        // Ignore circular references in these paths
        ignoredPaths: [
          'rbt.tree', 
          'rbt.operations', 
          'rbt.buildSteps', 
          'rbt.operationSnapshots',
          // Bỏ qua các paths có thể chứa tham chiếu vòng
          'rbt.operations.path',
          'rbt.operations.node',
          'rbt.operations.pivotNode',
          'rbt.operations.oldParent'
        ],
        // Increase warnAfter threshold to reduce noise in dev console
        warnAfter: 128
      },
      immutableCheck: {
        // Ignore paths that trigger false warnings
        ignoredPaths: ['rbt.tree', 'rbt.operations', 'rbt.buildSteps']
      }
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
