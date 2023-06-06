function heapSort(arr) {
    const steps = []; // Array zur Protokollierung der Schritte
    
    function swap(arr, i, j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    function heapify(arr, n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
    
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
    
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
    
      if (largest !== i) {
        swap(arr, i, largest);
        steps.push({
          type: 'Swap',
          indices: [i, largest],
          array: [...arr]
        }); // Protokollieren des Tauschschritts
    
        heapify(arr, n, largest);
      }
    }
    
    const n = arr.length;
    
    // Erstellen eines Max-Heaps
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
      steps.push({
        type: 'Heapify',
        index: i,
        array: [...arr]
      }); // Protokollieren des Aufrufs von heapify
    }
    
    // Sortieren des Arrays, indem das Maximum extrahiert wird
    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      steps.push({
        type: 'Swap',
        indices: [0, i],
        array: [...arr]
      }); // Protokollieren des Tauschschritts
    
      heapify(arr, i, 0);
      steps.push({
        type: 'Heapify',
        index: 0,
        array: [...arr]
      }); // Protokollieren des Aufrufs von heapify
    }
    
    return steps;
  }
  
  // Beispielaufruf
  const array = [4, 10, 3, 5, 1];
  const sortedSteps = heapSort(array);
  
  // Ausgabe der protokollierten Schritte
  sortedSteps.forEach((step, index) => {
    if (step.type === 'Swap') {
      const [i, j] = step.indices;
      console.log(`Schritt ${index + 1}: Tausche ${step.array[i]} mit ${step.array[j]}`);
    } else if (step.type === 'Heapify') {
      console.log(`Schritt ${index + 1}: Aufruf von heapify mit Index ${step.index}`);
    }
    console.log(`Aktuelles Array: ${step.array}`);
    console.log('-----------------------------');
  });
  