export const aStarCode = `function aStar(grid: Grid, start: Cell, goal: Cell): Path {
  const openSet = new Set<Cell>([start]);
  const closedSet = new Set<Cell>();
  const cameFrom = new Map<Cell, Cell>();
  
  const gScore = new Map<Cell, number>();
  const fScore = new Map<Cell, number>();
  
  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));
  
  while (openSet.size > 0) {
    let current = getLowestFScore(openSet, fScore);
    
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }
    
    openSet.delete(current);
    closedSet.add(current);
    
    for (const neighbor of getNeighbors(current, grid)) {
      if (closedSet.has(neighbor)) {
        continue;
      }
      
      const tentativeGScore = gScore.get(current)! + 1;
      
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      } else if (tentativeGScore >= (gScore.get(neighbor) ?? Infinity)) {
        continue;
      }
      
      cameFrom.set(neighbor, current);
      gScore.set(neighbor, tentativeGScore);
      fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
    }
  }
  
  return []; // No path found
}

function heuristic(a: Cell, b: Cell): number {
  // Manhattan distance
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function getLowestFScore(openSet: Set<Cell>, fScore: Map<Cell, number>): Cell {
  let lowest = Infinity;
  let lowestCell: Cell | null = null;
  
  for (const cell of openSet) {
    const score = fScore.get(cell) ?? Infinity;
    if (score < lowest) {
      lowest = score;
      lowestCell = cell;
    }
  }
  
  return lowestCell!;
}

function getNeighbors(cell: Cell, grid: Grid): Cell[] {
  const neighbors: Cell[] = [];
  const { row, col } = cell;
  
  // Check all four directions
  if (row > 0 && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1 && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0 && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }
  
  return neighbors;
}

function reconstructPath(cameFrom: Map<Cell, Cell>, current: Cell): Path {
  const path: Path = [current];
  
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  
  return path;
}`; 