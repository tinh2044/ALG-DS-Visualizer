import { Stack } from '@/algorithms/ds/stack';
import { delay } from './async';

interface StackVisualizerCallbacks {
  onPush?: (element: unknown) => void;
  onPop?: (element: unknown) => void;
  onPeek?: (element: unknown) => void;
  onComplete?: () => void;
}

export class StackVisualizer<T> {
  private stack: Stack<T>;
  private delay: number;
  private callbacks: StackVisualizerCallbacks;

  constructor(initialItems: T[] = [], delayMs = 500, callbacks: StackVisualizerCallbacks = {}) {
    this.stack = new Stack<T>();
    this.delay = delayMs;
    this.callbacks = callbacks;

    // Initialize with initial items
    for (const item of initialItems) {
      this.stack.push(item);
    }
  }

  getItems(): T[] {
    return this.stack.getItems();
  }

  async push(element: T): Promise<void> {
    const operation = this.stack.push(element);
    if (this.callbacks.onPush) {
      this.callbacks.onPush(operation.element);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  async pop(): Promise<unknown> {
    const operation = this.stack.pop();
    if (this.callbacks.onPop) {
      this.callbacks.onPop(operation.result);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async peek(): Promise<unknown> {
    const operation = this.stack.peek();
    if (this.callbacks.onPeek) {
      this.callbacks.onPeek(operation.result);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  isEmpty(): boolean {
    return this.stack.isEmpty();
  }

  size(): number {
    return this.stack.size();
  }

  setDelay(delayMs: number): void {
    this.delay = delayMs;
  }
} 