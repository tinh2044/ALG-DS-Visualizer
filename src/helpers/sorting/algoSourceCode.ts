export const bubbleSortCode = `function bubbleSort(array) {
  // Input array: [INPUT_ARRAY]
  let i, j;

  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      // Compare adjacent elements
      if (array[j] > array[j + 1]) {
        // Swap elements if they are in wrong order
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  
  return array;
}`;

export const bubbleSortLineMapping = {
  swap: {
    default: [9, 10, 11, 12],
    '0_1': [9, 10, 11, 12],
    '1_2': [9, 10, 11, 12],
    '2_3': [9, 10, 11, 12],
  },
  highlight: {
    default: [7, 8],
    '0_1': [7, 8],
    '1_2': [7, 8],
    '2_3': [7, 8],
  },
  sort: {
    default: [5, 14],
  },
  pivot: {
    default: [],
  }
};

export const selectionSortCode = `function selectionSort(array) {
  // Input array: [INPUT_ARRAY]
  let i, j, min_idx;
  
  // One by one move boundary of unsorted subarray
  for (i = 0; i < array.length - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[min_idx]) {
        min_idx = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (min_idx !== i) {
      const temp = array[min_idx];
      array[min_idx] = array[i];
      array[i] = temp;
    }
  }
  
  return array;
}`;

export const selectionSortLineMapping = {
  swap: {
    default: [16, 17, 18, 19],
  },
  highlight: {
    default: [9, 10, 11],
  },
  sort: {
    default: [6, 21],
  },
  pivot: {
    default: [8],
  }
};

export const insertionSortCode = `function insertionSort(array) {
  // Input array: [INPUT_ARRAY]
  let i, j, key;
  
  for (i = 1; i < array.length; i++) {
    key = array[i];
    j = i - 1;
    
    // Move elements greater than key to one position ahead
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  
  return array;
}`;

export const insertionSortLineMapping = {
  swap: {
    default: [10, 11],
  },
  highlight: {
    default: [9, 10],
  },
  sort: {
    default: [5, 14],
  },
  pivot: {
    default: [6],
  }
};

export const quickSortCode = `function quickSort(array, low = 0, high = array.length - 1) {
  // Input array: [INPUT_ARRAY]
  if (low < high) {
    // pi is partitioning index
    const pi = partition(array, low, high);
    
    // Separately sort elements before and after partition
    quickSort(array, low, pi - 1);
    quickSort(array, pi + 1, high);
  }
  return array;
}

function partition(array, low, high) {
  // Select pivot element
  const pivot = array[high];
  let i = low - 1;
  
  // Compare each element with pivot
  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      // Swap elements
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  
  // Swap pivot element
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  
  return i + 1;
}`;

export const quickSortLineMapping = {
  swap: {
    default: [22, 23, 24],
    pivot: [28, 29, 30],
  },
  highlight: {
    default: [19, 20],
  },
  sort: {
    default: [7, 8],
  },
  pivot: {
    default: [15, 16],
  }
};

export const mergeSortCode = `function mergeSort(array) {
  // Input array: [INPUT_ARRAY]
  // Base case
  if (array.length <= 1) {
    return array;
  }
  
  // Split array into two halves
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  
  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Append remaining elements
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`;

export const mergeSortLineMapping = {
  swap: {
    default: [25, 26, 28, 29],
  },
  highlight: {
    default: [22, 23],
  },
  sort: {
    default: [34],
  },
  pivot: {
    default: [8, 9],
  }
};

export const heapSortCode = `function heapSort(array) {
  // Input array: [INPUT_ARRAY]
  const n = array.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    
    // Call max heapify on reduced heap
    heapify(array, i, 0);
  }
  
  return array;
}

function heapify(array, n, i) {
  let largest = i;  // Initialize largest as root
  const left = 2 * i + 1;  // left = 2*i + 1
  const right = 2 * i + 2;  // right = 2*i + 2
  
  // If left child is larger than root
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    const swap = array[i];
    array[i] = array[largest];
    array[largest] = swap;
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest);
  }
}`;

export const heapSortLineMapping = {
  swap: {
    default: [13, 14, 15],
    heap: [37, 38, 39],
  },
  highlight: {
    default: [29, 30, 34, 35],
  },
  sort: {
    default: [11, 19],
  },
  pivot: {
    default: [25],
  }
};

export const shellSortCode = `function shellSort(array) {
  // Input array: [INPUT_ARRAY]
  const n = array.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Perform insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      // Add array[i] to the elements that have been gap sorted
      const temp = array[i];
      
      // Shift earlier gap-sorted elements up until correct location
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
      }
      
      // Put temp in its correct position
      array[j] = temp;
    }
  }
  
  return array;
}`;

export const shellSortLineMapping = {
  swap: {
    default: [12, 13, 16],
  },
  highlight: {
    default: [12, 13],
  },
  sort: {
    default: [6, 20],
  },
  pivot: {
    default: [5],
  }
};

export const cocktailSortCode = `function cocktailSort(array) {
  // Input array: [INPUT_ARRAY]
  let swapped = true;
  let start = 0;
  let end = array.length - 1;
  
  while (swapped) {
    // Reset swapped flag for forward pass
    swapped = false;
    
    // Forward pass (like bubble sort)
    for (let i = start; i < end; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
    
    // If nothing was swapped, array is sorted
    if (!swapped) break;
    
    // Otherwise reset swapped flag for backward pass
    swapped = false;
    
    // Move end point back by one as the last item is in place
    end--;
    
    // Backward pass (bubble sort from right to left)
    for (let i = end - 1; i >= start; i--) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
    
    // Increase starting point as first element is in place
    start++;
  }
  
  return array;
}`;

export const cocktailSortLineMapping = {
  swap: {
    forward: [12, 13, 14, 15],
    backward: [30, 31, 32, 33],
  },
  highlight: {
    forward: [11, 12],
    backward: [29, 30],
  },
  sort: {
    default: [24, 36],
  },
  pivot: {
    default: [],
  }
};

export interface LineMapping {
  swap: Record<string, number[]>;
  highlight: Record<string, number[]>;
  sort: Record<string, number[]>;
  pivot: Record<string, number[]>;
}

export const algoSourceCodeMap: Record<string, { code: string, lineMapping: LineMapping }> = {
  bubble: { code: bubbleSortCode, lineMapping: bubbleSortLineMapping },
  selection: { code: selectionSortCode, lineMapping: selectionSortLineMapping },
  insertion: { code: insertionSortCode, lineMapping: insertionSortLineMapping },
  quick: { code: quickSortCode, lineMapping: quickSortLineMapping },
  merge: { code: mergeSortCode, lineMapping: mergeSortLineMapping },
  heap: { code: heapSortCode, lineMapping: heapSortLineMapping },
  shell: { code: shellSortCode, lineMapping: shellSortLineMapping },
  cocktail: { code: cocktailSortCode, lineMapping: cocktailSortLineMapping },
};
