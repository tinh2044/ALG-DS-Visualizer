import { LinkedList } from '@/algorithms/ds/linkedList';
import { delay } from './async';

interface LinkedListVisualizerCallbacks<T> {
  onInsertHead?: (element: T) => void;
  onInsertTail?: (element: T) => void;
  onInsertAt?: (element: T, position: number) => void;
  onDeleteHead?: (element: T) => void;
  onDeleteTail?: (element: T) => void;
  onDeleteAt?: (element: T, position: number) => void;
  onSearch?: (element: T, position: number) => void;
  onUpdate?: (oldElement: T, newElement: T, position: number) => void;
  onTraverse?: (elements: T[]) => void;
  onReverse?: () => void;
  onComplete?: () => void;
}

export class LinkedListVisualizer<T> {
  private linkedList: LinkedList<T>;
  private delay: number;
  private callbacks: LinkedListVisualizerCallbacks<T>;

  constructor(initialItems: T[] = [], delayMs = 500, callbacks: LinkedListVisualizerCallbacks<T> = {}) {
    this.linkedList = new LinkedList<T>();
    this.delay = delayMs;
    this.callbacks = callbacks;

    // Initialize with initial items
    for (const item of initialItems) {
      this.linkedList.insertTail(item);
    }
  }

  getValues(): T[] {
    return this.linkedList.getValues();
  }

  getNodes() {
    return this.linkedList.getNodes();
  }

  async insertHead(element: T): Promise<void> {
    const operation = this.linkedList.insertHead(element);
    if (this.callbacks.onInsertHead) {
      this.callbacks.onInsertHead(element);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  async insertTail(element: T): Promise<void> {
    const operation = this.linkedList.insertTail(element);
    if (this.callbacks.onInsertTail) {
      this.callbacks.onInsertTail(element);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  async insertAt(element: T, position: number): Promise<void> {
    const operation = this.linkedList.insertAt(element, position);
    if (this.callbacks.onInsertAt) {
      this.callbacks.onInsertAt(element, position);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  async deleteHead(): Promise<unknown> {
    const operation = this.linkedList.deleteHead();
    if (this.callbacks.onDeleteHead && operation.result !== undefined) {
      this.callbacks.onDeleteHead(operation.result as T);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async deleteTail(): Promise<unknown> {
    const operation = this.linkedList.deleteTail();
    if (this.callbacks.onDeleteTail && operation.result !== undefined) {
      this.callbacks.onDeleteTail(operation.result as T);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async deleteAt(position: number): Promise<unknown> {
    const operation = this.linkedList.deleteAt(position);
    if (this.callbacks.onDeleteAt && operation.result !== undefined && typeof operation.result !== 'string') {
      this.callbacks.onDeleteAt(operation.result as T, position);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async search(element: T): Promise<number> {
    const operation = this.linkedList.search(element);
    const position = operation.result as number;
    if (this.callbacks.onSearch && position !== -1) {
      this.callbacks.onSearch(element, position);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return position;
  }

  async update(position: number, value: T): Promise<unknown> {
    const operation = this.linkedList.update(position, value);
    if (this.callbacks.onUpdate && operation.result !== undefined && typeof operation.result !== 'string') {
      this.callbacks.onUpdate(operation.result as T, value, position);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async traverse(): Promise<T[]> {
    const operations = this.linkedList.traverse();
    const elements = operations.map(op => op.element as T);
    if (this.callbacks.onTraverse) {
      this.callbacks.onTraverse(elements);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return elements;
  }

  async reverse(): Promise<void> {
    const operation = this.linkedList.reverse();
    if (this.callbacks.onReverse) {
      this.callbacks.onReverse();
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  getSize(): number {
    return this.linkedList.getSize();
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  setDelay(delayMs: number): void {
    this.delay = delayMs;
  }
} 