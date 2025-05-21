import { Queue } from '@/algorithms/ds/queue';
import { delay } from './async';

interface QueueVisualizerCallbacks {
  onEnqueue?: (element: unknown) => void;
  onDequeue?: (element: unknown) => void;
  onPeek?: (element: unknown) => void;
  onComplete?: () => void;
}

export class QueueVisualizer<T> {
  private queue: Queue<T>;
  private delay: number;
  private callbacks: QueueVisualizerCallbacks;

  constructor(initialItems: T[] = [], delayMs = 500, callbacks: QueueVisualizerCallbacks = {}) {
    this.queue = new Queue<T>();
    this.delay = delayMs;
    this.callbacks = callbacks;

    // Initialize with initial items
    for (const item of initialItems) {
      this.queue.enqueue(item);
    }
  }

  getItems(): T[] {
    return this.queue.getItems();
  }

  async enqueue(element: T): Promise<void> {
    const operation = this.queue.enqueue(element);
    if (this.callbacks.onEnqueue) {
      this.callbacks.onEnqueue(operation.element);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
  }

  async dequeue(): Promise<unknown> {
    const operation = this.queue.dequeue();
    if (this.callbacks.onDequeue) {
      this.callbacks.onDequeue(operation.result);
    }
    await delay(this.delay);
    if (this.callbacks.onComplete) {
      this.callbacks.onComplete();
    }
    return operation.result;
  }

  async peek(): Promise<unknown> {
    const operation = this.queue.peek();
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
    return this.queue.isEmpty();
  }

  size(): number {
    return this.queue.size();
  }

  setDelay(delayMs: number): void {
    this.delay = delayMs;
  }
} 