var view=document.getElementById('graphView');
var bstDiv;
var zoomLevel = 1;
var zoomStep = 1;

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
 }

function init(){
    bstDiv=document.createElement('div');
    bstDiv.className="bstView"; 
    view.appendChild(bstDiv);
    view.style.zoom=zoomLevel;
}

function addNode(data,x,y){
    var bstNode=document.createElement('div');
    bstNode.className="bstNode";
    bstNode.innerHTML=""+data;
    bstNode.style.position="absolute";
    bstNode.style.left=x+"px";
    bstNode.style.top=y+"px";
    bstDiv.appendChild(bstNode);
}


function addNodeColored(data, x, y, color) {
  var bstNode = document.createElement('div');
  bstNode.className = 'bstNode';
  bstNode.innerHTML = '' + data;
  bstNode.style.position = 'absolute';
  bstNode.style.left = x + 'px';
  bstNode.style.top = y + 'px';
  bstNode.style.backgroundColor = color; // Hinzugefügt: Setze die Hintergrundfarbe
  bstDiv.appendChild(bstNode);
}



function addLine(x1,y1,x2,y2,color){    
    var lineElement = document.createElement('div')
    lineElement.innerHTML=`
    <svg width="40000" height="40000">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" />
  </svg>`

  lineElement.style.position="absolute";
  
      bstDiv.appendChild(lineElement);
  }



function zoomIn(){
    zoomLevel+=zoomStep;
    view.style.zoom=zoomLevel;
}


function zoomOut(){
    zoomLevel-=zoomStep;
    view.style.zoom=zoomLevel;
}




// Definition eines Binärbaumnodes
class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x=0;
      this.y=0;
      this.color='white';
    }
    setColor(color) {
      this.color = color;
    }
  }
  
  // Definition des BinarySearchTree
 export default class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    // Einfügen eines neuen Knotens
    insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    // Hilfsfunktion für das Einfügen eines neuen Knotens
    insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else if(node.value<newNode.value) {
        if (node.right === null) {
           node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    // Entfernen eines Knotens
    remove(value) {
      this.root = this.removeNode(this.root, value);
    }
  
    // Hilfsfunktion zum Entfernen eines Knotens
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
 
     // Suchen des kleinsten Knotens im Baum
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

    // Traversieren des Baumes in Inorder-Reihenfolge (links, Wurzel, rechts)
    inOrderTraversal(callback) {
      this.inOrderTraversalNode(this.root, callback);
    }
  
    // Hilfsfunktion für die Inorder-Traversierung
    inOrderTraversalNode(node, callback) {
      if (node !== null) {
        this.inOrderTraversalNode(node.left, callback);
        callback(node);
        this.inOrderTraversalNode(node.right, callback);
      }
    }
  
    // Traversieren des Baumes in Preorder-Reihenfolge (Wurzel, links, rechts)
    preOrderTraversal(callback) {
      this.preOrderTraversalNode(this.root, callback);
    }
  
    // Hilfsfunktion für die Preorder-Traversierung
    preOrderTraversalNode(node, callback) {
      if (node !== null) {
        callback(node);
        this.preOrderTraversalNode(node.left, callback);
        this.preOrderTraversalNode(node.right, callback);
      }
    }
  
    // Traversieren des Baumes in Postorder-Reihenfolge (links, rechts, Wurzel)
    postOrderTraversal(callback) {
      this.postOrderTraversalNode(this.root, callback);
    }
  
    // Hilfsfunktion für die Postorder-Traversierung
    postOrderTraversalNode(node, callback) {
      if (node !== null) {
        this.postOrderTraversalNode(node.left, callback);
        this.postOrderTraversalNode(node.right, callback);
        callback(node);
      }
    }
  
    // Traversieren des Baumes in Levelorder-Reihenfolge (von oben nach unten, links nach rechts)
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
  }
  
  // Beispielverwendung
  function update(){
    draw();
  }
  // Erstellung des BinarySearchTree
  const bst = new BinarySearchTree();
 /* 
  // Einfügen von Knoten
  bst.insert(8);
  bst.insert(3);
  bst.insert(10);
  bst.insert(1);
  bst.insert(6);
  bst.insert(14);
  bst.insert(4);
  bst.insert(7);
  bst.insert(13);
  bst.insert(4);
  bst.insert(2);
  bst.insert(90);
  bst.insert(5);
  bst.insert(0);
  bst.insert(11);
*/
  // Inorder-Traversierung
  console.log('Inorder-Traversierung:');
  bst.inOrderTraversal(node => {
    console.log(node.value);
  });
  
  // Preorder-Traversierung
  console.log('Preorder-Traversierung:');
  bst.preOrderTraversal(node => {
    console.log(node.value);
  });
  
  // Postorder-Traversierung
  console.log('Postorder-Traversierung:');
  bst.postOrderTraversal(node => {
    console.log(node.value);
  });
  
  // Levelorder-Traversierung
  console.log('Levelorder-Traversierung:');
  bst.levelOrderTraversal(node => {
    console.log(node.value);
  });
  

  // Aktualisierte Inorder-Traversierung nach Entfernung
  console.log('Inorder-Traversierung nach Entfernung:');
  bst.inOrderTraversal(node => {
    console.log(node.value);
    
  });
  
  function recusivdraw(node,level,x,chdir){
    if(chdir=='l'){
        x=x-80-(level*100);
    }else{
        x=x+80+(level*100);
    }
    var y=100*level;
    addNode(node.value,x,y);
    console.log(node.value+"| Level: "+level);
    if(node.left!=null){
        recusivdraw(node.left,level+1,x,'l');
    }
    if(node.right!=null){
        recusivdraw(node.right,level+1,x,'r');
    }
  }



async  function calculateNodePositions(node, level, minX, maxX, x, y, addNode,oldlinex, oldliney) {
    if (node === null) {
      return;
    }
   
    const midX = (minX + maxX) / 2;
    const newY = y + 100;
    if(node!=bst.root){
        addLine(oldlinex,oldliney,midX+34,newY,"white");
    }
    addNodeColored(node.value, midX, newY,'white');
    calculateNodePositions(node.left, level + 1, minX, midX, x - Math.pow(2, level), newY, addNode,midX+34,newY+50);
    calculateNodePositions(node.right, level + 1, midX, maxX, x + Math.pow(2, level), newY, addNode,midX+34,newY+50);
  }


async function draw() {
    // Lösche den aktuellen Baum
    bstDiv.innerHTML = '';

    // Berechne die Knotenpositionen
    calculateNodePositions(bst.root, 0, 0, 3000, 0, 0, addNode, 0, 0);
    await Sleep(400);
    // Traversiere den Baum, um die Linien zu zeichnen
    bst.inOrderTraversal(node => {
      if (node.left !== null) {
        addLine(node.x, node.y, node.left.x, node.left.y, 'white');
      }
      if (node.right !== null) {
        addLine(node.x, node.y, node.right.x, node.right.y, 'white');
      }
    });
  }

 init();
 bst.insert(50);
 for(let i=0;i<30;i++){
   bst.insert(Math.floor(Math.random() * 100) + 1);
 }

   // Entfernen eines Knotens
   bst.remove(6);

 //calculateNodePositions(bst.root, 1, 0, 2200, 100, 0, addNode,0,0);



async function traverseInORDERCOLERD(){
   // Aktualisierte Inorder-Traversierung nach Entfernung
   console.log('Inorder-Traversierung nach Entfernung:');
  bst.inOrderTraversal(async node => {
     node.setColor('lightgreen');
     draw();
     await Sleep(500);
     console.log(node.value);
     
   });
}

draw();

