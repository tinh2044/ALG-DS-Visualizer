import React from 'react';
import CodeDisplay from '@/components/common/CodeDisplay';
import { stackJS, stackTS, stackCPP, stackPython } from '@/configs/stack';

const StackCodeDisplay: React.FC = () => {
  return (
    <CodeDisplay
      title="Stack Implementation"
      jsCode={stackJS}
      tsCode={stackTS}
      cppCode={stackCPP}
      pythonCode={stackPython}
    />
  );
};

export default StackCodeDisplay; 