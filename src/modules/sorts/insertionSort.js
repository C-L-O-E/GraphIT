function insertionSort(arr) {
    var len = arr.length;
    
    for (var i = 1; i < len; i++) {
      var key = arr[i];
      var j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
  
      arr[j + 1] = key;
      
      // Ausgabe des aktuellen Schritts mit Index des Platztauschs
      console.log("Schritt " + i + ": " + arr);
      
      if (j !== i - 1) {
        console.log("Platztausch: {" + arr[i] + " an Index " + i + ":" + arr[j + 1] + " an Index " + (j + 1) + "}");
      }
    }
    
    return arr;
  }
  
  // Beispielaufruf
  var array = [5, 3, 8, 4, 2];
  console.log("Ursprüngliches Array: " + array);
  var sortedArray = insertionSort(array);
  console.log("Sortiertes Array: " + sortedArray);
  