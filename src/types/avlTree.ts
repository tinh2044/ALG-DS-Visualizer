export interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

export type RotationType = 'LEFT' | 'RIGHT';

export type AVLOperationType = 
  | 'INSERT'
  | 'COMPARE'
  | 'FOUND'
  | 'NOT_FOUND'
  | 'DELETE'
  | 'VISIT'
  | 'DUPLICATE'
  | 'NODE_FOUND_FOR_DELETE'
  | 'UPDATE_HEIGHT'
  | 'CHECK_BALANCE'
  | 'ROTATE';

export interface AVLOperation {
  type: AVLOperationType;
  node: AVLNode | null;
  path: AVLNode[];
  description: string;
  balanceFactor: number;
  rotationType?: RotationType;
}

export interface AVLState {
  tree: AVLNode | null;
  operations: AVLOperation[];
  currentOperation: number;
  speed: number;
  traversalType: 'INORDER' | 'PREORDER' | 'POSTORDER' | 'LEVELORDER' | null;
  error: string | null;
  isAnimating: boolean;
  buildSteps?: AVLNode[];
  currentStep: number;
} 