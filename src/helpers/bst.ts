import { BSTNode, BSTOperation, BSTOperationType } from '@/types/bst';
import { BST_CONFIG } from '@/configs/bst';
import { BinarySearchTree } from '@/algorithms/ds/bst';

interface D3TreeNode {
  name: string;
  children: D3TreeNode[];
}

// Convert BST to D3 tree data structure
export const convertToD3Tree = (node: BSTNode | null): D3TreeNode | null => {
  if (!node) return null;

  return {
    name: node.value.toString(),
    children: [
      node.left ? convertToD3Tree(node.left) : null,
      node.right ? convertToD3Tree(node.right) : null
    ].filter((child): child is D3TreeNode => child !== null)
  };
};

// Get node color based on operation type
export const getNodeColor = (operationType: BSTOperationType): string => {
  return BST_CONFIG.operationColors[operationType];
};

// Get edge color based on operation type
export const getEdgeColor = (operationType: BSTOperationType): string => {
  return BST_CONFIG.edge.colors[operationType === 'COMPARE' ? 'highlight' : 'default'];
};

// Calculate node position based on screen size
export const calculateNodePosition = (width: number, height: number) => {
  const { breakpoints, nodeSize } = BST_CONFIG.responsive;
  
  let size = nodeSize.lg;
  if (width < breakpoints.sm) size = nodeSize.sm;
  else if (width < breakpoints.md) size = nodeSize.md;
  else if (width < breakpoints.lg) size = nodeSize.lg;
  else size = nodeSize.xl;

  return {
    x: width / 2,
    y: height / 8,
    nodeSize: size
  };
};

// Generate random BST
export const generateRandomBST = (count: number): BSTNode | null => {
  if (count <= 0) return null;

  const values = new Set<number>();
  while (values.size < count) {
    values.add(Math.floor(Math.random() * 100));
  }

  const bst = new BinarySearchTree();
  values.forEach(value => bst.insert(value));
  return bst.getTreeStructure();
};

// Validate input value
export const validateInput = (value: number): boolean => {
  const { min, max } = BST_CONFIG.controls.input;
  return value >= min && value <= max;
};

// Format operation description
export const formatOperationDescription = (operation: BSTOperation): string => {
  const { type, node, description } = operation;
  const nodeValue = node ? node.value : 'null';
  
  switch (type) {
    case 'INSERT':
      return `Inserting ${nodeValue}`;
    case 'COMPARE':
      return `Comparing with ${nodeValue}`;
    case 'FOUND':
      return `Found ${nodeValue}`;
    case 'NOT_FOUND':
      return 'Value not found';
    case 'DELETE':
      return `Deleting ${nodeValue}`;
    case 'VISIT':
      return `Visiting ${nodeValue}`;
    case 'DUPLICATE':
      return `Value ${nodeValue} already exists`;
    case 'NODE_FOUND_FOR_DELETE':
      return `Found node ${nodeValue} to delete`;
    default:
      return description;
  }
};

// Calculate animation duration based on speed
export const getAnimationDuration = (speed: number): number => {
  return BST_CONFIG.animation.duration / speed;
};

// Get responsive font size
export const getResponsiveFontSize = (width: number): number => {
  const { breakpoints, fontSize } = BST_CONFIG.responsive;
  
  if (width < breakpoints.sm) return fontSize.sm;
  if (width < breakpoints.md) return fontSize.md;
  if (width < breakpoints.lg) return fontSize.lg;
  return fontSize.xl;
}; 