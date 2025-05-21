/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { nextOperation, stopAnimation } from '@/redux/avlTreeSlice';
import { AVL_TREE_CONFIG } from '@/configs/avlTree';
import { 
  getAnimationDuration, 
  getBalanceFactorColor,
} from '@/helpers/avlTree';
import { Tree } from 'react-d3-tree';
import { IoInformationCircleOutline } from 'react-icons/io5';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Divider
} from '@heroui/react';
import Title from '../Title';
import { useAppSelector } from '@/redux/hooks';

interface TreeNode {
  name: string;
  height: number;
  balanceFactor: number;
  children: TreeNode[];
}

const AVLTreeVisualizer: React.FC = () => {
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const { tree, operations, currentOperation, isAnimating, speed } = useAppSelector(
    (state: RootState) => state.avlTree
  );

  // Set dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationTimer: NodeJS.Timeout;

    if (isAnimating && currentOperation < operations.length - 1) {
      const currentOp = operations[currentOperation];
      const duration = getAnimationDuration(
        speed, 
        currentOp?.type === 'ROTATE'
      );
      
      animationTimer = setTimeout(() => {
        dispatch(nextOperation());
      }, duration);
    } else if (isAnimating && currentOperation >= operations.length - 1) {
      dispatch(stopAnimation());
    }

    return () => clearTimeout(animationTimer);
  }, [isAnimating, currentOperation, operations, dispatch, speed]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomNode = ({ nodeDatum }: any) => {
    let nodeColor = AVL_TREE_CONFIG.node.colors.default;
    let stroke = AVL_TREE_CONFIG.node.stroke;
    let balanceFactor = 0;
    
    if (operations.length > 0 && currentOperation < operations.length) {
      const currentOp = operations[currentOperation];
      
      if (currentOp.node && currentOp.node.value.toString() === nodeDatum.name) {
        switch (currentOp.type) {
          case 'FOUND':
            nodeColor = '#059669';
            break;
          case 'NODE_FOUND_FOR_DELETE':
          case 'DELETE':
            nodeColor = '#EF4444';
            break;
          case 'INSERT':
            nodeColor = '#10B981';
            break; 
          case 'ROTATE':
            nodeColor = '#8B5CF6';
            break;
          case 'COMPARE':
            nodeColor = '#3B82F6';
            break;
          case 'CHECK_BALANCE':
            nodeColor = Math.abs(currentOp.balanceFactor) > 1 ? '#EF4444' : '#10B981';
            break;
          default:
            nodeColor = AVL_TREE_CONFIG.node.colors.default;
        }
        
        balanceFactor = currentOp.balanceFactor;
      }
      
      if (currentOp.path && currentOp.path.some(pathNode => 
        pathNode.value.toString() === nodeDatum.name && pathNode.value !== currentOp.node?.value)) {
        stroke = { width: 3, color: '#3B82F6' };
      }
    }

    return (
      <g>
        <circle 
          r={AVL_TREE_CONFIG.node.radius} 
          fill={nodeColor}
          stroke={stroke.color}
          strokeWidth={stroke.width}
        />
        <text
          fill={AVL_TREE_CONFIG.node.text.color}
          textAnchor="middle"
          dy=".3em"
          fontWeight={AVL_TREE_CONFIG.node.text.weight}
          fontSize={AVL_TREE_CONFIG.node.text.size}
        >
          {nodeDatum.name}
        </text>
        
        <text
          fill={getBalanceFactorColor(balanceFactor)}
          textAnchor="middle"
          dy="1.7em"
          dx="-2em"
          fontSize={14}
        >
          h:{nodeDatum.height || 0}
        </text>
        <text
          fill={getBalanceFactorColor(balanceFactor)}
          textAnchor="middle"
          dy="1.7em"
          dx="2em"
          fontSize={14}
          fontWeight={Math.abs(balanceFactor) > 1 ? 'bold' : 'normal'}
        >
          bf:{balanceFactor}
        </text>
      </g>
    );
  };

  const treeData = React.useMemo(() => {
    if (!tree) return { name: '', children: [] };
    
    const transform = (node: any): TreeNode => ({
      name: node.value.toString(),
      height: node.height,
      balanceFactor: node.balanceFactor,
      children: [
        node.left ? transform(node.left) : null,
        node.right ? transform(node.right) : null
      ].filter(Boolean) as TreeNode[]
    });
    
    return transform(tree);
  }, [tree]);

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="flex items-center gap-2 mb-4">
        <Title title='AVL Tree Visualization'/>
        <Button
          isIconOnly
          variant="light"
          onPress={onOpen}
          className="text-default-500"
        >
          <IoInformationCircleOutline size={30} />
        </Button>
      </div>
      
      {tree ? (
        <Tree
          data={treeData}
          orientation={AVL_TREE_CONFIG.tree.orientation}
          translate={{
            x: dimensions.width / 2,
            y: dimensions.height / 4,
          }}
          separation={AVL_TREE_CONFIG.tree.separation}
          nodeSize={AVL_TREE_CONFIG.tree.nodeSize}
          pathFunc={AVL_TREE_CONFIG.tree.pathFunc}
          renderCustomNodeElement={renderCustomNode}
          transitionDuration={getAnimationDuration(
            speed,
            operations[currentOperation]?.type === 'ROTATE'
          )}
          branchNodeClassName='!text-white'
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 dark:text-gray-600">
            Use the controls to build an AVL tree
          </p>
        </div>
      )}
      
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-2xl font-bold">
              About AVL Tree Operations
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">insert(x)</h3>
                  <p>
                    Adds a new node with value x to the appropriate position in
                    the tree, then rebalances the tree if needed.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">search(x)</h3>
                  <p>Searches for a node with value x in the tree.</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">delete(x)</h3>
                  <p>
                    Removes the node with value x from the tree and rebalances if necessary.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">rotateLeft(node)</h3>
                  <p>
                    Performs a left rotation at the specified node to balance the tree.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">rotateRight(node)</h3>
                  <p>
                    Performs a right rotation at the specified node to balance the tree.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">getBalanceFactor(node)</h3>
                  <p>
                    Returns the height difference between left and right subtrees.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">Traversals</h3>
                  <p>Inorder, Preorder, Postorder, and Level Order traversal methods.</p>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-6" />

            <h2 className="text-2xl font-bold mb-4">
              Properties of AVL Trees
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Self-balancing binary search tree where the difference in heights of 
                left and right subtrees cannot exceed 1
              </li>
              <li>
                Each node stores a balance factor (difference between heights of left and right subtrees)
              </li>
              <li>Balance factor must be -1, 0, or 1 for all nodes</li>
              <li>All BST properties apply (left child &lt; node &lt; right child)</li>
              <li>Tree height is guaranteed to be O(log n) for n nodes</li>
              <li>Operations maintain balance via rotations</li>
            </ul>

            <Divider className="my-6" />

            <h2 className="text-2xl font-bold mb-4">
              Rotation Types
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Left Rotation:</strong> Used when right subtree becomes heavier (balance factor &lt; -1)</li>
              <li><strong>Right Rotation:</strong> Used when left subtree becomes heavier (balance factor &gt; 1)</li>
              <li><strong>Left-Right Rotation:</strong> Used when left subtree has a heavier right subtree</li>
              <li><strong>Right-Left Rotation:</strong> Used when right subtree has a heavier left subtree</li>
            </ul>

            <Divider className="my-6" />

            <h2 className="text-2xl font-bold mb-4">
              Applications of AVL Trees
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Database systems requiring fast lookups, insertions, and deletions</li>
              <li>Memory management systems</li>
              <li>Optimal scenarios where lookups are more frequent than insertions/deletions</li>
              <li>In-memory dictionaries and sets with guaranteed performance</li>
              <li>File systems and directory structures</li>
              <li>Symbol tables in compilers requiring strict performance guarantees</li>
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AVLTreeVisualizer;