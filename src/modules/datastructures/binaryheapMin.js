class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    parent(i) {
      return Math.floor((i - 1) / 2);
    }
  
    leftChild(i) {
      return 2 * i + 1;
    }
  
    rightChild(i) {
      return 2 * i + 2;
    }
  
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    insert(value) {
      this.heap.push(value);
      let currentIndex = this.heap.length - 1;
  
      while (currentIndex !== 0 && this.heap[currentIndex] < this.heap[this.parent(currentIndex)]) {
        const parentIndex = this.parent(currentIndex);
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      }
    }
  
    extractMin() {
      if (this.heap.length === 0) {
        return null;
      }
  
      const min = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
  
      this.minHeapify(0);
  
      return min;
    }
  
    minHeapify(i) {
      const left = this.leftChild(i);
      const right = this.rightChild(i);
      let smallest = i;
  
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
  
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
  
      if (smallest !== i) {
        this.swap(i, smallest);
        this.minHeapify(smallest);
      }
    }

    dump() {
      return this.heap;
    }
    calculatePosition(index, level, maxIndex, nodePositions) {
      if (index > maxIndex) {
        return;
      }
  
      const x = Math.pow(2, level) - 1 + index;
      const y = level;
  
      nodePositions[this.heap[index]] = { x, y };
  
      this.calculatePosition(this.leftChild(index), level + 1, maxIndex, nodePositions);
      this.calculatePosition(this.rightChild(index), level + 1, maxIndex, nodePositions);
    }


    calculateNodePositions() {
      const nodePositions = {};
      this.calculatePosition(0, 0, this.heap.length - 1, nodePositions);
      return nodePositions;
    }
  
    calculatePosition(index, level, maxIndex, nodePositions) {
      if (index > maxIndex) {
        return;
      }
  
      const x = Math.pow(2, level) - 1 + index;
      const y = level;
  
      nodePositions[this.heap[index]] = { x, y };
  
      this.calculatePosition(this.leftChild(index), level + 1, maxIndex, nodePositions);
      this.calculatePosition(this.rightChild(index), level + 1, maxIndex, nodePositions);
    }
  
  }


  var heap = new MinHeap();
  heap.insert(1);
  heap.insert(2);
  heap.insert(10);

 console.log(heap.dump());
  