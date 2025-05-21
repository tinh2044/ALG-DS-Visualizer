import { highlight, sort, swap } from '@/helpers/sorting/algorithm';

import { SortAsyncGenerator } from '@/types/sorting';

export const bubbleSort = async function* (array: number[]): SortAsyncGenerator {
  let i, j;

  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      yield* highlight(j, j + 1);

      if (array[j] > array[j + 1]) {
        yield* swap(array, j, j + 1);
      }
    }

    yield* sort(j);
  }
}
