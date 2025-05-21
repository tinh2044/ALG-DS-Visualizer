export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export type BSTOperationType = 
  | 'INSERT'
  | 'COMPARE'
  | 'FOUND'
  | 'NOT_FOUND'
  | 'DELETE'
  | 'VISIT'
  | 'DUPLICATE'
  | 'NODE_FOUND_FOR_DELETE';

export interface BSTOperation {
  type: BSTOperationType;
  node: BSTNode | null;
  path: BSTNode[];
  description: string;
}

export interface BSTState {
  tree: BSTNode | null;
  operations: BSTOperation[];
  currentOperation: number;
  // isPlaying: boolean;
  speed: number;
  traversalType: 'INORDER' | 'PREORDER' | 'POSTORDER' | 'LEVELORDER' | null;
  error: string | null;
  isAnimating: boolean;
  buildSteps?: BSTNode[];
  currentStep: number;
} 