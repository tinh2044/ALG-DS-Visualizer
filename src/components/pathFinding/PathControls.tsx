/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Play, RefreshCcw } from 'lucide-react';
import { pathFindings } from '@/algorithms';
import { Status } from '@/types/pathFinding';
import { highlightPath } from '@/redux/pathFinding/pathThunk';
import { searchPath } from '@/redux/pathFinding/searchThunk';
import {
  clearGrid,
  setGrid,
  setPathLength,
  setStatus,
  setVisitedCellCount,
} from '@/redux/pathFinding/pathFindingSlice';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/react';
import { speeds } from '@/configs/pathFinding';
import { useEffect, useState } from 'react';
import { showErrorToast } from '@/helpers/toast';

interface Props {
  defaultSpeed: number;
  algorithm: string;
  buttonText?: string; 
}

const PathControls = ({
  algorithm,
  buttonText = 'Visualize',
}: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pathFinding.status);
  const [speed, setSpeed] = useState<number | null>(null);

  const pathFindingAlg = pathFindings[algorithm as keyof typeof pathFindings];
  const disabled = status === Status.Generating || status === Status.Searching;
  const isRunning = status === Status.Searching || status === Status.Generating;

  const handleExecuteAlg = async () => {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    if (!pathFindingAlg) {
      return;
    }
    if (!speed) {
      showErrorToast('Please select speed for algorithm');
      return;
    }

    try {
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
      dispatch(setStatus(Status.Searching));
      const { grid, parents } = await dispatch(
        searchPath(pathFindingAlg.fn, speed)
      );
      await dispatch(highlightPath(grid, parents, speed));
      dispatch(setStatus(Status.Complete));
      dispatch(setGrid({ grid, clone: false }));
    } catch (error) {
      dispatch(setStatus(Status.Ready));
    }
  };

  const handleSpeedChange = (speedKey: string) => {
    setSpeed(Number(speedKey));
  };

  useEffect(() => {
    dispatch(clearGrid())
  }, [buttonText]);

  return (
    <div className="flex gap-3">
      <Select
        variant="bordered"
        placeholder="Speed"
        classNames={{
          value: '!text-secondary',
        }}
        onChange={(e) => handleSpeedChange(e.target.value)}
        className="!w-[100px]"
        aria-label="Select a Speed"
        isDisabled={disabled}
      >
        {speeds.map((speedItem) => (
          <SelectItem key={speedItem.key} textValue={speedItem.label}>
            {speedItem.label}
          </SelectItem>
        ))}
      </Select>
      <Button
        color="default"
        variant="solid"
        isDisabled={disabled}
        isLoading={isRunning}
        startContent={!isRunning && <Play size={16} />}
        onPress={handleExecuteAlg}
      >
        {buttonText}
      </Button>

      <Button
        color="danger"
        variant="light"
        isDisabled={disabled}
        startContent={<RefreshCcw size={16} />}
        onPress={() => dispatch(clearGrid())}
      >
        Clear
      </Button>
    </div>
  );
}

export default PathControls; 