import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { reset } from '@/redux/bstSlice';
import BSTVisualizer from '@/components/bst/BSTVisualizer';
import BSTController from '@/components/bst/BSTController';
import BSTCodeDisplay from '@/components/bst/BSTCodeDisplay';

const BSTPage: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.bst);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="bg-primary rounded-lg shadow-lg p-6">
          <BSTController />
        </div>
        <div className="bg-primary rounded-lg shadow-lg">
          <BSTCodeDisplay />
        </div>
        <div className="col-span-2">
          <div className="bg-primary rounded-lg shadow-lg p-6">
            <BSTVisualizer />
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default BSTPage;
