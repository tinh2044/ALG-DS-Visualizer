export interface QueueItem {
  value: string | number;
  id: string;
  highlighted?: boolean;
}

export interface QueueAppState {
  items: QueueItem[];
  isAnimating: boolean;
  speed: number;
  lastOperation: {
    type: 'enqueue' | 'dequeue' | 'peek' | 'isEmpty' | 'size' | null;
    result?: unknown;
  };
  inputValue: string;
}

export interface QueueCellProps {
  item: QueueItem;
  isFirst: boolean;
  isLast: boolean;
  operation: 'enqueue' | 'dequeue' | 'peek' | null;
} 