import { algList } from '@/algorithms/sorting/algList';

export const initialArray = [6, 8, 3, 5, 1, 9, 2, 7, 4];
export const numberGenerator = { min: 10, max: 40 };
export const sortCompletionMessage = 'Sorting is complete';

export const cellCSS = {
  size: 50,
  margin: 4,
};

export const barCSS = {
  size: 30,
  minSize: 10,
  maxHeight: 250,
  margin: 2,
};

export const selectedAlgosStatus = algList.map(() => true);

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--cell-size', `${cellCSS.size}px`);
root.style.setProperty('--cell-margin', `${cellCSS.margin}px`);
root.style.setProperty('--bar-size', `${barCSS.size}px`);
root.style.setProperty('--bar-min-size', `${barCSS.minSize}px`);
root.style.setProperty('--bar-max-height', `${barCSS.maxHeight}px`);
root.style.setProperty('--bar-margin', `${barCSS.margin}px`);
