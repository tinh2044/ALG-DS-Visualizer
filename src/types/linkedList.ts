export interface LinkedListNode {
  value: string | number;
  id: string;
  highlighted: boolean;
}

export interface LinkedListAppState {
  nodes: LinkedListNode[];
  isAnimating: boolean;
  speed: number;
  lastOperation: {
    type: 'insertHead' | 'insertTail' | 'insertAt' | 'deleteHead' | 'deleteTail' | 'deleteAt' | 'search' | 'update' | 'traverse' | 'reverse' | null;
    result?: unknown;
    position?: number;
  };
  inputValue: string;
  positionValue: string;
} 