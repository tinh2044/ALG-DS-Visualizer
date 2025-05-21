import { useEffect, useRef } from 'react';

import { HeaderProps } from '@/types/sorting';
import { useAppSelector } from '@/redux/hooks';

function Header({ algoName, isCompleted }: HeaderProps) {
  const time = useAppSelector((state) => state.sorting.time);
  const completionTime = useRef(0);

  useEffect(() => {
    if (isCompleted) {
      completionTime.current = time;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return (
    <header className="flex items-center justify-between">
      <h2 className="text-lg font-bold capitalize">{algoName} Sort</h2>
      <span>
        Time: <strong>{completionTime.current || time}</strong>
      </span>
    </header>
  );
}

export default Header;
