function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    // Log die Aktion: Original Array
    console.log("Original Array: ", arr);
  
    // Teile das Array in zwei Hälften
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    // Log die Aktion: Aufteilung des Arrays
    console.log("Aufteilung: ", left, right);
  
    // Rekursiv Sortiere beide Hälften
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
  
    // Log die Aktion: Sortierte Hälften
    console.log("Sortierte Hälften: ", sortedLeft, sortedRight);
  
    // Führe die Zusammenführung der sortierten Hälften durch
    const mergedArray = merge(sortedLeft, sortedRight);
  
    // Log die Aktion: Zusammengeführtes Array
    console.log("Zusammengeführtes Array: ", mergedArray);
  
    return mergedArray;
  }
  
  // Hilfsfunktion zum Zusammenführen der sortierten Hälften
  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // Füge die restlichen Elemente hinzu
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  // Beispielaufruf
  const array = [6, 3, 9, 1, 5];
  const sortedArray = mergeSort(array);
  console.log("Sortiertes Array: ", sortedArray);
  