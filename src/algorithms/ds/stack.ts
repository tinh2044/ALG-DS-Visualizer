export interface StackOperation {
  type: 'push' | 'pop' | 'peek' | 'isEmpty' | 'size';
  element?: unknown;
  result?: unknown;
}

export class Stack<T> {
  private items: T[] = [];

  push(element: T): StackOperation {
    this.items.push(element);
    return {
      type: 'push',
      element,
    };
  }

  pop(): StackOperation {
    if (this.isEmpty()) {
      return {
        type: 'pop',
        result: undefined,
      };
    }
    
    const popped = this.items.pop();
    return {
      type: 'pop',
      result: popped,
    };
  }

  peek(): StackOperation {
    if (this.isEmpty()) {
      return {
        type: 'peek',
        result: undefined,
      };
    }
    
    return {
      type: 'peek',
      result: this.items[this.items.length - 1],
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
  static visualize<T>(operations: { operation: string, value?: T }[]): StackOperation[] {
    const stack = new Stack<T>();
    const results: StackOperation[] = [];

    for (const op of operations) {
      let result: StackOperation;

      switch (op.operation) {
        case 'push':
          result = stack.push(op.value as T);
          break;
        case 'pop':
          result = stack.pop();
          break;
        case 'peek':
          result = stack.peek();
          break;
        case 'isEmpty':
          result = {
            type: 'isEmpty',
            result: stack.isEmpty(),
          };
          break;
        case 'size':
          result = {
            type: 'size',
            result: stack.size(),
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


export const stackOperations = {
  push: 'push',
  pop: 'pop',
  peek: 'peek',
  isEmpty: 'isEmpty',
  size: 'size'
};
