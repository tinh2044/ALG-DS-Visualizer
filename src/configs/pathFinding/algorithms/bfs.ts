export const bfsCode = `function bfs(grid: Grid, start: Cell, goal: Cell): Path {
  const queue: Cell[] = [start];
  const visited = new Set<Cell>([start]);
  const cameFrom = new Map<Cell, Cell>();
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }
    
    for (const neighbor of getNeighbors(current, grid)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        cameFrom.set(neighbor, current);
        queue.push(neighbor);
      }
    }
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