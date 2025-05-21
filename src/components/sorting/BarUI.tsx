import { UIProps } from '@/types/sorting';
import { useMemo } from 'react';

function BarUI({ array, sorts, highlights, pivot }: UIProps) {
  const max = useMemo(() => Math.max(...array), [array]);

  return (
    <div className="relative py-[25px] pt-[25px] pb-10 overflow-x-auto w-fit">
      <ul className="flex items-end h-[var(--bar-max-height)]" data-testid="bar-values">
        {array.map((item, idx) => (
          <li
            key={idx}
            className={`flex-shrink-1 w-[var(--bar-size)] min-w-[var(--bar-min-size)] m-0 mx-[calc(var(--bar-margin)/2)] 
              bg-[var(--color-bar)] border border-[var(--color-bar)] bg-sort-default ${
              pivot === idx ? '!bg-secondary !text-primary' : 
              sorts.includes(idx) ? '!bg-success' : 
              highlights.includes(idx) ? '!bg-red-600' : ''
            }`}
            style={{
              height: `${(item / max) * 100}%`,
            }}
          ></li>
        ))}
      </ul>

      <ul className="absolute bottom-5 flex w-full text-[0.4rem] opacity-40">
        {array.map((_, idx) => (
          <li key={idx} className="flex-shrink-1 w-[var(--bar-size)] min-w-[var(--bar-min-size)] m-0 mx-[calc(var(--bar-margin)/2)]">{idx}</li>
        ))}
      </ul>
    </div>
  );
}

export default BarUI;
