import { Routes, Route } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        {/* Home route */}
        <Route index element={<Home />} />
        
        {/* Sorting routes */}
        <Route path="/sorting" element={<AllSortingAlgPage />} />
        <Route path="/sorting/:algName" element={<SortingAlg />} />
        
        {/* Path Finding routes */}
        <Route path="/path-finding">
          <Route index element={<PathFindingPage />} />
          <Route path="a-star" element={<PathFindingAlgPage config={algConfigs[0]} />} />
          <Route path="bfs" element={<PathFindingAlgPage config={algConfigs[1]} />} />
          <Route path="dfs" element={<PathFindingAlgPage config={algConfigs[2]} />} />
          <Route path="greedy" element={<PathFindingAlgPage config={algConfigs[3]} />} />
        </Route>
        
        {/* Data Structures routes */}
        <Route path="/data-structures">
          <Route index element={<DataStructuresPage />} />
          <Route path="stack" element={<StackPage />} />
          <Route path="queue" element={<QueuePage />} />
          <Route path="linked-list" element={<LinkedListPage />} />
          <Route path="bst" element={<BSTPage />} />
          <Route path="avl-tree" element={<AVLTreePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
