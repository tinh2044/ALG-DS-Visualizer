import React, { useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { SyntaxHighlighter } from '@/components/common/SyntaxHighlighter';

interface CodeDisplayProps {
  title: string;
  jsCode: string;
  tsCode: string;
  cppCode: string;
  pythonCode: string;
  className?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  jsCode,
  tsCode,
  cppCode,
  pythonCode,
  className = '',
}) => {
  const [selectedTab, setSelectedTab] = useState<string | number>('js');

  return (
    <Card className={`mb-6 ${className}`}>
      
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
                code={jsCode}
                language="javascript"
              />
            </div>
          </Tab>
          <Tab key="ts" title="TypeScript">
            <div className="relative">
              <SyntaxHighlighter 
                code={tsCode}
                language="typescript"
              />
            </div>
          </Tab>
          <Tab key="cpp" title="C++">
            <div className="relative">
              <SyntaxHighlighter 
                code={cppCode}
                language="cpp"
              />
            </div>
          </Tab>
          <Tab key="py" title="Python">
            <div className="relative">
              <SyntaxHighlighter 
                code={pythonCode}
                language="python"
              />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CodeDisplay; 