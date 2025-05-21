export interface QueueOperation {
  type: 'enqueue' | 'dequeue' | 'peek' | 'isEmpty' | 'size';
  element?: unknown;
  result?: unknown;
}

export class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): QueueOperation {
    this.items.push(element);
    return {
      type: 'enqueue',
      element,
    };
  }

  dequeue(): QueueOperation {
    if (this.isEmpty()) {
      return {
        type: 'dequeue',
        result: undefined,
      };
    }
    
    const dequeued = this.items.shift();
    return {
      type: 'dequeue',
      result: dequeued,
    };
  }

  peek(): QueueOperation {
    if (this.isEmpty()) {
      return {
        type: 'peek',
        result: undefined,
      };
    }
    
    return {
      type: 'peek',
      result: this.items[0],
    };
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  getItems(): T[] {
    return [...this.items];
  }

  // Generates a sequence of operations
  static visualize<T>(operations: { operation: string, value?: T }[]): QueueOperation[] {
    const queue = new Queue<T>();
    const results: QueueOperation[] = [];

    for (const op of operations) {
      let result: QueueOperation;

      switch (op.operation) {
        case 'enqueue':
          result = queue.enqueue(op.value as T);
          break;
        case 'dequeue':
          result = queue.dequeue();
          break;
        case 'peek':
          result = queue.peek();
          break;
        case 'isEmpty':
          result = {
            type: 'isEmpty',
            result: queue.isEmpty(),
          };
          break;
        case 'size':
          result = {
            type: 'size',
            result: queue.size(),
          };
          break;
        default:
          continue;
      }

      results.push(result);
    }

    return results;
  }
} 

export const queueOperations = {
  enqueue: 'enqueue',
  dequeue: 'dequeue',
  peek: 'peek',
  isEmpty: 'isEmpty',
  size: 'size'
};
