import { createBrowserRouter } from 'react-router-dom';
import { algConfigs } from '@/configs/pathFinding';
import { PathFindingAlgPage, PathFindingPage } from './pages/pathFinding';

import {
  DataStructuresPage,
  StackPage,
  QueuePage,
  LinkedListPage,
  BSTPage,
  AVLTreePage,
} from '@/pages/datastructures';


import AllSortingAlgPage from './pages/sorting/AllSortingAlgPage';
import SortingAlg from './pages/sorting/SortingAlg';
// import SortingPage from './pages/sorting/SortingAlg';
// import PathFindingAlg from './pages/pathfinding';

import Home from '@/pages/Home';
import HomePage from './pages/HomePage';

const sortingRoutes = [
  {
    path: '/sorting',
    element: <AllSortingAlgPage />,
  },
  {
    path: '/sorting/:algName',
    element: <SortingAlg />,
  },
];

const pathFindingRoutes = [
  {
    path: '/path-finding',
    element:null,
    children: [
      {
        index: true,
        element: <PathFindingPage />,
      },
      {
        path: 'a-star',
        element: <PathFindingAlgPage config={algConfigs[0]} />,
      },
      {
        path: 'bfs',
        element: <PathFindingAlgPage config={algConfigs[1]} />,
      },
      {
        path: 'dfs',
        element: <PathFindingAlgPage config={algConfigs[2]} />,
      },
      {
        path: 'greedy',
        element: <PathFindingAlgPage config={algConfigs[3]} />,
      },
    ],
  }
];

const dataStructuresRoutes = [
  {
    path: '/data-structures',
    element: null,
    children: [
      {
        index: true,
        element: <DataStructuresPage />,
      },
      {
        path: 'stack',
        element: <StackPage />,
      },
      {
        path: 'queue',
        element: <QueuePage />,
      },
      {
        path: 'linked-list',
        element: <LinkedListPage />,
      },
      {
        path: 'bst',
        element: <BSTPage />,
      },
      {
        path: 'avl-tree',
        element: <AVLTreePage />,
      },
      
    ],
  }
];

export const router = createBrowserRouter([
  
  // ...sortingRoutes,
  // ...dataStructuresRoutes,
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...sortingRoutes,
      ...dataStructuresRoutes,
      ...pathFindingRoutes
    ]
  },
]);
