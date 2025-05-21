import React, { useCallback, useState } from 'react';
import { Tabs, Tab } from '@heroui/react';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@heroui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

import Title from '@/components/Title';
import LinkedListVisualizer from '@/components/linkedList/LinkedListVisualizer';
import LinkedListController from '@/components/linkedList/LinkedListController';
import LinkedListCodeDisplay from '@/components/linkedList/LinkedListCodeDisplay';

import { useAppDispatch } from '@/redux/hooks';
import { resetLinkedList } from '@/redux/linkedListSlice';
import { showSuccessToast, showErrorToast } from '@/helpers/toast';

const LinkedListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<string>('visualization');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onClearList = useCallback(() => {
    dispatch(resetLinkedList());
    showSuccessToast('Linked list cleared successfully');
  }, [dispatch]);

  const onOperationComplete = useCallback(
    (operation: string, success: boolean, message?: string) => {
      if (success) {
        showSuccessToast(`${operation} operation completed successfully`);
      } else {
        showErrorToast(message || `${operation} operation failed`);
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-2">
        <div className="flex items-center gap-2">
          <Title title="Linked List Visualization" />
          <Button
            isIconOnly
            variant="light"
            onPress={() => onOpen()}
            className="text-default-500"
          >
            <IoInformationCircleOutline size={30} />
          </Button>
        </div>

        <div className="mt-4">
          <Tabs
            aria-label="Linked List Tabs"
            color="secondary"
            variant="underlined"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            <Tab key="visualization" title="Visualization">
              <div className="mt-4">
                <div className="flex flex-col gap-6">
                  <LinkedListController
                    onClearList={onClearList}
                    onOperationComplete={onOperationComplete}
                  />
                  <LinkedListVisualizer />
                </div>
              </div>
            </Tab>
            <Tab key="code" title="Code Implementation">
              <LinkedListCodeDisplay />
            </Tab>
          </Tabs>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold">About Linked List Operations</h2>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Insertion</h3>
                    <p>Add a new node at the beginning, end, or after a specific node.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Deletion</h3>
                    <p>Remove a node from the beginning, end, or a specific position.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Search</h3>
                    <p>Find a node with a specific value in the list.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Traversal</h3>
                    <p>Visit each node in the list sequentially.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Length</h3>
                    <p>Count the number of nodes in the list.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Reverse</h3>
                    <p>Reverse the order of nodes in the list.</p>
                  </CardBody>
                </Card>
              </div>

              <Divider className="my-6" />

              <h2 className="text-2xl font-bold mb-4">Types of Linked Lists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Singly Linked List</h3>
                    <p>Each node points to the next node in the sequence.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">Doubly Linked List</h3>
                    <p>Each node points to both the next and previous nodes.</p>
                  </CardBody>
                </Card>
              </div>

              <h2 className="text-2xl font-bold mb-4">Applications of Linked Lists</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implementation of stacks and queues</li>
                <li>Dynamic memory allocation</li>
                <li>Undo functionality in software</li>
                <li>Browser history (back/forward navigation)</li>
                <li>Polynomial arithmetic</li>
                <li>Hash table collision resolution</li>
                <li>Implementation of adjacency lists for graphs</li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default LinkedListPage;
