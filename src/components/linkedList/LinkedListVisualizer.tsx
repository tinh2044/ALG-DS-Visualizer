import React from 'react';
import { Card, CardBody, Chip } from '@heroui/react';
import { AnimatePresence } from 'framer-motion';
import LinkedListCell from './LinkedListCell';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { LinkedListNode } from '@/types/linkedList';

const LinkedListVisualizer: React.FC = () => {
  const { nodes } = useAppSelector((state: RootState) => state.linkedList);

  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Linked List Visualization</h2>
            <Chip color="primary">{nodes.length} node(s)</Chip>
          </div>
          
          <div className="py-8 overflow-x-auto">
            {nodes.length > 0 ? (
              <div className="flex flex-wrap items-center">
                <AnimatePresence>
                  {nodes.map((node : LinkedListNode, index : number) => (
                    <LinkedListCell
                      key={node.id}
                      value={node.value}
                      isHighlighted={node.highlighted}
                      isLast={index === nodes.length - 1}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center py-12 text-default-400 dark:text-default-500">
                Empty list. Add nodes to visualize.
              </div>
            )}
          </div>
          
          <div className="mt-2 text-sm text-default-400 dark:text-default-500">
            <p>
              <span className="font-medium">Head: </span>
              {nodes.length > 0 ? String(nodes[0].value) : 'null'}
            </p>
            <p>
              <span className="font-medium">Tail: </span>
              {nodes.length > 0 ? String(nodes[nodes.length - 1].value) : 'null'}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default LinkedListVisualizer; 