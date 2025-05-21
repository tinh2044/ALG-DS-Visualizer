/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tree from 'react-d3-tree';
import { RootState } from '@/redux/store';
import { BST_CONFIG } from '@/configs/bst';
import { convertToD3Tree, getNodeColor } from '@/helpers/bst';
import { nextOperation } from '@/redux/bstSlice';
import Title from '../Title';
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

const BSTVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { tree, operations, currentOperation, isAnimating, speed } = useSelector((state: RootState) => state.bst);
  const treeData = convertToD3Tree(tree);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  useEffect(() => {
    if (isAnimating) {
      const animationSpeed = 1000 / speed;
      const interval = setInterval(() => {
        dispatch(nextOperation());
      }, animationSpeed);
      
      return () => clearInterval(interval);
    }
  }, [isAnimating, dispatch, speed, currentOperation]);

  const renderCustomNode = ({ nodeDatum }: any) => {
    const currentOp = operations[currentOperation];
    const isActive = currentOp?.node?.value === parseInt(nodeDatum.name);
    const isInPath = currentOp?.path.some(n => n.value === parseInt(nodeDatum.name));

    const nodeColor = isActive 
      ? getNodeColor(currentOp.type)
      : isInPath
        ? BST_CONFIG.node.colors.highlight
        : BST_CONFIG.node.colors.default;

    return (
      <g>
        <circle
          r={BST_CONFIG.node.radius}
          fill={nodeColor}
          stroke={BST_CONFIG.node.stroke.color}
          strokeWidth={BST_CONFIG.node.stroke.width}
        />
        <text
          dy=".31em"
          x={0}
          className='!text-primary'
          textAnchor="middle"
          color="#FFFFFF"
          fill='#FFFFFF'
          fontSize={BST_CONFIG.node.text.size}
          fontWeight={BST_CONFIG.node.text.weight}
        >
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (tree && !tree.left && !tree.right) {
        setTranslate({ x: 100, y: height / 8 });
      } else {
        setTranslate({ x: width / 2, y: height / 8 });
      }
    }
  }, [tree]);

  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });

  return (
    <div ref={containerRef} className="w-full h-screen relative">
      <div className="absolute top-0 left-0 flex items-center gap-2">
        <Title title="Binary Search Tree" />
        <Button
          isIconOnly
          variant="light"
          onPress={() => onOpen()}
          className="text-default-500"
        >
          <IoInformationCircleOutline size={30} />
        </Button>
      </div>
      {treeData && (
        <Tree
          data={treeData}
          orientation={BST_CONFIG.tree.orientation}
          translate={translate}
          pathFunc={BST_CONFIG.tree.pathFunc}
          separation={BST_CONFIG.tree.separation}
          nodeSize={BST_CONFIG.tree.nodeSize}
          transitionDuration={BST_CONFIG.tree.transitionDuration}
          renderCustomNodeElement={renderCustomNode}
          zoomable={true}
          draggable={true}
          collapsible={false}
          leafNodeClassName="!text-primary"
          rootNodeClassName="!text-primary"
          branchNodeClassName="!text-primary"
        />
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
              About Binary Search Tree Operations
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">insert(x)</h3>
                  <p>
                    Adds a new node with value x to the appropriate position in
                    the tree.
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
                    Removes the node with value x from the tree if it exists.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">inorder()</h3>
                  <p>
                    Traverses the tree in the order: left subtree, root, right
                    subtree.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">preorder()</h3>
                  <p>
                    Traverses the tree in the order: root, left subtree, right
                    subtree.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">postorder()</h3>
                  <p>
                    Traverses the tree in the order: left subtree, right
                    subtree, root.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="font-bold mb-2">levelorder()</h3>
                  <p>Traverses the tree level by level, from top to bottom.</p>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-6" />

            <h2 className="text-2xl font-bold mb-4">
              Properties of Binary Search Tree
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All nodes in the left subtree have values less than the root
                node
              </li>
              <li>
                All nodes in the right subtree have values greater than the root
                node
              </li>
              <li>Both left and right subtrees are also binary search trees</li>
              <li>No duplicate values allowed in standard BST</li>
            </ul>

            <Divider className="my-6" />

            <h2 className="text-2xl font-bold mb-4">
              Applications of Binary Search Trees
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Database indexing and searching</li>
              <li>Priority queues implementation</li>
              <li>Expression evaluation</li>
              <li>Dictionary operations (insertion, deletion, lookup)</li>
              <li>File system organization</li>
              <li>Symbol tables in compilers</li>
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BSTVisualizer; 