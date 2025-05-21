import React from 'react';
import { QueueCellProps } from '@/types/queue';
import { Card, CardBody } from '@heroui/card';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

const QueueCell: React.FC<QueueCellProps> = ({ 
  item, 
  isFirst, 
  isLast, 
  operation 
}) => {
  const getBgColor = () => {
    if (item.highlighted) return 'bg-warning-100 dark:bg-warning-500/30';
    
    return isLast ? 'bg-success-100 dark:bg-success-500/30' : isFirst ? 'bg-danger-100 dark:bg-danger-500/30' : '';
  };

  const getBorder = () => {
    if (item.highlighted) return 'border-warning border-2';
    
    switch (operation) {
      case 'enqueue':
        return isLast ? 'border-success border-2' : '';
      case 'dequeue':
        return isFirst ? 'border-danger border-2' : '';
      case 'peek':
        return isFirst ? 'border-secondary border-2' : '';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex items-center">
     
      <Card
        className={`w-12 h-12 m-1 flex items-center justify-center ${getBgColor()} ${getBorder()} transition-all duration-300`}
      >
        <CardBody className="p-0 flex items-center justify-center">
          <span className="text-xl font-bold">{item.value}</span>
        </CardBody>
      </Card>
     
      {isLast && (
        <div className="absolute -right-[100%] text-success flex items-center animate-pulse-arrow">
          <MdArrowBack className="text-success  z-10" size={25} />
          <span className="font-bold">Rear</span>
        </div>
      )}
      {isFirst && (
        <div className="absolute -left-[100%] text-danger flex items-center animate-pulse-arrow">
          <span className="font-bold">Front</span>
          <MdArrowForward className="text-danger  z-10" size={25} />
        </div>
      )}
    </div>
  );
};

export default QueueCell; 