function quickSortWithLog(arr, indent = 0) {
  if (arr.length <= 1) {
    return arr;
  }

  // Log: Aktueller Array-Zustand
  console.log(`${"  ".repeat(indent)}Array: ${arr}`);

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Log: Pivot-Element und aufgeteilte Arrays
  console.log(`${"  ".repeat(indent)}Pivot: ${pivot}`);
  console.log(`${"  ".repeat(indent)}Left: ${left}`);
  console.log(`${"  ".repeat(indent)}Right: ${right}`);

  const sortedLeft = quickSortWithLog(left, indent + 1);
  const sortedRight = quickSortWithLog(right, indent + 1);

  // Log: Sortierte Teil-Arrays
  console.log(`${"  ".repeat(indent)}Sorted Left: ${sortedLeft}`);
  console.log(`${"  ".repeat(indent)}Sorted Right: ${sortedRight}`);

  return [...sortedLeft, pivot, ...sortedRight];
}

// Beispielaufruf
const arr = [8, 2, 6, 1, 9, 3, 7, 5, 4];
console.log("Unsorted Array:", arr);
const sortedArray = quickSortWithLog(arr);
console.log("Sorted Array:", sortedArray);