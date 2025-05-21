import {
  generateBinaryMaze,
  generateKruskalMaze,
  generatePrimsMaze,
  generateRecursiveBacktrackingMaze,
  generateRecursiveDivisionMaze,
  generateRandomMaze,
  generateSideWinderMaze,
  generateWilsonMaze,
  generateEllersMaze,
  generateLabyrinth,
} from './mazeGenerator';
import { breadthFirstSearch, aStar, depthFirstSearch, greedy } from './pathFinding';
import {
  Stack,
  stackOperations,
  Queue,
  queueOperations,
  LinkedList,
  linkedListOperations,
} from './ds';

export const pathFindings = {
  bfs: { name: 'Breadth First Search', fn: breadthFirstSearch },
  dfs: { name: 'Depth First Search', fn: depthFirstSearch },
  aStar: { name: 'A* Search', fn: aStar },
  greedy: { name: 'Greedy Best First', fn: greedy },
};

export const mazeGenerators = [
  { key: 'Prims', fn: generatePrimsMaze },
  { key: 'Kruskal', fn: generateKruskalMaze },
  { key: 'Recursive Backtracking', fn: generateRecursiveBacktrackingMaze },
  { key: 'Recursive Division', fn: generateRecursiveDivisionMaze },
  { key: 'Wilson', fn: generateWilsonMaze },
  { key: 'Ellers', fn: generateEllersMaze },
  { key: 'Side Winder', fn: generateSideWinderMaze },
  { key: 'Binary Tree', fn: generateBinaryMaze },
  { key: 'Labyrinth', fn: generateLabyrinth },
  { key: 'Random', fn: generateRandomMaze },
];

export {
  Stack,
  stackOperations,
  Queue,
  queueOperations,
  LinkedList,
  linkedListOperations,
};
