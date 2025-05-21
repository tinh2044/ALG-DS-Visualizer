export const dfsCode = `function dfs(grid: Grid, start: Cell, goal: Cell): Path {
  const visited = new Set<Cell>();
  const cameFrom = new Map<Cell, Cell>();
  
  function explorePath(current: Cell): boolean {
    if (current === goal) {
      return true;
    }
    
    visited.add(current);
    
    for (const neighbor of getNeighbors(current, grid)) {
      if (!visited.has(neighbor)) {
        cameFrom.set(neighbor, current);
        if (explorePath(neighbor)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  if (explorePath(start)) {
    return reconstructPath(cameFrom, goal);
  }
  
  return []; // No path found
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