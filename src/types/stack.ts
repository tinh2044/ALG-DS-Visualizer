export interface StackItem {
  value: string | number;
  id: string;
  highlighted?: boolean;
}

export interface StackAppState {
  items: StackItem[];
  isAnimating: boolean;
  speed: number;
  lastOperation: {
    type: 'push' | 'pop' | 'peek' | 'isEmpty' | 'size' | null;
    result?: unknown;
  };
  inputValue: string;
}

export interface StackCellProps {
  item: StackItem;
  isTop: boolean;
  operation: 'push' | 'pop' | 'peek' | null;
} 