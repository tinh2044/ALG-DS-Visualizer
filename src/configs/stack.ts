export const menuItems = [
  {
    name: 'Stack',
    path: '/data-structures/stack',
  }
];

export const initialStackItems = ['First', 'Second', 'Third'];
export const stackCompletionMessage = 'Operation completed';

export const stackCellCSS = {
  size: 60,
  margin: 4,
};

export const colors = {
  normal: 'lightgrey',
  highlight: 'yellow',
  push: '#8cf12b',
  pop: '#ff6b6b',
  peek: '#59c9f9',
};

export const stackJS = `class Stack {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the top of the stack
  push(element) {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }
  
  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the stack
  size() {
    return this.items.length;
  }
  
  // Clear the stack
  clear() {
    this.items = [];
  }
}`;

export const stackTS = `class Stack<T> {
  private items: T[] = [];
  
  // Add an element to the top of the stack
  push(element: T): T {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the top element
  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop() as T;
  }
  
  // Return the top element without removing it
  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Return the size of the stack
  size(): number {
    return this.items.length;
  }
  
  // Clear the stack
  clear(): void {
    this.items = [];
  }
}`;

export const stackCPP = `#include <iostream>
#include <string>
#include <vector>

template <typename T>
class Stack {
private:
    std::vector<T> items;

public:
    // Add an element to the top of the stack
    T push(T element) {
        items.push_back(element);
        return element;
    }
    
    // Remove and return the top element
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        T top = items.back();
        items.pop_back();
        return top;
    }
    
    // Return the top element without removing it
    T peek() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return items.back();
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return items.empty();
    }
    
    // Return the size of the stack
    int size() {
        return items.size();
    }
    
    // Clear the stack
    void clear() {
        items.clear();
    }
};

// Example usage
int main() {
    Stack<int> stack;
    
    // Push elements
    stack.push(1);
    stack.push(2);
    stack.push(3);
    
    // Peek the top element
    std::cout << "Top element: " << stack.peek() << std::endl;
    
    // Pop elements
    std::cout << "Popped: " << stack.pop() << std::endl;
    std::cout << "Popped: " << stack.pop() << std::endl;
    
    // Check size
    std::cout << "Stack size: " << stack.size() << std::endl;
    
    return 0;
}`;

export const stackPython = `class Stack:
    def __init__(self):
        self.items = []
    
    # Add an element to the top of the stack
    def push(self, element):
        self.items.append(element)
        return element
    
    # Remove and return the top element
    def pop(self):
        if self.is_empty():
            return "Stack is empty"
        return self.items.pop()
    
    # Return the top element without removing it
    def peek(self):
        if self.is_empty():
            return "Stack is empty"
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the stack
    def size(self):
        return len(self.items)
    
    # Clear the stack
    def clear(self):
        self.items = []

# Example usage
if __name__ == "__main__":
    stack = Stack()
    
    # Push elements
    stack.push(1)
    stack.push(2)
    stack.push(3)
    
    # Peek the top element
    print(f"Top element: {stack.peek()}")
    
    # Pop elements
    print(f"Popped: {stack.pop()}")
    print(f"Popped: {stack.pop()}")
    
    # Check size
    print(f"Stack size: {stack.size()}")`;

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--stack-cell-size', `${stackCellCSS.size}px`);
root.style.setProperty('--stack-cell-margin', `${stackCellCSS.margin}px`);
root.style.setProperty('--stack-color-normal', colors.normal);
root.style.setProperty('--stack-color-highlight', colors.highlight);
root.style.setProperty('--stack-color-push', colors.push);
root.style.setProperty('--stack-color-pop', colors.pop);
root.style.setProperty('--stack-color-peek', colors.peek); 