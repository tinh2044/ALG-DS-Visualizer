/* eslint-disable @typescript-eslint/no-explicit-any */
import { AVLNode, AVLOperation } from '@/types/avlTree';

export class AVLTree {
  private root: AVLNode | null = null;

  constructor() {
    this.root = null;
  }

  getRoot(): AVLNode | null {
    return this.root;
  }

  setRoot(node: AVLNode | null): void {
    this.root = node;
  }

  // Get height of a node
  private height(node: AVLNode | null): number {
    if (node === null) return 0;
    return node.height;
  }

  // Get balance factor of a node
  private getBalanceFactor(node: AVLNode | null): number {
    if (node === null) return 0;
    return this.height(node.left) - this.height(node.right);
  }

  // Update height of a node
  private updateHeight(node: AVLNode): void {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  // Right rotation
  private rightRotate(y: AVLNode): AVLNode {
    const x = y.left as AVLNode;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    // Return new root
    return x;
  }

  // Left rotation
  private leftRotate(x: AVLNode): AVLNode {
    const y = x.right as AVLNode;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    // Return new root
    return y;
  }

  // Insert a new node
  insert(value: number): AVLOperation[] {
    const operations: AVLOperation[] = [];
    this.root = this.insertNode(this.root, value, operations, []);
    return operations;
  }

  private insertNode(node: AVLNode | null, value: number, operations: AVLOperation[], path: AVLNode[]): AVLNode {
    // Standard BST insertion
    if (node === null) {
      const newNode: AVLNode = { value, left: null, right: null, height: 1 };
      operations.push({
        type: 'INSERT',
        node: newNode,
        path: [...path],
        description: `Inserting node ${value}`,
        balanceFactor: 0
      });
      return newNode;
    }

    // Compare the current node value with the value to be inserted
    operations.push({
      type: 'COMPARE',
      node: node,
      path: [...path, node],
      description: `Comparing ${value} with ${node.value}`,
      balanceFactor: this.getBalanceFactor(node)
    });

    if (value < node.value) {
      node.left = this.insertNode(node.left, value, operations, [...path, node]);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value, operations, [...path, node]);
    } else {
      // Duplicate value
      operations.push({
        type: 'DUPLICATE',
        node: node,
        path: [...path, node],
        description: `Value ${value} already exists in tree`,
        balanceFactor: this.getBalanceFactor(node)
      });
      return node;
    }

    // Update height of current node
    this.updateHeight(node);
    
    // Log the height update
    operations.push({
      type: 'UPDATE_HEIGHT',
      node: node,
      path: [...path, node],
      description: `Updating height of node ${node.value} to ${node.height}`,
      balanceFactor: this.getBalanceFactor(node)
    });

    // Get the balance factor to check if this node became unbalanced
    const balance = this.getBalanceFactor(node);

    // Log the balance factor check
    operations.push({
      type: 'CHECK_BALANCE',
      node: node,
      path: [...path, node],
      description: `Checking balance factor of node ${node.value}: ${balance}`,
      balanceFactor: balance
    });

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Left-Left imbalance detected at node ${node.value}. Performing right rotation.`,
        rotationType: 'RIGHT',
        balanceFactor: balance
      });
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      operations.push({
        type: 'ROTATE',
        node: node.left as AVLNode,
        path: [...path, node, node.left as AVLNode],
        description: `Left-Right imbalance detected at node ${node.value}. Performing left rotation on left child first.`,
        rotationType: 'LEFT',
        balanceFactor: this.getBalanceFactor(node.left)
      });
      node.left = this.leftRotate(node.left as AVLNode);
      
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Completing Left-Right balance with right rotation on node ${node.value}.`,
        rotationType: 'RIGHT',
        balanceFactor: this.getBalanceFactor(node)
      });
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Right-Right imbalance detected at node ${node.value}. Performing left rotation.`,
        rotationType: 'LEFT',
        balanceFactor: balance
      });
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      operations.push({
        type: 'ROTATE',
        node: node.right as AVLNode,
        path: [...path, node, node.right as AVLNode],
        description: `Right-Left imbalance detected at node ${node.value}. Performing right rotation on right child first.`,
        rotationType: 'RIGHT',
        balanceFactor: this.getBalanceFactor(node.right)
      });
      node.right = this.rightRotate(node.right as AVLNode);
      
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Completing Right-Left balance with left rotation on node ${node.value}.`,
        rotationType: 'LEFT',
        balanceFactor: this.getBalanceFactor(node)
      });
      return this.leftRotate(node);
    }

    // No rebalance needed
    return node;
  }

  // Search for a value
  search(value: number): AVLOperation[] {
    const operations: AVLOperation[] = [];
    let current = this.root;
    const path: AVLNode[] = [];

    while (current) {
      path.push(current);
      operations.push({
        type: 'COMPARE',
        node: current,
        path: [...path],
        description: `Comparing ${value} with ${current.value}`,
        balanceFactor: this.getBalanceFactor(current)
      });

      if (value === current.value) {
        operations.push({
          type: 'FOUND',
          node: current,
          path: [...path],
          description: `Found value ${value}`,
          balanceFactor: this.getBalanceFactor(current)
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
      description: `Value ${value} not found in tree`,
      balanceFactor: 0
    });
    return operations;
  }

  // Delete a node
  delete(value: number): AVLOperation[] {
    const operations: AVLOperation[] = [];
    this.root = this.deleteNode(this.root, value, operations, []);
    return operations;
  }

  private deleteNode(node: AVLNode | null, value: number, operations: AVLOperation[], path: AVLNode[]): AVLNode | null {
    if (!node) {
      operations.push({
        type: 'NOT_FOUND',
        node: null,
        path: [...path],
        description: `Value ${value} not found in tree`,
        balanceFactor: 0
      });
      return null;
    }

    operations.push({
      type: 'COMPARE',
      node: node,
      path: [...path, node],
      description: `Comparing ${value} with ${node.value}`,
      balanceFactor: this.getBalanceFactor(node)
    });

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value, operations, [...path, node]);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value, operations, [...path, node]);
    } else {
      // Node to delete found
      operations.push({
        type: 'NODE_FOUND_FOR_DELETE',
        node: node,
        path: [...path, node],
        description: `Found node ${value} to delete`,
        balanceFactor: this.getBalanceFactor(node)
      });
      
      operations.push({
        type: 'DELETE',
        node: node,
        path: [...path, node],
        description: `Deleting node with value ${value}`,
        balanceFactor: this.getBalanceFactor(node)
      });

      // Case 1: No children or only one child
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      // Find the inorder successor (smallest in right subtree)
      const successor = this.findMin(node.right);
      operations.push({
        type: 'DELETE',
        node: successor,
        path: [...path, node, successor],
        description: `Replacing ${node.value} with successor ${successor.value}`,
        balanceFactor: this.getBalanceFactor(node)
      });
      
      // Copy the inorder successor's content to this node
      node.value = successor.value;
      
      // Delete the inorder successor
      node.right = this.deleteNode(node.right, successor.value, operations, [...path, node]);
    }

    if (node === null) {
      return null;
    }

    // Update height
    this.updateHeight(node);
    
    // Log height update
    operations.push({
      type: 'UPDATE_HEIGHT',
      node: node,
      path: [...path, node],
      description: `Updating height of node ${node.value} to ${node.height}`,
      balanceFactor: this.getBalanceFactor(node)
    });

    // Check balance
    const balance = this.getBalanceFactor(node);
    
    operations.push({
      type: 'CHECK_BALANCE',
      node: node,
      path: [...path, node],
      description: `Checking balance factor of node ${node.value}: ${balance}`,
      balanceFactor: balance
    });

    // Rebalance if needed - similar to insert method
    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Left-Left imbalance detected at node ${node.value}. Performing right rotation.`,
        rotationType: 'RIGHT',
        balanceFactor: balance
      });
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      operations.push({
        type: 'ROTATE',
        node: node.left as AVLNode,
        path: [...path, node, node.left as AVLNode],
        description: `Left-Right imbalance detected at node ${node.value}. Performing left rotation on left child first.`,
        rotationType: 'LEFT',
        balanceFactor: this.getBalanceFactor(node.left)
      });
      node.left = this.leftRotate(node.left as AVLNode);
      
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Completing Left-Right balance with right rotation on node ${node.value}.`,
        rotationType: 'RIGHT',
        balanceFactor: this.getBalanceFactor(node)
      });
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Right-Right imbalance detected at node ${node.value}. Performing left rotation.`,
        rotationType: 'LEFT',
        balanceFactor: balance
      });
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      operations.push({
        type: 'ROTATE',
        node: node.right as AVLNode,
        path: [...path, node, node.right as AVLNode],
        description: `Right-Left imbalance detected at node ${node.value}. Performing right rotation on right child first.`,
        rotationType: 'RIGHT',
        balanceFactor: this.getBalanceFactor(node.right)
      });
      node.right = this.rightRotate(node.right as AVLNode);
      
      operations.push({
        type: 'ROTATE',
        node: node,
        path: [...path, node],
        description: `Completing Right-Left balance with left rotation on node ${node.value}.`,
        rotationType: 'LEFT',
        balanceFactor: this.getBalanceFactor(node)
      });
      return this.leftRotate(node);
    }

    return node;
  }

  private findMin(node: AVLNode): AVLNode {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // Tree traversals
  inorder(): AVLOperation[] {
    const operations: AVLOperation[] = [];
    this.inorderTraversal(this.root, operations);
    return operations;
  }

  private inorderTraversal(node: AVLNode | null, operations: AVLOperation[]): void {
    if (node) {
      this.inorderTraversal(node.left, operations);
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`,
        balanceFactor: this.getBalanceFactor(node)
      });
      this.inorderTraversal(node.right, operations);
    }
  }

  preorder(): AVLOperation[] {
    const operations: AVLOperation[] = [];
    this.preorderTraversal(this.root, operations);
    return operations;
  }

  private preorderTraversal(node: AVLNode | null, operations: AVLOperation[]): void {
    if (node) {
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`,
        balanceFactor: this.getBalanceFactor(node)
      });
      this.preorderTraversal(node.left, operations);
      this.preorderTraversal(node.right, operations);
    }
  }

  postorder(): AVLOperation[] {
    const operations: AVLOperation[] = [];
    this.postorderTraversal(this.root, operations);
    return operations;
  }

  private postorderTraversal(node: AVLNode | null, operations: AVLOperation[]): void {
    if (node) {
      this.postorderTraversal(node.left, operations);
      this.postorderTraversal(node.right, operations);
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`,
        balanceFactor: this.getBalanceFactor(node)
      });
    }
  }

  levelOrder(): AVLOperation[] {
    const operations: AVLOperation[] = [];
    if (!this.root) return operations;

    const queue: AVLNode[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      operations.push({
        type: 'VISIT',
        node: node,
        path: [node],
        description: `Visiting node ${node.value}`,
        balanceFactor: this.getBalanceFactor(node)
      });

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return operations;
  }

  // Get tree structure for visualization
  getTreeStructure(): any {
    if (!this.root) return null;

    const buildNode = (node: AVLNode): any => ({
      name: node.value.toString(),
      height: node.height,
      balanceFactor: this.getBalanceFactor(node),
      children: [
        node.left ? buildNode(node.left) : null,
        node.right ? buildNode(node.right) : null
      ].filter(Boolean)
    });

    return buildNode(this.root);
  }
} 