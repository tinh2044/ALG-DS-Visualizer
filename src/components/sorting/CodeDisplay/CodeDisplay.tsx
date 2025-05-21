import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { copyToClipboard } from '@/helpers/clipboard';

interface CodeDisplayProps {
  algoName: string;
  sourceCode: string;
  highlightState: {
    swaps: number[];
    highlights: number[];
    sorts: number[];
    pivot: number;
  };
  lineMapping: {
    swap: Record<string, number[]>;
    highlight: Record<string, number[]>;
    sort: Record<string, number[]>;
    pivot: Record<string, number[]>;
  };
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  algoName, 
  sourceCode, 
  highlightState,
  lineMapping 
}) => {
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const currentArray = useAppSelector(state => state.sorting.array);
  const isPlaying = useAppSelector(state => state.sorting.isPlaying);
  
  const formattedCode = sourceCode.replace(/\[INPUT_ARRAY\]/g, JSON.stringify(currentArray));
  
  useEffect(() => {
    if (!isPlaying) {
      setActiveLines([]);
      return;
    }

    const newActiveLines: number[] = [];
    
    if (highlightState.swaps[0] !== -1 && highlightState.swaps[1] !== -1) {
      const key = `${highlightState.swaps[0]}_${highlightState.swaps[1]}`;
      if (lineMapping.swap[key]) {
        newActiveLines.push(...lineMapping.swap[key]);
      }
    }
    
    if (highlightState.highlights[0] !== -1 && highlightState.highlights[1] !== -1) {
      const key = `${highlightState.highlights[0]}_${highlightState.highlights[1]}`;
      if (lineMapping.highlight[key]) {
        newActiveLines.push(...lineMapping.highlight[key]);
      } else if (lineMapping.highlight.default) {
        newActiveLines.push(...lineMapping.highlight.default);
      }
    }
    
    highlightState.sorts.forEach(sortedIndex => {
      if (lineMapping.sort[sortedIndex]) {
        newActiveLines.push(...lineMapping.sort[sortedIndex]);
      } else if (lineMapping.sort.default) {
        newActiveLines.push(...lineMapping.sort.default);
      }
    });
    
    if (highlightState.pivot !== -1 && lineMapping.pivot[highlightState.pivot]) {
      newActiveLines.push(...lineMapping.pivot[highlightState.pivot]);
    } else if (highlightState.pivot !== -1 && lineMapping.pivot.default) {
      newActiveLines.push(...lineMapping.pivot.default);
    }
    
    setActiveLines([...new Set(newActiveLines)]);
  }, [highlightState, isPlaying, lineMapping]);

  const handleCopyCode = () => {
    copyToClipboard(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-display-container rounded-lg overflow-hidden border border-primary/10 bg-secondary/10 shadow-md w-fit relative">
      <div className="flex items-center justify-between p-2 bg-secondary">
        <div className="font-medium text-primary">
          {algoName.charAt(0).toUpperCase() + algoName.slice(1)} Sort Algorithm 
        </div>
        <button
          onClick={handleCopyCode}
          className="px-3 py-1 text-xs bg-primary hover:bg-primary/80 text-secondary rounded transition-colors"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div className="overflow-auto">
        <SyntaxHighlighter 
          code={formattedCode} 
          language="javascript" 
          activeLines={activeLines}
        />
      </div>
    </div>
  );
};

export default CodeDisplay;
