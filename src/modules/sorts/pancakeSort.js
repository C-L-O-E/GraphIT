function pancakeSort(arr) {
  var n = arr.length;
  if (n === 0) {
    return arr;
  }

  // Schritte-Array für die Aufzeichnung der Sortierschritte
  var steps = [];

  // Pancake-Sort-Algorithmus
  for (var i = n - 1; i > 0; i--) {
    // Größtes Element im unsortierten Teil des Arrays finden
    var maxIndex = findMaxIndex(arr, i);

    // Das größte Element an den Anfang des Arrays bringen
    flip(arr, maxIndex);
    steps.push(maxIndex + 1); // Schritt aufzeichnen

    // Das größte Element an die richtige Position bringen
    flip(arr, i);
    steps.push(i + 1); // Schritt aufzeichnen
  }

  // Schritte-Array zurückgeben
  return steps;
}

function findMaxIndex(arr, n) {
  var maxIndex = 0;
  for (var i = 1; i <= n; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

function flip(arr, k) {
  var start = 0;
  while (start < k) {
    var temp = arr[start];
    arr[start] = arr[k];
    arr[k] = temp;
    start++;
    k--;
  }
}

// Beispielaufruf
var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
var sortingSteps = pancakeSort(array);

// Ausgabe der Schritte auf der Konsole
for (var step of sortingSteps) {
  console.log(`Flip at index: ${step}`);
}

// Ausgabe des sortierten Arrays
console.log("Sortiertes Array: ", array);