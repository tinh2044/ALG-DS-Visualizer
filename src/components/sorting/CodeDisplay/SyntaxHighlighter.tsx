import { useTheme } from 'next-themes';
import React from 'react';
import { Prism as SyntaxHighlighterLib } from 'react-syntax-highlighter';
import {

  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  activeLines: number[];
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language,
  activeLines = [],
}) => {
  const lineProps = (lineNumber: number) => {
    const style: React.CSSProperties = {
      display: 'block',
      width: '100%',
    };
    
    if (activeLines.includes(lineNumber)) {
      style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
      style.borderLeft = '3px solid #f7df1e';
    }
    
    return { style };
  };
  const { resolvedTheme } = useTheme();


  return (
    <div className="syntax-highlighter rounded w-fit">
      <SyntaxHighlighterLib
        language={language}
        style={resolvedTheme === 'light' ? oneDark : oneLight}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={lineProps}
        customStyle={{
          margin: "0",
          borderRadius: ")"
        }}
      >
        {code}
      </SyntaxHighlighterLib>
    </div>
  );
};
