import React from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface LinkedListCellProps {
  value: string | number;
  isHighlighted?: boolean;
  isLast?: boolean;
}

const LinkedListCell: React.FC<LinkedListCellProps> = ({ 
  value, 
  isHighlighted = false,
  isLast = false 
}) => {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          flex items-center justify-center 
          min-w-[70px] min-h-[70px] 
          rounded-md border-2 
          ${isHighlighted 
            ? 'bg-warning-200 border-warning-500 dark:bg-warning-400 dark:border-warning-600' 
            : 'bg-default-100 border-default-300 dark:bg-content1 dark:border-content3'
          }
          text-xl font-semibold transition-colors duration-300
          
        `}
      >
        {value}
      </motion.div>
      
      {!isLast && (
        <div className="mx-2">
          <BiRightArrow 
            size={24} 
            className="text-default-500 dark:text-default-400 animate-pulse-arrow" 
          />
        </div>
      )}
    </div>
  );
};

export default LinkedListCell; 