import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useRef } from 'react';
import { Status } from '@/types/pathFinding';
import { cellSize, cellColors } from '@/configs/pathFinding';
import { useTouch } from '@/hooks/useTouch';
import { useMouse } from '@/hooks/useMouse';
import { isTouchDevice } from '@/helpers/pathFinding/action';

const visitedAnimationStyle = `
  @keyframes visitedAnimation {
    0% {
      transform: scale(0.3);
      border-radius: 50%;
      background-color: ${cellColors.visitedStart};
    }
    30% {
      transform: scale(0.6);
      border-radius: 65%;
      background-color: ${cellColors.visitedMid};
    }
    60% {
      transform: scale(1.05);
      border-radius: 80%;
    }
    100% {
      transform: scale(1);
      background-color: ${cellColors.visited};
    }
  }

  @keyframes wallAnimation {
    0% {
      transform: scale(0.3);
      opacity: 0.75;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Grid = () => {
  const grid = useAppSelector((state: RootState) => state.pathFinding.grid);
  const status = useAppSelector((state) => state.pathFinding.status);
  const ref = useRef<HTMLDivElement>(null);

  useMouse({ isMobile: isTouchDevice(), ref });
  useTouch({ isMobile: isTouchDevice(), ref });

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
    gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
    border: `${cellSize}px solid`,
    display: 'inline-grid',
    margin: 'auto',
  };

  // Lấy style dựa trên loại cell
  const getCellStyle = (cellType: number): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: 'rgb(240, 240, 240)'
    };

    switch(cellType) {
      case 0:
        return {
          ...baseStyle,
          backgroundColor: `hsl(var(--heroui-${cellColors.clear})`,
        };
      case 1: 
        return {
          ...baseStyle,
          backgroundColor: `hsl(var(--heroui-${cellColors.entry})`,
        };
      case 2: 
        return {
          ...baseStyle,
          backgroundColor: `hsl(var(--heroui-${cellColors.exit})`,
        };
      case 3: 
        return {
          ...baseStyle,
          backgroundColor: `hsl(var(--heroui-${cellColors.wall})`,

          borderColor: cellColors.wall,
          animation: 'wallAnimation 0.5s',
        };
      case 4:
        return {
          ...baseStyle,
          backgroundColor: `hsl(var(--heroui-${cellColors.visited})`,
          borderColor: cellColors.visited,
          animation: 'visitedAnimation 1s',
        };
      case 5: 
        return {
          ...baseStyle,
          // backgroundColor: cellColors.path,
          borderColor: `hsl(var(--heroui-${cellColors.visited})`,
          borderWidth: '6px',
          borderStyle: 'solid',
          backgroundColor: `hsl(var(--heroui-${cellColors.path})`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="">
      <style>{visitedAnimationStyle}</style>

      <div style={gridStyle} id="grid" ref={ref} className="!border-danger">
        {grid.map((row: number[], rowIndex: number) =>
          row.map((cellType: number, colIndex: number) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              data-row={rowIndex}
              data-col={colIndex}
              data-cell-type={cellType}
              style={getCellStyle(cellType)}
              className={` ${cellType !==5 ? "!border-secondary/80" : ""}`}
              disabled={
                status === Status.Searching || status === Status.Generating
              }
            ></button>
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
