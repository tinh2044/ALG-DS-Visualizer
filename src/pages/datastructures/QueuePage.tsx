import QueueVisualizer from '@/components/queue/QueueVisualizer';
import Controller from '@/components/queue/QueueController';
import QueueCodeDisplay from '@/components/queue/QueueCodeDisplay';
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

function QueuePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-2">
        <div className="flex items-center gap-2">
          <Title title="Queue Data Structure" />
          <Button
            isIconOnly
            variant="light"
            onPress={() => onOpen()}
            className="text-default-500"
          >
            <IoInformationCircleOutline size={30} />
          </Button>
        </div>
        <div className="flex items-start h-full gap-2 mt-2">
          <div className="flex flex-col gap-2 w-[60%] h-full">
            <Controller />
            <QueueVisualizer />
          </div>
          <div className="w-[40%] h-full flex items-center justify-center">
            <QueueCodeDisplay />
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold">About Queue Operations</h2>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">enqueue(x)</h3>
                    <p>Adds element x to the rear of the queue.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">dequeue()</h3>
                    <p>
                      Removes and returns the element from the front of the queue.
                    </p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">front() / peek()</h3>
                    <p>Returns the element at the front without removing it.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">isEmpty()</h3>
                    <p>Returns true if the queue is empty, false otherwise.</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h3 className="font-bold mb-2">size()</h3>
                    <p>Returns the number of elements in the queue.</p>
                  </CardBody>
                </Card>
              </div>

              <Divider className="my-6" />

              <h2 className="text-2xl font-bold mb-4">Applications of Queue</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>CPU scheduling and task management</li>
                <li>Print job management</li>
                <li>Breadth-First Search (BFS) in graphs</li>
                <li>Message queues in distributed systems</li>
                <li>Buffer management in network protocols</li>
                <li>Event handling in GUI applications</li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default QueuePage;
