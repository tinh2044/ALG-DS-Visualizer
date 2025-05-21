import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useTimer from '@/hooks/useTimer';
import { useEffect } from 'react';
import { Status } from '@/types/pathFinding';
import { 
  setPathLength, 
  setVisitedCellCount 
} from '@/redux/pathFinding/pathFindingSlice';
import { Chip } from '@heroui/chip';

const PathInfo = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pathFinding.status);
  const visitedCellCount = useAppSelector(
    (state) => state.pathFinding.visitedCellCount
  );
  const pathLength = useAppSelector((state) => state.pathFinding.pathLength);

  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  useEffect(() => {
    if (status === Status.Searching && !isRunning) {
      resetTimer();
      startTimer();
    }

    if (Status.Complete === status) {
      stopTimer();
    }

    if ([Status.Ready, Status.Generating].includes(status)) {
      resetTimer();
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
    }
  }, [status, startTimer, stopTimer, isRunning, resetTimer, dispatch]);

  return (
    <div className="hidden md:flex gap-3 items-center">
      <Chip color="secondary" variant="flat" data-testid="visits">
        Visits: {visitedCellCount}
      </Chip>
      
      <Chip color="success" variant="flat" data-testid="path">
        Path: {pathLength}
      </Chip>
      
      {time > 0 && (
        <Chip color="warning" variant="flat">
          Time: {time}s
        </Chip>
      )}
    </div>
  );
}

export default PathInfo;
