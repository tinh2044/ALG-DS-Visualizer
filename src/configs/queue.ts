export const menuItems = [
  {
    name: 'Queue',
    path: '/data-structures/queue',
  }
];

export const initialQueueItems = [];
export const queueCompletionMessage = 'Operation completed';

export const queueCellCSS = {
  size: 60,
  margin: 4,
};

export const colors = {
  normal: 'lightgrey',
  highlight: 'yellow',
  enqueue: '#8cf12b',
  dequeue: '#ff6b6b',
  peek: '#59c9f9',
};

export const queueJS = `class Queue {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the end of the queue
  enqueue(element) {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the first element
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }
  
  // Return the first element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the queue
  size() {
    return this.items.length;
  }
  
  // Clear the queue
  clear() {
    this.items = [];
  }
}`;

export const queueTS = `class Queue<T> {
  private items: T[] = [];
  
  // Add an element to the end of the queue
  enqueue(element: T): T {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the first element
  dequeue(): T | string {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift() as T;
  }
  
  // Return the first element without removing it
  peek(): T | string {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  
  // Check if queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Return the size of the queue
  size(): number {
    return this.items.length;
  }
  
  // Clear the queue
  clear(): void {
    this.items = [];
  }
}`;

export const queueCPP = `#include <iostream>
#include <string>
#include <vector>

template <typename T>
class Queue {
private:
    std::vector<T> items;

public:
    // Add an element to the end of the queue
    T enqueue(T element) {
        items.push_back(element);
        return element;
    }
    
    // Remove and return the first element
    T dequeue() {
        if (isEmpty()) {
            throw std::runtime_error("Queue is empty");
        }
        T front = items.front();
        items.erase(items.begin());
        return front;
    }
    
    // Return the first element without removing it
    T peek() {
        if (isEmpty()) {
            throw std::runtime_error("Queue is empty");
        }
        return items.front();
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return items.empty();
    }
    
    // Return the size of the queue
    int size() {
        return items.size();
    }
    
    // Clear the queue
    void clear() {
        items.clear();
    }
};

// Example usage
int main() {
    Queue<int> queue;
    
    // Enqueue elements
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    
    // Peek the front element
    std::cout << "Front element: " << queue.peek() << std::endl;
    
    // Dequeue elements
    std::cout << "Dequeued: " << queue.dequeue() << std::endl;
    std::cout << "Dequeued: " << queue.dequeue() << std::endl;
    
    // Check size
    std::cout << "Queue size: " << queue.size() << std::endl;
    
    return 0;
}`;

export const queuePython = `class Queue:
    def __init__(self):
        self.items = []
    
    # Add an element to the end of the queue
    def enqueue(self, element):
        self.items.append(element)
        return element
    
    # Remove and return the first element
    def dequeue(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items.pop(0)
    
    # Return the first element without removing it
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    # Check if queue is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the queue
    def size(self):
        return len(self.items)
    
    # Clear the queue
    def clear(self):
        self.items = []

# Example usage
if __name__ == "__main__":
    queue = Queue()
    
    # Enqueue elements
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    
    # Peek the front element
    print(f"Front element: {queue.peek()}")
    
    # Dequeue elements
    print(f"Dequeued: {queue.dequeue()}")
    print(f"Dequeued: {queue.dequeue()}")
    
    # Check size
    print(f"Queue size: {queue.size()}")`;

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--queue-cell-size', `${queueCellCSS.size}px`);
root.style.setProperty('--queue-cell-margin', `${queueCellCSS.margin}px`);
root.style.setProperty('--queue-color-normal', colors.normal);
root.style.setProperty('--queue-color-highlight', colors.highlight);
root.style.setProperty('--queue-color-enqueue', colors.enqueue);
root.style.setProperty('--queue-color-dequeue', colors.dequeue);
root.style.setProperty('--queue-color-peek', colors.peek); 