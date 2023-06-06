function shellSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Shell-Sort-Algorithmus
    var gap = Math.floor(n / 2);
    while (gap > 0) {
      for (var i = gap; i < n; i++) {
        var temp = arr[i];
        var j = i;
  
        // Schritte aufzeichnen
        steps.push({
          index1: j,
          index2: j - gap,
          gap: gap,
        });
  
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
  
          // Schritt aufzeichnen
          steps.push({
            index1: j,
            index2: j - gap,
            gap: gap,
          });
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = shellSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}, Gap: ${step.gap}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  