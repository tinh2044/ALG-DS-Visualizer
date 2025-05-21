import React from 'react';
import { StackCellProps } from '@/types/stack';
import { Card } from '@heroui/card';
import {MdArrowForward } from 'react-icons/md';

const StackCell: React.FC<StackCellProps> = ({ item, isTop, operation }) => {
  // Generate classNames based on stack operation and state
  const getColorClass = () => {
    if (item.highlighted) {
      return "bg-warning-100 border-warning-300 dark:bg-warning-900 dark:border-warning-700";
    } else if (isTop) {
      if (operation === 'push') {
        return "bg-success-100 border-success-300 dark:bg-success-900 dark:border-success-700";
      } else if (operation === 'pop') {
        return "bg-danger-100 border-danger-300 dark:bg-danger-900 dark:border-danger-700";
      } else if (operation === 'peek') {
        return "bg-primary-100 border-primary-300 dark:bg-primary-900 dark:border-primary-700";
      }
      return 'bg-success-100 border-success-300 dark:bg-success-900 dark:border-success-700';
    }
    return "bg-card border-card-border";
  };

  // Get animation classes
  const getAnimationClass = () => {
    if (isTop) {
      if (operation === 'push' || operation === 'peek') {
        return "scale-105";
      } else if (operation === 'pop') {
        return "opacity-50";
      }
    }
    return "";
  };
  
  return (
    <div className="w-full mb-2 relative">
      <Card
        className={`flex items-center justify-center p-3 font-mono transition-all duration-300 border-2 ${getColorClass()} ${getAnimationClass()}`}
      >
        {item.value}
      </Card>
      
      {isTop && (
        <div className="absolute -left-[40%] top-[30%] flex items-center z-10 animate-pulse-arrow">
          <span className="ml-2 text-sm font-medium text-danger whitespace-nowrap">Top of Stack</span>
          <MdArrowForward className="text-danger text-lg" />
        </div>
      )}
    </div>
  );
};

export default StackCell; 