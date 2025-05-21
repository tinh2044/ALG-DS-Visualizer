import { AVLNode, AVLOperation, AVLOperationType, RotationType } from '@/types/avlTree';
import { AVL_TREE_CONFIG } from '@/configs/avlTree';
import { AVLTree } from '@/algorithms/ds/avlTree';

interface D3TreeNode {
  name: string;
  height: number;
  balanceFactor: number;
  children: D3TreeNode[];
}

// Convert AVL to D3 tree data structure
export const convertToD3Tree = (node: AVLNode | null): D3TreeNode | null => {
  if (!node) return null;

  // Calculate balance factor
  const balanceFactor = getBalanceFactor(node);

  return {
    name: node.value.toString(),
    height: node.height,
    balanceFactor: balanceFactor,
    children: [
      node.left ? convertToD3Tree(node.left) : null,
      node.right ? convertToD3Tree(node.right) : null
    ].filter((child): child is D3TreeNode => child !== null)
  };
};

// Get height of a node
export const getHeight = (node: AVLNode | null): number => {
  if (!node) return 0;
  return node.height;
};

// Get balance factor of a node
export const getBalanceFactor = (node: AVLNode | null): number => {
  if (!node) return 0;
  return getHeight(node.left) - getHeight(node.right);
};

// Get node color based on operation type
export const getNodeColor = (operationType: AVLOperationType, balanceFactor: number = 0): string => {
  if (operationType === 'ROTATE') {
    return AVL_TREE_CONFIG.node.colors.rotation;
  }

  if (operationType === 'CHECK_BALANCE') {
    // Check if balanced or unbalanced
    if (Math.abs(balanceFactor) > 1) {
      return AVL_TREE_CONFIG.node.colors.unbalanced;
    }
    return AVL_TREE_CONFIG.node.colors.balanced;
  }

  return AVL_TREE_CONFIG.operationColors[operationType];
};

// Get edge color based on operation type
export const getEdgeColor = (operationType: AVLOperationType): string => {
  if (operationType === 'ROTATE') {
    return AVL_TREE_CONFIG.edge.colors.rotation;
  }
  
  return AVL_TREE_CONFIG.edge.colors[operationType === 'COMPARE' ? 'highlight' : 'default'];
};

// Get color based on balance factor
export const getBalanceFactorColor = (balanceFactor: number): string => {
  return Math.abs(balanceFactor) > 1 
    ? AVL_TREE_CONFIG.balanceFactorColors.unbalanced 
    : AVL_TREE_CONFIG.balanceFactorColors.balanced;
};

// Calculate node position based on screen size
export const calculateNodePosition = (width: number, height: number) => {
  const { breakpoints, nodeSize } = AVL_TREE_CONFIG.responsive;
  
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

// Generate random AVL Tree
export const generateRandomAVL = (count: number): AVLNode | null => {
  if (count <= 0) return null;

  const values = new Set<number>();
  while (values.size < count) {
    values.add(Math.floor(Math.random() * 100));
  }

  const avl = new AVLTree();
  const valuesArray = Array.from(values);
  
  // Insert values in a random order
  valuesArray.sort(() => Math.random() - 0.5).forEach(value => avl.insert(value));
  
  return avl.getRoot();
};

// Validate input value
export const validateInput = (value: number): boolean => {
  const { min, max } = AVL_TREE_CONFIG.controls.input;
  return value >= min && value <= max;
};

// Format operation description
export const formatOperationDescription = (operation: AVLOperation): string => {
  const { type, node, description, balanceFactor, rotationType } = operation;
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
    case 'UPDATE_HEIGHT':
      return `Updated height of node ${nodeValue} to ${node?.height}`;
    case 'CHECK_BALANCE':
      return `Balance factor of node ${nodeValue} is ${balanceFactor}`;
    case 'ROTATE':
      if (rotationType === 'LEFT') {
        return `Left rotation at node ${nodeValue}`;
      } else {
        return `Right rotation at node ${nodeValue}`;
      }
    default:
      return description;
  }
};

// Get rotation description
export const getRotationDescription = (operation: AVLOperation): string => {
  if (operation.type !== 'ROTATE' || !operation.rotationType) {
    return '';
  }
  
  const nodeValue = operation.node ? operation.node.value : 'null';
  
  switch (operation.rotationType) {
    case 'LEFT':
      return `Left rotation at node ${nodeValue}`;
    case 'RIGHT':
      return `Right rotation at node ${nodeValue}`;
    default:
      return operation.description;
  }
};

// Calculate animation duration based on speed
export const getAnimationDuration = (speed: number, isRotation: boolean = false): number => {
  return isRotation 
    ? AVL_TREE_CONFIG.animation.rotationDuration / speed
    : AVL_TREE_CONFIG.animation.duration / speed;
};

// Get responsive font size
export const getResponsiveFontSize = (width: number): number => {
  const { breakpoints, fontSize } = AVL_TREE_CONFIG.responsive;
  
  if (width < breakpoints.sm) return fontSize.sm;
  if (width < breakpoints.md) return fontSize.md;
  if (width < breakpoints.lg) return fontSize.lg;
  return fontSize.xl;
}; 