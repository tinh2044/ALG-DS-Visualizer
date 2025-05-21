import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighterLib } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@heroui/react';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import { copyToClipboard } from '@/helpers/clipboard';
import { showSuccessToast } from '@/helpers/toast';

import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';

SyntaxHighlighterLib.registerLanguage('javascript', js);
SyntaxHighlighterLib.registerLanguage('typescript', typescript);
SyntaxHighlighterLib.registerLanguage('python', python);
SyntaxHighlighterLib.registerLanguage('cpp', cpp);


interface SyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  onCopy?: () => void;
  customStyle?: React.CSSProperties;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language,
  onCopy,
  customStyle,
}) => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const getTheme = () => {
    return resolvedTheme === 'light' ? oneLight : oneDark;
  };

  const handleCopy = () => {
    copyToClipboard(code);
    showSuccessToast('Code copied to clipboard!');
    
    if (onCopy) {
      onCopy();
    }
    
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const defaultStyle = {
    margin: 0,
    padding: '1rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    lineHeight: 1.7,
    backgroundColor: 'var(--colors-content1)',
  };

  return (


    <div className="relative">
      <SyntaxHighlighterLib
        language={language}
        style={getTheme()}
        showLineNumbers={true}
        customStyle={{
          ...defaultStyle,
          ...customStyle,
        }}
        // lineNumberStyle={{
        //   color: 'var(--colors-default-400)',
        // }}
      >
        {code}
      </SyntaxHighlighterLib>
      
      <Button
        isIconOnly
        color={copied ? "success" : "primary"}
        variant="flat"
        className="absolute top-2 right-2"
        onPress={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <MdCheck /> : <MdContentCopy />}
      </Button>
    </div>
  );
};

export default SyntaxHighlighter; 