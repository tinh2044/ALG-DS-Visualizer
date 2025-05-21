import React from 'react';
import StackController from '@/components/stack/StackController';
import StackVisualizer from '@/components/stack/StackVisualizer';
import StackCodeDisplay from '@/components/stack/StackCodeDisplay';
import Title from '@/components/Title';
import { Card, CardBody, Divider } from '@heroui/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@heroui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

const StackPage: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-2">
        <div className="flex items-center gap-2">
          <Title title="Stack Data Structure" />
          <Button
            isIconOnly
            variant="light"
            onPress={() => onOpen()}
            className="text-default-500"
          >
            <IoInformationCircleOutline size={30} />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col gap-4">
            <StackController />
            <StackCodeDisplay />
          </div>

          <StackVisualizer />
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold">About Stack Operations</h2>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">push(x)</h3>
                    <p>Adds element x to the top of the stack.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">pop()</h3>
                    <p>
                      Removes and returns the element at the top of the stack.
                    </p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">peek() / top()</h3>
                    <p>Returns the element at the top without removing it.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">isEmpty()</h3>
                    <p>Returns true if the stack is empty, false otherwise.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">size()</h3>
                    <p>Returns the number of elements in the stack.</p>
                  </CardBody>
                </Card>
              </div>

              <Divider className="my-6" />

              <h2 className="text-2xl font-bold mb-4">Applications of Stack</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expression evaluation and conversion (infix to postfix)</li>
                <li>Backtracking algorithms</li>
                <li>Function call management (call stack)</li>
                <li>Undo/Redo operations in editors</li>
                <li>Browser history (back button functionality)</li>
                <li>Balanced parentheses checking in compilers</li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default StackPage;
