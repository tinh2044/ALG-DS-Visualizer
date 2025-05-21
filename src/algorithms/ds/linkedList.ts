export interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export interface LinkedListOperation<T> {
  type:
    | 'insertHead'
    | 'insertTail'
    | 'insertAt'
    | 'deleteHead'
    | 'deleteTail'
    | 'deleteAt'
    | 'search'
    | 'update'
    | 'traverse'
    | 'reverse';
  element?: T;
  position?: number;
  result?: unknown;
  currentNode?: Node<T> | null;
  previousNode?: Node<T> | null;
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  // Insert a new node at the head of the list
  insertHead(value: T): LinkedListOperation<T> {
    const newNode: Node<T> = { value, next: this.head };
    this.head = newNode;
    this.size++;

    return {
      type: 'insertHead',
      element: value,
      currentNode: newNode,
    };
  }

  // Insert a new node at the tail of the list
  insertTail(value: T): LinkedListOperation<T> {
    const newNode: Node<T> = { value, next: null };

    // If the list is empty, the new node becomes the head
    if (!this.head) {
      this.head = newNode;
      this.size++;
      return {
        type: 'insertTail',
        element: value,
        currentNode: newNode,
      };
    }

    // Otherwise, find the last node and update its next pointer
    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    current.next = newNode;
    this.size++;

    return {
      type: 'insertTail',
      element: value,
      currentNode: newNode,
      previousNode: current,
    };
  }

  // Insert a new node at a specific position
  insertAt(value: T, position: number): LinkedListOperation<T> {
    // If position is invalid, return with error
    if (position < 0 || position > this.size) {
      return {
        type: 'insertAt',
        element: value,
        position,
        result: 'Invalid position',
      };
    }

    // If position is 0, insert at head
    if (position === 0) {
      return this.insertHead(value);
    }

    // If position is size, insert at tail
    if (position === this.size) {
      return this.insertTail(value);
    }

    const newNode: Node<T> = { value, next: null };
    let current = this.head;
    let previous = null;
    let index = 0;

    // Traverse to the specified position
    while (index < position) {
      previous = current;
      current = current!.next;
      index++;
    }

    // Insert the new node
    newNode.next = current;
    previous!.next = newNode;
    this.size++;

    return {
      type: 'insertAt',
      element: value,
      position,
      currentNode: newNode,
      previousNode: previous,
    };
  }

  // Delete the head node
  deleteHead(): LinkedListOperation<T> {
    if (!this.head) {
      return {
        type: 'deleteHead',
        result: undefined,
      };
    }

    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.size--;

    return {
      type: 'deleteHead',
      result: deletedValue,
      currentNode: this.head,
    };
  }

  // Delete the tail node
  deleteTail(): LinkedListOperation<T> {
    if (!this.head) {
      return {
        type: 'deleteTail',
        result: undefined,
      };
    }

    // If there's only one node
    if (!this.head.next) {
      const deletedValue = this.head.value;
      this.head = null;
      this.size--;

      return {
        type: 'deleteTail',
        result: deletedValue,
        currentNode: null,
      };
    }

    // Find the node before the tail
    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    // Remove the tail
    previous!.next = null;
    this.size--;

    return {
      type: 'deleteTail',
      result: current.value,
      previousNode: previous,
    };
  }

  // Delete a node at a specific position
  deleteAt(position: number): LinkedListOperation<T> {
    // If position is invalid or list is empty
    if (position < 0 || position >= this.size || !this.head) {
      return {
        type: 'deleteAt',
        position,
        result: 'Invalid position or empty list',
      };
    }

    // If position is 0, delete head
    if (position === 0) {
      return this.deleteHead();
    }

    // If position is size-1, delete tail
    if (position === this.size - 1) {
      return this.deleteTail();
    }

    let current = this.head;
    let previous = null;
    let index = 0;

    // Traverse to the specified position
    while (index < position) {
      previous = current;
      current = current.next!;
      index++;
    }

    // Remove the node
    previous!.next = current.next;
    this.size--;

    return {
      type: 'deleteAt',
      position,
      result: current.value,
      previousNode: previous,
      currentNode: current.next,
    };
  }

  // Search for a value in the list
  search(value: T): LinkedListOperation<T> {
    if (!this.head) {
      return {
        type: 'search',
        element: value,
        result: -1,
      };
    }

    let current = this.head;
    let position = 0;

    while (current) {
      if (current.value === value) {
        return {
          type: 'search',
          element: value,
          result: position,
          currentNode: current,
        };
      }
      current = current.next!;
      position++;
    }

    return {
      type: 'search',
      element: value,
      result: -1,
    };
  }

  // Update the value at a specific position
  update(position: number, value: T): LinkedListOperation<T> {
    if (position < 0 || position >= this.size || !this.head) {
      return {
        type: 'update',
        position,
        element: value,
        result: 'Invalid position or empty list',
      };
    }

    let current = this.head;
    let index = 0;

    while (index < position) {
      current = current.next!;
      index++;
    }

    const oldValue = current.value;
    current.value = value;

    return {
      type: 'update',
      position,
      element: value,
      result: oldValue,
      currentNode: current,
    };
  }

  // Traverse the list
  traverse(): LinkedListOperation<T>[] {
    const operations: LinkedListOperation<T>[] = [];
    let current = this.head;

    while (current) {
      operations.push({
        type: 'traverse',
        element: current.value,
        currentNode: current,
      });
      current = current.next;
    }

    return operations;
  }

  // Reverse the list
  reverse(): LinkedListOperation<T> {
    if (!this.head || !this.head.next) {
      return {
        type: 'reverse',
        result: this.getNodes(),
      };
    }

    let previous = null;
    let current = this.head;
    let next: Node<T> | null = null;

    while (current) {
      // Store next node
      next = current.next;

      // Reverse the pointer
      current.next = previous;

      // Move previous and current one step forward
      previous = current;
      if (next) {
        current = next;
      } else {
        break;
      }
    }

    // Update the head
    this.head = previous;

    return {
      type: 'reverse',
      result: this.getNodes(),
    };
  }

  // Get the list size
  getSize(): number {
    return this.size;
  }

  // Get all nodes as an array
  getNodes(): (Node<T> | null)[] {
    const nodes: (Node<T> | null)[] = [];
    let current = this.head;

    while (current) {
      nodes.push(current);
      current = current.next;
    }

    return nodes;
  }

  // Get all values as an array
  getValues(): T[] {
    const values: T[] = [];
    let current = this.head;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values;
  }

  // For visualization purposes - generates a sequence of operations with their results
  static visualize<T>(
    operations: { operation: string; value?: T; position?: number }[]
  ): LinkedListOperation<T>[] {
    const linkedList = new LinkedList<T>();
    const results: LinkedListOperation<T>[] = [];

    for (const op of operations) {
      let result: LinkedListOperation<T> | LinkedListOperation<T>[];

      switch (op.operation) {
        case 'insertHead':
          result = linkedList.insertHead(op.value as T);
          break;
        case 'insertTail':
          result = linkedList.insertTail(op.value as T);
          break;
        case 'insertAt':
          result = linkedList.insertAt(op.value as T, op.position as number);
          break;
        case 'deleteHead':
          result = linkedList.deleteHead();
          break;
        case 'deleteTail':
          result = linkedList.deleteTail();
          break;
        case 'deleteAt':
          result = linkedList.deleteAt(op.position as number);
          break;
        case 'search':
          result = linkedList.search(op.value as T);
          break;
        case 'update':
          result = linkedList.update(op.position as number, op.value as T);
          break;
        case 'traverse':
          result = linkedList.traverse();
          break;
        case 'reverse':
          result = linkedList.reverse();
          break;
        default:
          continue;
      }

      if (Array.isArray(result)) {
        results.push(...result);
      } else {
        results.push(result);
      }
    }

    return results;
  }
}

export const linkedListOperations = {
  insertHead: 'insertHead',
  insertTail: 'insertTail',
  insertAt: 'insertAt',
  deleteHead: 'deleteHead',
  deleteTail: 'deleteTail',
  deleteAt: 'deleteAt',
  search: 'search',
  update: 'update',
  traverse: 'traverse',
  reverse: 'reverse',
};
