export const initialLinkedListItems = [1, 2, 3, 4, 5];
export const linkedListCellSize = 70;
export const linkedListArrowSize = 30;
export const defaultAnimationSpeed = 5;
export const linkedListCompletionMessage = 'Operation completed';

export const linkedListJS = `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a new node at the beginning of the list
  insertHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return value;
  }
  
  // Add a new node at the end of the list
  insertTail(value) {
    const newNode = new Node(value);
    
    // If list is empty, new node becomes the head
    if (!this.head) {
      this.head = newNode;
      this.size++;
      return value;
    }
    
    // Find the last node and update its next pointer
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
    this.size++;
    return value;
  }
  
  // Insert a new node at a specific position
  insertAt(value, position) {
    if (position < 0 || position > this.size) {
      return "Invalid position";
    }
    
    if (position === 0) {
      return this.insertHead(value);
    }
    
    if (position === this.size) {
      return this.insertTail(value);
    }
    
    const newNode = new Node(value);
    let current = this.head;
    let previous = null;
    let index = 0;
    
    while (index < position) {
      previous = current;
      current = current.next;
      index++;
    }
    
    newNode.next = current;
    previous.next = newNode;
    this.size++;
    return value;
  }
  
  // Delete the first node of the list
  deleteHead() {
    if (!this.head) {
      return "List is empty";
    }
    
    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.size--;
    return deletedValue;
  }
  
  // Delete the last node of the list
  deleteTail() {
    if (!this.head) {
      return "List is empty";
    }
    
    // If there's only one node
    if (!this.head.next) {
      const deletedValue = this.head.value;
      this.head = null;
      this.size--;
      return deletedValue;
    }
    
    // Find the node before the tail
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    
    const deletedValue = current.next.value;
    current.next = null;
    this.size--;
    return deletedValue;
  }
  
  // Delete a node at a specific position
  deleteAt(position) {
    if (position < 0 || position >= this.size || !this.head) {
      return "Invalid position or empty list";
    }
    
    if (position === 0) {
      return this.deleteHead();
    }
    
    let current = this.head;
    let previous = null;
    let index = 0;
    
    while (index < position) {
      previous = current;
      current = current.next;
      index++;
    }
    
    previous.next = current.next;
    this.size--;
    return current.value;
  }
  
  // Search for a value in the list
  search(value) {
    if (!this.head) {
      return -1;
    }
    
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.value === value) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
  
  // Update the value at a specific position
  update(position, value) {
    if (position < 0 || position >= this.size || !this.head) {
      return "Invalid position or empty list";
    }
    
    let current = this.head;
    let index = 0;
    
    while (index < position) {
      current = current.next;
      index++;
    }
    
    const oldValue = current.value;
    current.value = value;
    return oldValue;
  }
  
  // Reverse the list
  reverse() {
    if (!this.head || !this.head.next) {
      return;
    }
    
    let previous = null;
    let current = this.head;
    let next = null;
    
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    
    this.head = previous;
  }
  
  // Get list size
  size() {
    return this.size;
  }
  
  // Check if list is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Print the list
  print() {
    if (!this.head) {
      return "List is empty";
    }
    
    let result = "";
    let current = this.head;
    
    while (current) {
      result += current.value + " -> ";
      current = current.next;
    }
    
    result += "null";
    return result;
  }
}`;

export const linkedListTS = `class Node<T> {
  value: T;
  next: Node<T> | null;
  
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a new node at the beginning of the list
  insertHead(value: T): T {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return value;
  }
  
  // Add a new node at the end of the list
  insertTail(value: T): T {
    const newNode = new Node(value);
    
    // If list is empty, new node becomes the head
    if (!this.head) {
      this.head = newNode;
      this.size++;
      return value;
    }
    
    // Find the last node and update its next pointer
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
    this.size++;
    return value;
  }
  
  // Insert a new node at a specific position
  insertAt(value: T, position: number): T | string {
    if (position < 0 || position > this.size) {
      return "Invalid position";
    }
    
    if (position === 0) {
      return this.insertHead(value);
    }
    
    if (position === this.size) {
      return this.insertTail(value);
    }
    
    const newNode = new Node(value);
    let current = this.head;
    let previous: Node<T> | null = null;
    let index = 0;
    
    while (index < position && current !== null) {
      previous = current;
      current = current.next;
      index++;
    }
    
    newNode.next = current;
    if (previous) previous.next = newNode;
    this.size++;
    return value;
  }
  
  // Delete the first node of the list
  deleteHead(): T | string {
    if (!this.head) {
      return "List is empty";
    }
    
    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.size--;
    return deletedValue;
  }
  
  // Delete the last node of the list
  deleteTail(): T | string {
    if (!this.head) {
      return "List is empty";
    }
    
    // If there's only one node
    if (!this.head.next) {
      const deletedValue = this.head.value;
      this.head = null;
      this.size--;
      return deletedValue;
    }
    
    // Find the node before the tail
    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    
    const deletedValue = current.next!.value;
    current.next = null;
    this.size--;
    return deletedValue;
  }
  
  // Delete a node at a specific position
  deleteAt(position: number): T | string {
    if (position < 0 || position >= this.size || !this.head) {
      return "Invalid position or empty list";
    }
    
    if (position === 0) {
      return this.deleteHead();
    }
    
    let current = this.head;
    let previous: Node<T> | null = null;
    let index = 0;
    
    while (index < position && current !== null) {
      previous = current;
      current = current.next!;
      index++;
    }
    
    if (previous && current) {
      previous.next = current.next;
      this.size--;
      return current.value;
    }
    
    return "Invalid position";
  }
  
  // Search for a value in the list
  search(value: T): number {
    if (!this.head) {
      return -1;
    }
    
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.value === value) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
  
  // Update the value at a specific position
  update(position: number, value: T): T | string {
    if (position < 0 || position >= this.size || !this.head) {
      return "Invalid position or empty list";
    }
    
    let current = this.head;
    let index = 0;
    
    while (index < position && current !== null) {
      current = current.next!;
      index++;
    }
    
    if (current) {
      const oldValue = current.value;
      current.value = value;
      return oldValue;
    }
    
    return "Invalid position";
  }
  
  // Reverse the list
  reverse(): void {
    if (!this.head || !this.head.next) {
      return;
    }
    
    let previous: Node<T> | null = null;
    let current: Node<T> | null = this.head;
    let next: Node<T> | null = null;
    
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    
    this.head = previous;
  }
  
  // Get list size
  getSize(): number {
    return this.size;
  }
  
  // Check if list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }
  
  // Print the list
  print(): string {
    if (!this.head) {
      return "List is empty";
    }
    
    let result = "";
    let current: Node<T> | null = this.head;
    
    while (current) {
      result += current.value + " -> ";
      current = current.next;
    }
    
    result += "null";
    return result;
  }
}`;

export const linkedListPython = `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    # Add a new node at the beginning of the list
    def insert_head(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
        return value
    
    # Add a new node at the end of the list
    def insert_tail(self, value):
        new_node = Node(value)
        
        # If list is empty, new node becomes the head
        if not self.head:
            self.head = new_node
            self.size += 1
            return value
        
        # Find the last node and update its next pointer
        current = self.head
        while current.next:
            current = current.next
        
        current.next = new_node
        self.size += 1
        return value
    
    # Insert a new node at a specific position
    def insert_at(self, value, position):
        if position < 0 or position > self.size:
            return "Invalid position"
        
        if position == 0:
            return self.insert_head(value)
        
        if position == self.size:
            return self.insert_tail(value)
        
        new_node = Node(value)
        current = self.head
        previous = None
        index = 0
        
        while index < position:
            previous = current
            current = current.next
            index += 1
        
        new_node.next = current
        previous.next = new_node
        self.size += 1
        return value
    
    # Delete the first node of the list
    def delete_head(self):
        if not self.head:
            return "List is empty"
        
        deleted_value = self.head.value
        self.head = self.head.next
        self.size -= 1
        return deleted_value
    
    # Delete the last node of the list
    def delete_tail(self):
        if not self.head:
            return "List is empty"
        
        # If there's only one node
        if not self.head.next:
            deleted_value = self.head.value
            self.head = None
            self.size -= 1
            return deleted_value
        
        # Find the node before the tail
        current = self.head
        while current.next.next:
            current = current.next
        
        deleted_value = current.next.value
        current.next = None
        self.size -= 1
        return deleted_value
    
    # Delete a node at a specific position
    def delete_at(self, position):
        if position < 0 or position >= self.size or not self.head:
            return "Invalid position or empty list"
        
        if position == 0:
            return self.delete_head()
        
        current = self.head
        previous = None
        index = 0
        
        while index < position:
            previous = current
            current = current.next
            index += 1
        
        previous.next = current.next
        self.size -= 1
        return current.value
    
    # Search for a value in the list
    def search(self, value):
        if not self.head:
            return -1
        
        current = self.head
        position = 0
        
        while current:
            if current.value == value:
                return position
            current = current.next
            position += 1
        
        return -1
    
    # Update the value at a specific position
    def update(self, position, value):
        if position < 0 or position >= self.size or not self.head:
            return "Invalid position or empty list"
        
        current = self.head
        index = 0
        
        while index < position:
            current = current.next
            index += 1
        
        old_value = current.value
        current.value = value
        return old_value
    
    # Reverse the list
    def reverse(self):
        if not self.head or not self.head.next:
            return
        
        previous = None
        current = self.head
        next_node = None
        
        while current:
            next_node = current.next
            current.next = previous
            previous = current
            current = next_node
        
        self.head = previous
    
    # Get list size
    def size(self):
        return self.size
    
    # Check if list is empty
    def is_empty(self):
        return self.size == 0
    
    # Print the list
    def print_list(self):
        if not self.head:
            return "List is empty"
        
        result = ""
        current = self.head
        
        while current:
            result += str(current.value) + " -> "
            current = current.next
        
        result += "None"
        return result`;

export const linkedListCPP = `#include <iostream>
#include <string>

template <typename T>
class Node {
public:
    T value;
    Node* next;
    
    Node(T val) : value(val), next(nullptr) {}
};

template <typename T>
class LinkedList {
private:
    Node<T>* head;
    int size;

public:
    LinkedList() : head(nullptr), size(0) {}
    
    ~LinkedList() {
        Node<T>* current = head;
        while (current) {
            Node<T>* next = current->next;
            delete current;
            current = next;
        }
    }
    
    // Add a new node at the beginning of the list
    T insertHead(T value) {
        Node<T>* newNode = new Node<T>(value);
        newNode->next = head;
        head = newNode;
        size++;
        return value;
    }
    
    // Add a new node at the end of the list
    T insertTail(T value) {
        Node<T>* newNode = new Node<T>(value);
        
        // If list is empty, new node becomes the head
        if (!head) {
            head = newNode;
            size++;
            return value;
        }
        
        // Find the last node and update its next pointer
        Node<T>* current = head;
        while (current->next) {
            current = current->next;
        }
        
        current->next = newNode;
        size++;
        return value;
    }
    
    // Insert a new node at a specific position
    std::string insertAt(T value, int position) {
        if (position < 0 || position > size) {
            return "Invalid position";
        }
        
        if (position == 0) {
            insertHead(value);
            return std::to_string(value);
        }
        
        if (position == size) {
            insertTail(value);
            return std::to_string(value);
        }
        
        Node<T>* newNode = new Node<T>(value);
        Node<T>* current = head;
        Node<T>* previous = nullptr;
        int index = 0;
        
        while (index < position) {
            previous = current;
            current = current->next;
            index++;
        }
        
        newNode->next = current;
        previous->next = newNode;
        size++;
        return std::to_string(value);
    }
    
    // Delete the first node of the list
    std::string deleteHead() {
        if (!head) {
            return "List is empty";
        }
        
        T deletedValue = head->value;
        Node<T>* temp = head;
        head = head->next;
        delete temp;
        size--;
        return std::to_string(deletedValue);
    }
    
    // Delete the last node of the list
    std::string deleteTail() {
        if (!head) {
            return "List is empty";
        }
        
        // If there's only one node
        if (!head->next) {
            T deletedValue = head->value;
            delete head;
            head = nullptr;
            size--;
            return std::to_string(deletedValue);
        }
        
        // Find the node before the tail
        Node<T>* current = head;
        while (current->next->next) {
            current = current->next;
        }
        
        T deletedValue = current->next->value;
        delete current->next;
        current->next = nullptr;
        size--;
        return std::to_string(deletedValue);
    }
    
    // Delete a node at a specific position
    std::string deleteAt(int position) {
        if (position < 0 || position >= size || !head) {
            return "Invalid position or empty list";
        }
        
        if (position == 0) {
            return deleteHead();
        }
        
        Node<T>* current = head;
        Node<T>* previous = nullptr;
        int index = 0;
        
        while (index < position) {
            previous = current;
            current = current->next;
            index++;
        }
        
        previous->next = current->next;
        T deletedValue = current->value;
        delete current;
        size--;
        return std::to_string(deletedValue);
    }
    
    // Search for a value in the list
    int search(T value) {
        if (!head) {
            return -1;
        }
        
        Node<T>* current = head;
        int position = 0;
        
        while (current) {
            if (current->value == value) {
                return position;
            }
            current = current->next;
            position++;
        }
        
        return -1;
    }
    
    // Update the value at a specific position
    std::string update(int position, T value) {
        if (position < 0 || position >= size || !head) {
            return "Invalid position or empty list";
        }
        
        Node<T>* current = head;
        int index = 0;
        
        while (index < position) {
            current = current->next;
            index++;
        }
        
        T oldValue = current->value;
        current->value = value;
        return std::to_string(oldValue);
    }
    
    // Reverse the list
    void reverse() {
        if (!head || !head->next) {
            return;
        }
        
        Node<T>* previous = nullptr;
        Node<T>* current = head;
        Node<T>* next = nullptr;
        
        while (current) {
            next = current->next;
            current->next = previous;
            previous = current;
            current = next;
        }
        
        head = previous;
    }
    
    // Get list size
    int getSize() {
        return size;
    }
    
    // Check if list is empty
    bool isEmpty() {
        return size == 0;
    }
    
    // Print the list
    std::string print() {
        if (!head) {
            return "List is empty";
        }
        
        std::string result = "";
        Node<T>* current = head;
        
        while (current) {
            result += std::to_string(current->value) + " -> ";
            current = current->next;
        }
        
        result += "nullptr";
        return result;
    }
};

// Example usage
int main() {
    LinkedList<int> list;
    
    // Insert elements
    list.insertHead(1);
    list.insertTail(3);
    list.insertAt(2, 1);
    
    // Print the list
    std::cout << "List: " << list.print() << std::endl;
    
    // Search for an element
    std::cout << "Position of 2: " << list.search(2) << std::endl;
    
    // Update an element
    list.update(1, 5);
    std::cout << "List after update: " << list.print() << std::endl;
    
    // Reverse the list
    list.reverse();
    std::cout << "Reversed list: " << list.print() << std::endl;
    
    // Delete elements
    list.deleteHead();
    list.deleteTail();
    std::cout << "List after deletions: " << list.print() << std::endl;
    
    return 0;
}`; 