import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {Trash } from 'lucide-react';
import { mazeGenerators } from '@/algorithms';
import { speeds } from '@/configs/pathFinding';
import { Status } from '@/types/pathFinding';
import { generateMaze } from '@/redux/pathFinding/mazeThunk';
import {
  resetGrid,
  setPathLength,
  setVisitedCellCount,
} from '@/redux/pathFinding/pathFindingSlice';
import { Select, SelectItem, Button } from '@heroui/react';
import { showErrorToast } from '@/helpers/toast';

const MazeControls = () => {
  const dispatch = useAppDispatch();
  const [maze, setMaze] = useState<string>('');
  const [speed, setSpeed] = useState<number | null>(null);
  const status = useAppSelector((state) => state.pathFinding.status);
  const disabled = status === Status.Generating || status === Status.Searching;

  const handleGenerateMaze = () => {
    if (!speed) {
      showErrorToast('Please select speed for maze');
      return;
    }
    const mazeAlg = mazeGenerators.find((m) => m.key === maze);
    if (mazeAlg) {
      dispatch(generateMaze(mazeAlg.fn, speed));
    }
  }

  const handleMazeChange = (mazeKey: string) => {
    if (!mazeKey) {
      return;
    }
    setMaze(mazeKey);
  }

  const handleSpeedChange = (speedKey: string) => {
    setSpeed(Number(speedKey));
  }

  const handleReset = () => {
    dispatch(resetGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
  }
  return (
    <div className="flex gap-3 items-center">
      <Select
        variant="bordered"
        color="secondary"
        placeholder="Select a Maze"
        selectedKeys={[maze]}
        classNames={{
          value: '!text-secondary',
        }}
        onChange={(e) => handleMazeChange(e.target.value)}
        isDisabled={disabled}
        className="!w-[200px]"
        aria-label="Select a Maze"
      >
        {mazeGenerators.map((mazeItem) => (
          <SelectItem key={mazeItem.key} aria-label={mazeItem.key}>
            {mazeItem.key}
          </SelectItem>
        ))}
      </Select>

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
        color="secondary"
        variant="solid"
        data-testid="generate-maze"
        onPress={handleGenerateMaze}
        isDisabled={disabled || !maze}
        className="min-w-[40px] h-[40px]"
        isLoading={status === Status.Generating}
      >
        Generate Maze
      </Button>

      <Button
        color="danger"
        isIconOnly
        variant="light"
        data-testid="reset"
        onPress={handleReset}
        className="min-w-[40px] h-[40px]"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
}

export default MazeControls;
