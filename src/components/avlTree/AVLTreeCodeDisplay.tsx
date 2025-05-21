import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { formatOperationDescription } from '@/helpers/avlTree';
import { AVLOperation } from '@/types/avlTree';

const AVLTreeCodeDisplay: React.FC = () => {
  const { operations, currentOperation } = useSelector((state: RootState) => state.avlTree);
  const currentOp = operations[currentOperation];
  
  // Display information about the tree building process
  const renderBuildProgress = () => {
    if (!currentOp || !currentOp.node) return null;
    
    const insertOps = operations.filter(op => op.type === 'INSERT');
    const currentInsertIndex = operations.slice(0, currentOperation + 1)
      .filter(op => op.type === 'INSERT').length;
    
    return (
      <div className="mt-4">
        <h4 className="text-md font-medium dark:text-white mb-2">Operation Progress:</h4>
        <div className="bg-primary-500 p-3 rounded-md">
          {currentOp.type === 'INSERT' && (
            <div className="flex items-center">
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(currentInsertIndex / insertOps.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{currentInsertIndex}/{insertOps.length}</span>
            </div>
          )}
          
          {currentOp && currentOp.node && (
            <p className="mt-2 text-sm">
              {getOperationMessage(currentOp)}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Get appropriate message for operation type
  const getOperationMessage = (op: AVLOperation): string => {
    switch(op.type) {
      case 'INSERT':
        return `Inserting node with value ${op.node?.value}`;
      case 'COMPARE':
        return `Comparing with node ${op.node?.value}`;
      case 'FOUND':
        return `Found value ${op.node?.value}`;
      case 'NOT_FOUND':
        return `Value not found in tree`;
      case 'DELETE':
        return `Deleting node with value ${op.node?.value}`;
      case 'VISIT':
        return `Visiting node ${op.node?.value}`;
      case 'UPDATE_HEIGHT':
        return `Updating height of node ${op.node?.value} to ${op.node?.height}`;
      case 'CHECK_BALANCE':
        return `Balance factor of node ${op.node?.value} is ${op.balanceFactor}`;
      case 'ROTATE':
        return `${op.rotationType} rotation at node ${op.node?.value}`;
      default:
        return op.description;
    }
  };

  const renderSearchPath = () => {
    if (!currentOp || !operations || operations.length === 0) return null;
    
    // Only show for search operations
    if (!['COMPARE', 'FOUND', 'NOT_FOUND'].includes(currentOp.type)) return null;
    
    // Find the most recent INSERT operation before the current operation
    let lastInsertIndex = -1;
    for (let i = currentOperation - 1; i >= 0; i--) {
      if (operations[i].type === 'INSERT') {
        lastInsertIndex = i;
        break;
      }
    }
    
    const searchPath = operations.slice(lastInsertIndex + 1, currentOperation + 1)
      .filter(op => ['COMPARE', 'FOUND', 'NOT_FOUND'].includes(op.type));
    
    if (searchPath.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-md font-medium mb-2">
          Search Path:
        </h4>
        <div className="bg-primary-500 rounded-md">
          <ul className="list-disc pl-3 space-y-1">
            {searchPath.map((op, index) => (
              <li
                key={index}
                className={`${
                  index === searchPath.length - 1
                    ? 'font-bold text-blue-600 dark:text-blue-400'
                    : ''
                }`}
              >
                {op.node
                  ? `Compare ${currentOp.node?.value} with node ${
                      op.node.value
                    } ${getComparisonResult(op)}`
                  : 'Value not found in tree'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  const getComparisonResult = (op: AVLOperation) => {
    if (op.type === 'FOUND') return '(FOUND!)';
    if (op.type === 'NOT_FOUND') return '(NOT FOUND)';
    
    if (op.description.includes('left')) return '→ go left';
    if (op.description.includes('right')) return '→ go right';
    return '';
  };
  
  // Render rotation information when applicable
  const renderRotationInfo = () => {
    if (!currentOp || !operations || operations.length === 0) return null;
    
    // Only show for rotation operations
    if (currentOp.type !== 'ROTATE') return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-md font-medium mb-2">Rotation Info:</h4>
        <div className="bg-primary-500 p-3 rounded-md">
          <p className="font-medium">
            {currentOp.rotationType === 'LEFT' ? 'Left Rotation' : 'Right Rotation'}
          </p>
          <p className="mt-1 text-sm">
            Balance factor before rotation: {currentOp.balanceFactor}
          </p>
          <p className="mt-1 text-sm">
            {currentOp.description}
          </p>
        </div>
      </div>
    );
  };

  if (!currentOp) {
    return (
      <div className="p-4 bg-primary-500 rounded-lg">
        <p className="text-foreground">No operation in progress</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white ml-2">Current Operation</h3>
      <div className="p-4 bg-primary-500 rounded-lg">
        <p className="text-gray-800 dark:text-gray-200">
          {formatOperationDescription(currentOp)}
        </p>
        
        {renderBuildProgress()}
        {renderSearchPath()}
        {renderRotationInfo()}
      </div>
    </div>
  );
};

export default AVLTreeCodeDisplay; 