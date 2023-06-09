var view = document.getElementById('graphView');
var bstDiv;

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.color = 'white';
  }
  setColor(color) {
    this.color = color;
  }

  getColor(){
    return this.color;
  }
}

export default class BinarySearchTree {
  constructor(viewName) {
    this.root = null;
    this.view = document.getElementById(viewName);
    this.bstDiv = null;
    this.zoomLevel = 1.0;
    this.init();
  }

  init() {
    this.bstDiv = document.createElement('div');
    this.bstDiv.className = 'bstView';
    this.view.appendChild(this.bstDiv);
    this.view.style.zoom = this.zoomLevel;
  }

  
  clearDS(){
    this.root=null;
    this.bstDiv.innerHTML=null;
  }

  addNode(data, x, y) {
    var bstNode = document.createElement('div');
    bstNode.className = 'bstNode';
    bstNode.innerHTML = '' + data;
    bstNode.style.position = 'absolute';
    bstNode.style.left = x + 'px';
    bstNode.style.top = y + 'px';
    this.bstDiv.appendChild(bstNode);
  }

  addNodeColored(data, x, y, color) {
    var bstNode = document.createElement('div');
    bstNode.className = 'bstNode';
    bstNode.innerHTML = '' + data;
    bstNode.style.position = 'absolute';
    bstNode.style.left = x + 'px';
    bstNode.style.top = y + 'px';
    bstNode.style.backgroundColor = color;
    this.bstDiv.appendChild(bstNode);
  }

  addLine(x1, y1, x2, y2, color) {
    var lineElement = document.createElement('div');
    lineElement.innerHTML = `
      <svg width="40000" height="40000">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" />
      </svg>`;

    lineElement.style.position = 'absolute';
    this.bstDiv.appendChild(lineElement);
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (node.value < newNode.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
    this.update();
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
    this.update();
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      }
      if (node.right === null) {
        node = node.left;
        return node;
      }
      const minNode = this.findMinNode(node.right);
      node.value = minNode.value;
      node.right = this.removeNode(node.right, minNode.value);
      return node;
    }
  }

  findMinNode(node) {
    if (node === null) {
      return null;
    }

    let currentNode = node;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  inOrderTraversal(callback) {
    this.inOrderTraversalNode(this.root, callback);
  }

  inOrderTraversalNode(node, callback) {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, callback);
      callback(node);
      this.inOrderTraversalNode(node.right, callback);
    }
  }

  preOrderTraversal(callback) {
    this.preOrderTraversalNode(this.root, callback);
  }

  async preOrderTraversalNode(node, callback) {
    if (node !== null) {
      callback(node);
      this.preOrderTraversalNode(node.left, callback);
      this.preOrderTraversalNode(node.right, callback);
    }
  }

  postOrderTraversal(callback) {
    this.postOrderTraversalNode(this.root, callback);
  }

  async postOrderTraversalNode(node, callback) {
    if (node !== null) {
    
      this.postOrderTraversalNode(node.left, callback);
      this.postOrderTraversalNode(node.right, callback);
      callback(node);
    }
  }

  levelOrderTraversal(callback) {
    if (this.root === null) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  

  async calculateNodePositions(node, level, minX, maxX, x, y, addNode, oldLineX, oldLineY) {
    if (node === null) {
      return;
    }

    const midX = (minX + maxX) / 2;
    const newY = y + 100;
    if (node !== this.root) {
      this.addLine(oldLineX, oldLineY, midX + 34, newY, node.getColor());
    }
    this.addNodeColored(node.value, midX, newY, node.getColor());
   
    this.calculateNodePositions(node.left, level + 1, minX, midX, x - Math.pow(2, level), newY, addNode, midX + 34, newY + 50);
    this.calculateNodePositions(node.right, level + 1, midX, maxX, x + Math.pow(2, level), newY, addNode, midX + 34, newY + 50);
  }

  async draw() {
    this.bstDiv.innerHTML = '';
    this.calculateNodePositions(this.root, 0, 0, 3000, 0, 0, this.addNode, 0, 0);
    this.inOrderTraversal(node => {
      if (node.left !== null) {
        this.addLine(node.x, node.y, node.left.x, node.left.y, 'white');
      }
      if (node.right !== null) {
        this.addLine(node.x, node.y, node.right.x, node.right.y, 'white');
      }
    });
  }

  update(){
    this.bstDiv.innerHTML='';
    this.draw();
  }

  async animatePreOrderTraversal(node) {
    if (node === null) {
      return;
    }

    node.setColor('red'); 
    this.draw(); 
    await Sleep(500); 

    node.setColor('lightgreen'); 
    
    await this.animatePreOrderTraversal(node.left);

    
    await this.animatePreOrderTraversal(node.right);

    console.log(node.value);
    this.draw(); 
    await Sleep(500); 
  }

  async animatePostOrderTraversal(node) {
    if (node === null) {
      return;
    }

    
    await this.animatePostOrderTraversal(node.left);

    
    await this.animatePostOrderTraversal(node.right);

    node.setColor('red'); 

    this.draw(); 
    await Sleep(500); 

    node.setColor('lightblue'); 
    console.log(node.value);
    this.draw(); 
    await Sleep(500); 
  }

  async animateInOrderTraversal(node) {
    if (node === null) {
      return;
    }

    await this.animateInOrderTraversal(node.left);

    node.setColor('red'); 
    this.draw(); 
    await Sleep(500); 
    console.log(node.value);
    
    await this.animateInOrderTraversal(node.right);
  }


  async animateLevelOrderTraversal() {
    if (this.root === null) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();

      node.setColor('red'); 
      this.draw(); 
      await Sleep(500); 

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }

      node.setColor('orange'); 
      this.draw(); 
      await Sleep(500); 
    }
  }
  
}

function test(){
const bst = new BinarySearchTree();
bst.init();

bst.insert(50);
for (let i = 0; i < 30; i++) {
  bst.insert(Math.floor(Math.random() * 100) + 1);
}

bst.draw();





bst.animatePreOrderTraversal(bst.root);






console.log("==============================");
console.log('Inorder-Traversierung:');
bst.inOrderTraversal(node => {
  console.log(node.value);
});
console.log("==============================");
  


}

