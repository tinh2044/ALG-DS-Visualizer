import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { SyntaxHighlighter } from '@/components/common/SyntaxHighlighter';
import { queueJS, queueTS, queueCPP, queuePython } from '@/configs/queue';

const QueueCodeDisplay: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | number>('js');

  return (
    <Card className="mb-6 w-full">
      <CardHeader className="flex justify-between">
        <h3 className="text-lg font-semibold">Queue Implementation</h3>
      </CardHeader>
      <CardBody>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          color="secondary"
          variant="underlined"
          classNames={{
            base: 'w-full',
            tabList: 'rounded-md',
          }}
        >
          <Tab key="js" title="JavaScript">
            <div className="relative">
              <SyntaxHighlighter
                language="javascript" 
                code={queueJS}
              />
            </div>
          </Tab>
          <Tab key="ts" title="TypeScript">
            <div className="relative">
              <SyntaxHighlighter 
                language="typescript" 
                code={queueTS}
              />
            </div>
          </Tab>
          <Tab key="cpp" title="C++">
            <div className="relative">
              <SyntaxHighlighter 
                language="cpp" 
                code={queueCPP}
              />
            </div>
          </Tab>
          <Tab key="py" title="Python">
            <div className="relative">
              <SyntaxHighlighter 
                language="python" 
                code={queuePython}
              />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default QueueCodeDisplay; 