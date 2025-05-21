import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MazeControls from '@/components/pathFinding/MazeControls';
import PathControls from '@/components/pathFinding/PathControls';
import PathInfo from '@/components/pathFinding/PathInfo';
import { defaultSpeeds } from '@/configs/pathFinding';
import { getDimensionsFromScreenSize } from '@/helpers/pathFinding/grid';
import { resetGrid, setDimension } from '@/redux/pathFinding/pathFindingSlice';
import { useDebounce, useWindowSize } from 'react-use';
import { Card } from '@heroui/card';

import Grid from './Grid';

const Visualizer = ({
  algorithm,
  buttonText,
}: {
  algorithm: string;
  buttonText: string;
  }) => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.pathFinding.rows);
  const cols = useAppSelector((state) => state.pathFinding.cols);

  
  const { width, height } = useWindowSize();
  const defaultSpeed: number =
    width < 768 ? defaultSpeeds.mobile : defaultSpeeds.desktop;

  useDebounce(
    () => {
      const maxDimension = getDimensionsFromScreenSize();
      if (maxDimension.maxRows === rows && maxDimension.maxCols === cols) {
        return;
      }

      dispatch(
        setDimension({ rows: maxDimension.maxRows, cols: maxDimension.maxCols })
      );
      dispatch(resetGrid());
    },
    333,
    [width, height]
  );
  return (
    <div>
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <MazeControls />
          <PathInfo />
          <PathControls
            defaultSpeed={defaultSpeed}
            algorithm={algorithm}
            buttonText={buttonText}
          />
        </div>
      </Card>
      <div className="mt-6 flex justify-center">
        <Grid />
      </div>
    </div>
  );
};

export default Visualizer;
