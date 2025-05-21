import {
  highlight,
  showPivot,
  sort,
  swap,
} from '@/helpers/sorting/algorithm';

import { SortAsyncGenerator } from '@/types/sorting';

export const selectionSort = async function* (array: number[]): SortAsyncGenerator {
  let i, j;

  for (i = 0; i < array.length; i++) {
    let maxIndex = 0;

    for (j = 1; j < array.length - i; j++) {
      yield* showPivot(maxIndex);
      yield* highlight(j);

      if (array[maxIndex] < array[j]) {
        maxIndex = j;
      }
    }

    j = j - 1;
    if (maxIndex !== j && array[maxIndex] !== array[j]) {
      yield* swap(array, maxIndex, j);
    }

    yield* sort(j);
  }
}
