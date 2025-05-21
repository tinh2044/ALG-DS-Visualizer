import { AlgConfig } from "@/types/pathFinding";
import { aStarCode, bfsCode, dfsCode, greedyCode } from "./algorithms";

// Cell size is now configured in tailwind.config.js as 'pf-cell-size': '25px'
export const cellSize = 25; // Kept for reference in code

export const speeds = [
  {
    label: '∞',
    key: "Infinity",
  },
  {
    label: '4x',
    key: 4,
  },
  {
    label: '2x',
    key: 2,
  },
  {
    label: '1x',
    key: 1,
  },
  {
    label: '0.7x',
    key: 0.7,
  },
  {
    label: '0.5x',
    key: 0.5,
  },  
];


export const defaultSpeeds = {
  mobile: 1,
  desktop: 4,
};

export const cellColors = {
  clear: 'transparent',          
  entry: 'default',          
  exit: 'success',             
  wall: 'danger',               
  visitedStart: 'blue',          
  visitedMid: 'deepskyblue',     
  visited: 'secondary',  
  path: 'warning',                
};

export const algConfigs: AlgConfig[] = [
  {
    title: 'A* (A-Star)',
    path: '/path-finding/a-star',
    description: 'A* is one of the most efficient pathfinding algorithms that combines Dijkstra\'s algorithm and greedy best-first search. It uses a heuristic to estimate the cost to reach the goal.',
    algorithm: 'aStar',
    buttonText: 'Run A* Algorithm',
    code: aStarCode,
    howItWorks: {
      description: 'A* is one of the most popular and efficient pathfinding algorithms, combining the strengths of Dijkstra\'s Algorithm and Greedy Best-First Search. A* works by maintaining three values for each node: g-score (cost from start), h-score (estimated cost to goal), and f-score (sum of g and h).',
      pseudocode: `function A_Star(start, goal):
    openSet = {start}
    cameFrom = {}
    
    gScore = {start: 0}
    fScore = {start: heuristic(start, goal)}
    
    while openSet is not empty:
        current = node in openSet with lowest fScore
        
        if current = goal:
            return reconstruct_path(cameFrom, current)
            
        remove current from openSet
        
        for each neighbor of current:
            tentative_gScore = gScore[current] + distance(current, neighbor)
            
            if tentative_gScore < gScore[neighbor]:
                cameFrom[neighbor] = current
                gScore[neighbor] = tentative_gScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                
                if neighbor not in openSet:
                    add neighbor to openSet
                    
    return failure (no path exists)`,
      keyProperties: [
        {
          title: 'Completeness',
          description: 'A* is complete, meaning it will always find a path if one exists.'
        },
        {
          title: 'Optimality',
          description: 'If the heuristic is admissible (never overestimates the cost), A* guarantees finding the shortest path.'
        },
        {
          title: 'Time Complexity',
          description: 'O(b^d) in worst case, where b is the branching factor and d is the depth of the solution.'
        },
        {
          title: 'Space Complexity',
          description: 'O(b^d) as it stores all generated nodes in memory.'
        },
        {
          title: 'Heuristic Function',
          description: 'The quality of the heuristic greatly affects performance. Common choices include Manhattan distance, Euclidean distance, and Diagonal distance.'
        }
      ]
    },
    visualization: {
      description: 'The visualization shows A* finding the optimal path (blue) from start to goal while exploring fewer nodes (light purple) compared to other algorithms. Walls (dark red) represent obstacles.',
      grid: [
        { row: 1, col: 1, type: 'entry' },
        { row: 8, col: 8, type: 'exit' },
        { row: 1, col: 2, type: 'path' },
        { row: 2, col: 2, type: 'path' },
        { row: 2, col: 3, type: 'path' },
        { row: 3, col: 3, type: 'path' },
        { row: 3, col: 4, type: 'path' },
        { row: 4, col: 4, type: 'path' },
        { row: 4, col: 5, type: 'path' },
        { row: 5, col: 5, type: 'path' },
        { row: 5, col: 6, type: 'path' },
        { row: 6, col: 6, type: 'path' },
        { row: 6, col: 7, type: 'path' },
        { row: 7, col: 7, type: 'path' },
        { row: 7, col: 8, type: 'path' },
        { row: 8, col: 8, type: 'path' },
        { row: 1, col: 3, type: 'visited' },
        { row: 2, col: 1, type: 'visited' },
        { row: 2, col: 4, type: 'visited' },
        { row: 3, col: 2, type: 'visited' },
        { row: 3, col: 5, type: 'visited' },
        { row: 4, col: 3, type: 'visited' },
        { row: 4, col: 6, type: 'visited' },
        { row: 5, col: 4, type: 'visited' },
        { row: 5, col: 7, type: 'visited' },
        { row: 6, col: 5, type: 'visited' },
        { row: 6, col: 8, type: 'visited' },
        { row: 3, col: 1, type: 'wall' },
        { row: 4, col: 1, type: 'wall' },
        { row: 5, col: 1, type: 'wall' },
        { row: 6, col: 1, type: 'wall' },
        { row: 7, col: 1, type: 'wall' },
        { row: 3, col: 6, type: 'wall' },
        { row: 3, col: 7, type: 'wall' },
        { row: 3, col: 8, type: 'wall' },
        { row: 6, col: 3, type: 'wall' },
        { row: 6, col: 4, type: 'wall' },
        { row: 7, col: 6, type: 'wall' }
      ]
    },
    advantages: [
      'Finds the shortest path when using an admissible heuristic',
      'More efficient than Dijkstra\'s algorithm in most cases',
      'Explores fewer nodes than BFS while still guaranteeing optimality',
      'Widely used in games, robotics, and navigation systems'
    ],
    limitations: [
      'Memory intensive for large grids as it stores all explored nodes',
      'Performance depends heavily on the quality of the heuristic',
      'May be overkill for simpler pathfinding problems'
    ],
    previewGrid: [
      { row: 0, col: 0, type: 'entry' },
      { row: 4, col: 4, type: 'exit' },
      { row: 1, col: 0, type: 'path' },
      { row: 1, col: 1, type: 'path' },
      { row: 1, col: 2, type: 'path' },
      { row: 2, col: 2, type: 'path' },
      { row: 3, col: 2, type: 'path' },
      { row: 3, col: 3, type: 'path' },
      { row: 4, col: 3, type: 'path' },
      { row: 0, col: 1, type: 'visited' },
      { row: 0, col: 2, type: 'visited' },
      { row: 2, col: 0, type: 'visited' },
      { row: 2, col: 1, type: 'visited' },
      { row: 3, col: 1, type: 'visited' },
      { row: 1, col: 3, type: 'wall' },
      { row: 2, col: 3, type: 'wall' },
      { row: 3, col: 0, type: 'wall' }
    ]
  },
  {
    title: 'Breadth-First Search',
    path: '/path-finding/bfs',
    description: 'Breadth-First Search explores all neighboring nodes at the present depth before moving to nodes at the next depth level. It guarantees the shortest path in unweighted graphs.',
    algorithm: 'bfs',
    buttonText: 'Run BFS Algorithm',
    code: bfsCode,
    howItWorks: {
      description: 'Breadth-First Search (BFS) is a graph traversal algorithm that explores all the vertices at the present depth before moving on to vertices at the next depth level. It operates in layers, exploring all neighboring nodes before moving to the next level of neighbors.',
      pseudocode: `function BFS(grid, start, goal):
    queue = [start]
    visited = set containing start
    parent = map with start->null
    
    while queue is not empty:
        current = queue.dequeue()
        
        if current = goal:
            return reconstruct_path(parent, goal)
            
        for each neighbor of current:
            if neighbor not in visited and not a wall:
                queue.enqueue(neighbor)
                visited.add(neighbor)
                parent[neighbor] = current
                
    return failure (no path exists)`,
      keyProperties: [
        {
          title: 'Completeness',
          description: 'BFS is complete, meaning it will always find a path if one exists.'
        },
        {
          title: 'Optimality',
          description: 'BFS guarantees finding the shortest path in unweighted graphs.'
        },
        {
          title: 'Time Complexity',
          description: 'O(V + E) where V is the number of vertices and E is the number of edges.'
        },
        {
          title: 'Space Complexity',
          description: 'O(V) as it needs to store all vertices in the worst case.'
        },
        {
          title: 'Data Structure',
          description: 'Uses a queue (FIFO - First In, First Out) for frontier management.'
        }
      ]
    },
    visualization: {
      description: 'The visualization shows BFS exploring in waves (light purple), expanding outward from the start node. BFS guarantees finding the shortest path (blue) in unweighted graphs like grids.',
      grid: [
        { row: 1, col: 1, type: 'entry' },
        { row: 8, col: 8, type: 'exit' },
        { row: 1, col: 2, type: 'path' },
        { row: 2, col: 2, type: 'path' },
        { row: 3, col: 2, type: 'path' },
        { row: 4, col: 2, type: 'path' },
        { row: 5, col: 2, type: 'path' },
        { row: 5, col: 3, type: 'path' },
        { row: 5, col: 4, type: 'path' },
        { row: 5, col: 5, type: 'path' },
        { row: 5, col: 6, type: 'path' },
        { row: 5, col: 7, type: 'path' },
        { row: 6, col: 7, type: 'path' },
        { row: 7, col: 7, type: 'path' },
        { row: 8, col: 7, type: 'path' },
        { row: 8, col: 8, type: 'path' },
        { row: 1, col: 3, type: 'visited' },
        { row: 2, col: 1, type: 'visited' },
        { row: 2, col: 3, type: 'visited' },
        { row: 3, col: 1, type: 'visited' },
        { row: 3, col: 3, type: 'visited' },
        { row: 4, col: 1, type: 'visited' },
        { row: 4, col: 3, type: 'visited' },
        { row: 6, col: 2, type: 'visited' },
        { row: 6, col: 3, type: 'visited' },
        { row: 6, col: 4, type: 'visited' },
        { row: 6, col: 5, type: 'visited' },
        { row: 6, col: 6, type: 'visited' },
        { row: 7, col: 2, type: 'visited' },
        { row: 7, col: 6, type: 'visited' },
        { row: 8, col: 2, type: 'visited' },
        { row: 8, col: 6, type: 'visited' },
        { row: 3, col: 4, type: 'wall' },
        { row: 3, col: 5, type: 'wall' },
        { row: 3, col: 6, type: 'wall' },
        { row: 3, col: 7, type: 'wall' },
        { row: 3, col: 8, type: 'wall' },
        { row: 4, col: 4, type: 'wall' },
        { row: 2, col: 4, type: 'wall' },
        { row: 2, col: 5, type: 'wall' },
        { row: 2, col: 6, type: 'wall' },
        { row: 4, col: 8, type: 'wall' },
        { row: 5, col: 8, type: 'wall' },
        { row: 6, col: 8, type: 'wall' },
        { row: 7, col: 3, type: 'wall' },
        { row: 7, col: 4, type: 'wall' },
        { row: 7, col: 5, type: 'wall' }
      ]
    },
    advantages: [
      'Guarantees the shortest path in unweighted graphs',
      'Simple to implement with a queue data structure',
      'Explores nodes level by level, which is intuitive for many applications',
      'Complete: always finds a solution if one exists',
      'Well-suited for finding paths in mazes or grid-based environments'
    ],
    limitations: [
      'High memory usage as it needs to store all nodes at each level',
      'Not suitable for weighted graphs when looking for shortest paths',
      'Can be inefficient in very large or infinite spaces',
      'No use of heuristics, so it explores in all directions equally'
    ],
    previewGrid: [
      { row: 0, col: 0, type: 'entry' },
      { row: 2, col: 3, type: 'exit' },
      { row: 0, col: 1, type: 'path' },
      { row: 0, col: 2, type: 'path' },
      { row: 1, col: 2, type: 'path' },
      { row: 1, col: 3, type: 'path' },
      { row: 2, col: 3, type: 'path' },
      { row: 1, col: 0, type: 'visited' },
      { row: 1, col: 1, type: 'visited' },
      { row: 0, col: 3, type: 'wall' },
      { row: 2, col: 1, type: 'wall' },
      { row: 3, col: 2, type: 'wall' }
    ]
  },
  {
    title: 'Depth-First Search',
    path: '/path-finding/dfs',
    description: 'Depth-First Search explores as far as possible along each branch before backtracking. It may not find the shortest path but is memory efficient for deep graphs.',
    algorithm: 'dfs',
    buttonText: 'Run DFS Algorithm',
    code: dfsCode,
    howItWorks: {
      description: 'Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. Unlike BFS which expands in waves, DFS dives deep into one path before trying alternatives.',
      pseudocode: `function DFS(grid, start, goal):
    visited = set containing start
    parent = map with start->null
    
    function explorePath(node):
        if node = goal:
            return true
            
        for each neighbor of node:
            if neighbor not in visited and not a wall:
                visited.add(neighbor)
                parent[neighbor] = node
                
                if explorePath(neighbor):
                    return true
                    
        return false
        
    if explorePath(start):
        return reconstruct_path(parent, goal)
    else:
        return failure (no path exists)`,
      keyProperties: [
        {
          title: 'Completeness',
          description: 'DFS is complete, meaning it will always find a path if one exists (when searching a finite graph).'
        },
        {
          title: 'Non-Optimality',
          description: 'DFS does not guarantee finding the shortest path.'
        },
        {
          title: 'Time Complexity',
          description: 'O(V + E) where V is the number of vertices and E is the number of edges.'
        },
        {
          title: 'Space Complexity',
          description: 'O(h) where h is the maximum depth of the search tree. Much more space-efficient than BFS for deep graphs.'
        },
        {
          title: 'Data Structure',
          description: 'Uses a stack (LIFO - Last In, First Out) or recursion for frontier management.'
        }
      ]
    },
    visualization: {
      description: 'The visualization shows DFS finding a path (blue) from start to goal by exploring deeply along each branch before backtracking. Notice how the path found is much longer than the optimal solution due to DFS\'s nature.',
      grid: [
        { row: 1, col: 1, type: 'entry' },
        { row: 8, col: 8, type: 'exit' },
        { row: 2, col: 1, type: 'path' },
        { row: 3, col: 1, type: 'path' },
        { row: 4, col: 1, type: 'path' },
        { row: 5, col: 1, type: 'path' },
        { row: 6, col: 1, type: 'path' },
        { row: 7, col: 1, type: 'path' },
        { row: 8, col: 1, type: 'path' },
        { row: 8, col: 2, type: 'path' },
        { row: 8, col: 3, type: 'path' },
        { row: 8, col: 4, type: 'path' },
        { row: 8, col: 5, type: 'path' },
        { row: 8, col: 6, type: 'path' },
        { row: 8, col: 7, type: 'path' },
        { row: 8, col: 8, type: 'path' },
        { row: 1, col: 2, type: 'visited' },
        { row: 1, col: 3, type: 'visited' },
        { row: 1, col: 4, type: 'visited' },
        { row: 2, col: 4, type: 'visited' },
        { row: 3, col: 4, type: 'visited' },
        { row: 4, col: 4, type: 'visited' },
        { row: 5, col: 4, type: 'visited' },
        { row: 5, col: 5, type: 'visited' },
        { row: 2, col: 2, type: 'wall' },
        { row: 3, col: 2, type: 'wall' },
        { row: 4, col: 2, type: 'wall' },
        { row: 5, col: 2, type: 'wall' },
        { row: 6, col: 2, type: 'wall' },
        { row: 7, col: 2, type: 'wall' },
        { row: 7, col: 3, type: 'wall' },
        { row: 7, col: 4, type: 'wall' },
        { row: 7, col: 5, type: 'wall' },
        { row: 7, col: 6, type: 'wall' },
        { row: 7, col: 7, type: 'wall' },
        { row: 3, col: 5, type: 'wall' },
        { row: 3, col: 6, type: 'wall' },
        { row: 3, col: 7, type: 'wall' }
      ]
    },
    advantages: [
      'Memory efficient compared to BFS for deep graphs',
      'Simple to implement, especially with recursion',
      'Good for maze exploration and deep tree traversal',
      'Efficient for checking if a path exists (without needing to find the shortest one)'
    ],
    limitations: [
      'Does not guarantee finding the shortest path',
      'Can lead to very inefficient paths in maze-like environments',
      'May get stuck exploring deep branches while the goal is nearby',
      'Can lead to stack overflow for very deep graphs when implemented recursively',
      'Not well-suited for weighted graphs or when optimality is required'
    ],
    previewGrid: [
      { row: 0, col: 0, type: 'entry' },
      { row: 4, col: 3, type: 'exit' },
      { row: 1, col: 0, type: 'path' },
      { row: 2, col: 0, type: 'path' },
      { row: 3, col: 0, type: 'path' },
      { row: 4, col: 0, type: 'path' },
      { row: 4, col: 1, type: 'path' },
      { row: 4, col: 2, type: 'path' },
      { row: 4, col: 3, type: 'path' },
      { row: 0, col: 1, type: 'visited' },
      { row: 0, col: 2, type: 'visited' },
      { row: 1, col: 2, type: 'visited' },
      { row: 2, col: 2, type: 'visited' },
      { row: 3, col: 2, type: 'visited' },
      { row: 1, col: 1, type: 'wall' },
      { row: 2, col: 1, type: 'wall' },
      { row: 3, col: 1, type: 'wall' }
    ]
  },
  {
    title: 'Greedy Best-First',
    path: '/path-finding/greedy',
    description: 'Greedy Best-First Search always explores the node that appears closest to the goal. It\'s faster than A* but doesn\'t guarantee the shortest path.',
    algorithm: 'greedy',
    buttonText: 'Run Greedy Algorithm',
    code: greedyCode,
    howItWorks: {
      description: 'Greedy Best-First Search is an informed search algorithm that uses a heuristic to estimate the distance from any node to the goal. Unlike A* which considers both the cost so far and the estimated remaining cost, Greedy only considers how close it thinks it is to the goal.',
      pseudocode: `function GreedyBestFirstSearch(grid, start, goal):
    openSet = {start}
    closedSet = {}
    cameFrom = {}
    
    hScore = map with start->heuristic(start, goal)
    
    while openSet is not empty:
        current = node in openSet with lowest hScore
        
        if current = goal:
            return reconstruct_path(cameFrom, current)
            
        remove current from openSet
        add current to closedSet
        
        for each neighbor of current:
            if neighbor in closedSet:
                continue
                
            if neighbor not in openSet or neighbor is better:
                cameFrom[neighbor] = current
                hScore[neighbor] = heuristic(neighbor, goal)
                
                if neighbor not in openSet:
                    add neighbor to openSet
                    
    return failure (no path exists)`,
      keyProperties: [
        {
          title: 'Completeness',
          description: 'Greedy is complete in finite spaces, meaning it will always find a path if one exists.'
        },
        {
          title: 'Non-Optimality',
          description: 'Does not guarantee finding the shortest path.'
        },
        {
          title: 'Time Complexity',
          description: 'O(b^m) in worst case, where b is the branching factor and m is the maximum depth of the search space.'
        },
        {
          title: 'Space Complexity',
          description: 'O(b^m) as it stores all generated nodes.'
        },
        {
          title: 'Heuristic Function',
          description: 'Commonly uses Manhattan distance, Euclidean distance, or Diagonal distance.'
        }
      ]
    },
    visualization: {
      description: 'The visualization shows Greedy Best-First Search finding a path (blue) from start to goal by always moving in the direction that seems closest to the goal. Notice how it explores fewer nodes (light purple) than A* or BFS, but may not find the shortest path.',
      grid: [
        { row: 1, col: 1, type: 'entry' },
        { row: 8, col: 8, type: 'exit' },
        { row: 1, col: 2, type: 'path' },
        { row: 1, col: 3, type: 'path' },
        { row: 2, col: 3, type: 'path' },
        { row: 2, col: 4, type: 'path' },
        { row: 3, col: 4, type: 'path' },
        { row: 3, col: 5, type: 'path' },
        { row: 4, col: 5, type: 'path' },
        { row: 4, col: 6, type: 'path' },
        { row: 5, col: 6, type: 'path' },
        { row: 5, col: 7, type: 'path' },
        { row: 6, col: 7, type: 'path' },
        { row: 6, col: 8, type: 'path' },
        { row: 7, col: 8, type: 'path' },
        { row: 8, col: 8, type: 'path' },
        { row: 2, col: 1, type: 'visited' },
        { row: 2, col: 2, type: 'visited' },
        { row: 3, col: 3, type: 'visited' },
        { row: 4, col: 4, type: 'visited' },
        { row: 5, col: 5, type: 'visited' },
        { row: 7, col: 7, type: 'visited' },
        { row: 1, col: 4, type: 'wall' },
        { row: 1, col: 5, type: 'wall' },
        { row: 1, col: 6, type: 'wall' },
        { row: 1, col: 7, type: 'wall' },
        { row: 2, col: 7, type: 'wall' },
        { row: 3, col: 7, type: 'wall' },
        { row: 4, col: 2, type: 'wall' },
        { row: 5, col: 2, type: 'wall' },
        { row: 6, col: 2, type: 'wall' },
        { row: 7, col: 2, type: 'wall' },
        { row: 6, col: 4, type: 'wall' },
        { row: 6, col: 5, type: 'wall' },
        { row: 6, col: 6, type: 'wall' }
      ]
    },
    advantages: [
      'Faster than A* in many cases as it explores fewer nodes',
      'Often finds acceptable paths quickly',
      'Simple to implement and understand',
      'Lower memory usage than BFS in many scenarios',
      'Good for games where speed is more important than optimality'
    ],
    limitations: [
      'Does not guarantee finding the shortest path',
      'Can be easily misled by the heuristic',
      'May perform poorly with obstacles between start and goal',
      'Performance heavily depends on the quality of the heuristic',
      'Not suitable for applications where optimality is critical'
    ],
    previewGrid: [
      { row: 0, col: 0, type: 'entry' },
      { row: 4, col: 4, type: 'exit' },
      { row: 0, col: 1, type: 'path' },
      { row: 1, col: 1, type: 'path' },
      { row: 1, col: 2, type: 'path' },
      { row: 2, col: 2, type: 'path' },
      { row: 2, col: 3, type: 'path' },
      { row: 3, col: 3, type: 'path' },
      { row: 3, col: 4, type: 'path' },
      { row: 1, col: 0, type: 'visited' },
      { row: 2, col: 1, type: 'visited' },
      { row: 0, col: 2, type: 'wall' },
      { row: 1, col: 3, type: 'wall' },
      { row: 3, col: 2, type: 'wall' }
    ]
  }
]; 
