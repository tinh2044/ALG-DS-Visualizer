import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { reset } from '@/redux/avlTreeSlice';
import AVLTreeVisualizer from '@/components/avlTree/AVLTreeVisualizer';
import AVLTreeController from '@/components/avlTree/AVLTreeController';
import AVLTreeCodeDisplay from '@/components/avlTree/AVLTreeCodeDisplay';

const AVLTreePage: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.avlTree);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="bg-primary rounded-lg shadow-lg p-6">
          <AVLTreeController />
        </div>
        <div className="bg-primary rounded-lg shadow-lg">
          <AVLTreeCodeDisplay />
        </div>
        <div className="col-span-2 h-screen">
          <div className="bg-primary rounded-lg shadow-lg p-6 h-full">
            <AVLTreeVisualizer />
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

export default AVLTreePage; 