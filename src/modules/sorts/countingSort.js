function countingSort(arr) {
  let max = Math.max(...arr);
  let count = new Array(max + 1).fill(0);
  let swaps = []; // Array zum Speichern der Tauschschritte

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  let sorted = new Array(arr.length);

  for (let i = arr.length - 1; i >= 0; i--) {
    sorted[count[arr[i]] - 1] = arr[i];

    // Speichere den Tauschschritt
    swaps.push({
      element: arr[i],
      fromIndex: i,
      toIndex: count[arr[i]] - 1
    });

    count[arr[i]]--;
  }

  return {
    sorted,
    swaps
  };
}

function logCountingSort(arr) {
  console.log("Unsortiertes Array:", arr);
  let {
    sorted,
    swaps
  } = countingSort(arr);

  console.log("Sortierte Reihenfolge:");

  for (let i = 0; i < swaps.length; i++) {
    console.log(
      `Tauschschritt ${i + 1}: Element ${swaps[i].element} von Index ${swaps[i].fromIndex} zu Index ${swaps[i].toIndex}`
    );
  }

  console.log("Sortiertes Array:", sorted);
}

logCountingSort([4, 2, 2, 8, 3, 3, 1]);