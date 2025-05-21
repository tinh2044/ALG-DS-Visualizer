/* eslint-disable @typescript-eslint/no-explicit-any */
import { BSTNode, BSTOperation } from '@/types/bst';

export class BinarySearchTree {
  private root: BSTNode | null = null;

  constructor() {
    this.root = null;
  }

  getRoot(): BSTNode | null {
    return this.root;
  }

  setRoot(node: BSTNode | null): void {
    this.root = node;
  }

  // Insert a new node
  insert(value: number): BSTOperation[] {
    const operations: BSTOperation[] = [];
    const newNode: BSTNode = { value, left: null, right: null };
    
    if (!this.root) {
      this.root = newNode;
      operations.push({
        type: 'INSERT',
        node: newNode,
        path: [],
        description: 'Inserting root node'
      });
      return operations;
    }

    let current = this.root;
    const path: BSTNode[] = [current];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      operations.push({
        type: 'COMPARE',
        node: current,
        path: [...path],
        description: `Comparing ${value} with ${current.value}`
      });

      if (value <= current.value) {
        if (!current.left) {
          current.left = newNode;
          operations.push({
            type: 'INSERT',
            node: newNode,
            path: [...path],
            description: `Inserting ${value} as left child of ${current.value}`
          });
          break;
        }
        current = current.left;
        path.push(current);
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          operations.push({
            type: 'INSERT',
            node: newNode,
            path: [...path],
            description: `Inserting ${value} as right child of ${current.value}`
          });
          break;
        }
        current = current.right;
        path.push(current);
      } else {
        operations.push({
          type: 'DUPLICATE',
          node: current,
          path: [...path],
          description: `Value ${value} already exists in tree`
        });
        break;
      }
    }

    return operations;
  }

  // Search for a value
  search(value: number): BSTOperation[] {
    const operations: BSTOperation[] = [];
    let current = this.root;
    const path: BSTNode[] = [];

    while (current) {
      path.push(current);
      operations.push({
        type: 'COMPARE',
        node: current,
        path: [...path],
        description: `Comparing ${value} with ${current.value}`
      });

      if (value === current.value) {
        operations.push({
          type: 'FOUND',
          node: current,
          path: [...path],
          description: `Found value ${value}`
        });
        return operations;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    operations.push({
      type: 'NOT_FOUND',
      node: null,
      path: [...path],
      description: `Value ${value} not found in tree`
    });
    return operations;
  }

  // Delete a node
  delete(value: number): BSTOperation[] {
    const operations: BSTOperation[] = [];
    // Call the actual delete function
    this.root = this.deleteNode(this.root, value, operations);
    return operations;
  }

  private deleteNode(node: BSTNode | null, value: number, operations: BSTOperation[]): BSTNode | null {
    if (!node) {
      operations.push({
        type: 'NOT_FOUND',
        node: null,
        path: [],
        description: `Value ${value} not found in tree`
      });
      return null;
    }

    operations.push({
      type: 'COMPARE',
      node: node,
      path: [node],
      description: `Comparing ${value} with ${node.value}`
    });

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value, operations);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value, operations);
    } else {
      // Node to delete found - add the special operation for highlighting
      operations.push({
        type: 'NODE_FOUND_FOR_DELETE',
        node: node,
        path: [node],
        description: `Found node ${value} to delete`
      });
      
      // Then add the regular delete operation
      operations.push({
        type: 'DELETE',
        node: node,
        path: [node],
        description: `Deleting node with value ${value}`
      });

      // Case 1: No children
      if (!node.left && !node.right) {
        return null;
      }
      
      // Case 2: One child
      if (!node.left) {
        const rightChild = node.right;
        if (rightChild) {
          operations.push({
            type: 'DELETE',
            node: rightChild,
            path: [node, rightChild],
            description: `Replacing ${node.value} with right child ${rightChild.value}`
          });
        }
        return node.right;
      }
      
      if (!node.right) {
        const leftChild = node.left;
        operations.push({
          type: 'DELETE',
          node: leftChild,
          path: [node, leftChild],
          description: `Replacing ${node.value} with left child ${leftChild.value}`
        });
        return node.left;
      }

      // Case 3: Two children
      const successor = this.findMin(node.right);
      operations.push({
        type: 'DELETE',
        node: successor,
        path: [node, successor],
        description: `Replacing ${node.value} with successor ${successor.value}`
      });
      
      node.value = successor.value;
      node.right = this.deleteNode(node.right, successor.value, operations);
    }

    return node;
  }

  private findMin(node: BSTNode): BSTNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Tree traversals
  inorder(): BSTOperation[] {
    const operations: BSTOperation[] = [];
    this.inorderTraversal(this.root, operations);
    return operations;
  }

  private inorderTraversal(node: BSTNode | null, operations: BSTOperation[]): void {
    if (node) {
      this.inorderTraversal(node.left, operations);
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`
      });
      this.inorderTraversal(node.right, operations);
    }
  }

  preorder(): BSTOperation[] {
    const operations: BSTOperation[] = [];
    this.preorderTraversal(this.root, operations);
    return operations;
  }

  private preorderTraversal(node: BSTNode | null, operations: BSTOperation[]): void {
    if (node) {
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`
      });
      this.preorderTraversal(node.left, operations);
      this.preorderTraversal(node.right, operations);
    }
  }

  postorder(): BSTOperation[] {
    const operations: BSTOperation[] = [];
    this.postorderTraversal(this.root, operations);
    return operations;
  }

  private postorderTraversal(node: BSTNode | null, operations: BSTOperation[]): void {
    if (node) {
      this.postorderTraversal(node.left, operations);
      this.postorderTraversal(node.right, operations);
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`
      });
    }
  }

  levelOrder(): BSTOperation[] {
    const operations: BSTOperation[] = [];
    if (!this.root) return operations;

    const queue: BSTNode[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`
      });

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return operations;
  }

  // Get tree structure for visualization
  getTreeStructure(): any {
    if (!this.root) return null;

    const buildNode = (node: BSTNode): any => ({
      name: node.value.toString(),
      children: [
        node.left ? buildNode(node.left) : null,
        node.right ? buildNode(node.right) : null
      ].filter(Boolean)
    });

    return buildNode(this.root);
  }
} 