import { barCSS, cellCSS } from './sorting';
import { cellColors as pathFindingColors } from './pathFinding';
import { algList as sortingAlgList } from '@/algorithms/sorting/algList';
import { stackCellCSS } from './stack';

export const sortingMenuItems = sortingAlgList.map((item) => {
  return {
    name: item.name,
    path: `/sorting/${item.name}`,
  };
});
export const dsMenuItems = [
  {
    name: 'Stack',
    path: '/data-structures/stack',
  },
  {
    name: 'Queue',
    path: '/data-structures/queue',
  },
  {
    name: 'Linked List',
    path: '/data-structures/linked-list',
  },
  {
    name: 'Heap',
    path: '/data-structures/heap',
  },
  { name: 'Binary Search Tree', path: '/data-structures/bst' },
  { name: ' AVL Tree', path: '/data-structures/avl-tree' },
  { name: ' RB Tree', path: '/data-structures/rb-tree' },
];

export const pathFindingMenuItems = [
  {
    name: 'A*',
    path: '/path-finding/a-star',
  },
  {
    name: 'BFS',
    path: '/path-finding/bfs',
  },
  {
    name: 'DFS',
    path: '/path-finding/dfs',
  },
  {
    name: 'Greedy',
    path: '/path-finding/greedy',
  },
];

export const mainMenuItems = [
  {
    name: 'Sorting',
    path: '/sorting',
    children: sortingMenuItems,
  },
  {
    name: 'Data Structures',
    path: '/data-structures',
    children: dsMenuItems,
  },
  {
    name: 'Path Finding',
    path: '/path-finding',
    children: pathFindingMenuItems,
  },
];

export const colors = {
  pathFinding: pathFindingColors,
};

export const CSS = {
  sorting: {
    bar: barCSS,
    cell: cellCSS,
  },
  stack: {
    cell: stackCellCSS,
  },
};
