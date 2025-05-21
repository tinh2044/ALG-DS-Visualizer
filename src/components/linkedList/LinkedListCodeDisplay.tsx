import React from 'react';
import CodeDisplay from '@/components/common/CodeDisplay';
import { linkedListJS, linkedListTS, linkedListPython, linkedListCPP } from '@/configs/linkedList';

const LinkedListCodeDisplay: React.FC = () => {
  return (
    <CodeDisplay
      title="Linked List Implementation"
      jsCode={linkedListJS}
      tsCode={linkedListTS}
      cppCode={linkedListCPP}
      pythonCode={linkedListPython}
    />
  );
};

export default LinkedListCodeDisplay; 