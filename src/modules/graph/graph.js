export class Node {
  constructor(text = '') {
    this.text = text;
  }
}

class Edge {
  constructor(startNode, endNode, directed = false) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.directed = directed;
    this.text = '';
  }

  setText(text) {
    this.text = text;
  }
}

export default class Graph {
  constructor(containerId, width, height) {
    this.container = document.createElement('div');
    this.container.className = 'graphContainer';

    var container = document.getElementById(containerId);
    container.appendChild(this.container);

    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;

    this.nodes = [];
    this.edges = [];
  }

  draw() {
    this.container.innerHTML = '';

    const positions = [];

    for (const node of this.nodes) {
      let x, y;
      if (node.position) {
        x = node.position.x;
        y = node.position.y;
      } else {
        do {
          x = Math.floor(Math.random() * (this.container.offsetWidth - 40));
          y = Math.floor(Math.random() * (this.container.offsetHeight - 40));
        } while (this.checkOverlap(positions, x, y));
        node.position = {
          x,
          y
        };
        positions.push({
          x,
          y
        });
      }

      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'GraphNode';
      nodeDiv.textContent = node.text;
      nodeDiv.style.left = `${x}px`;
      nodeDiv.style.top = `${y}px`;
      this.container.appendChild(nodeDiv);
    }

    const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgContainer.setAttribute('class', 'GraphSvg');
    svgContainer.style.width = `${this.container.offsetWidth}px`;
    svgContainer.style.height = `${this.container.offsetHeight}px`;

    for (const edge of this.edges) {
      const startNode = edge.startNode;
      const endNode = edge.endNode;

      const startNodeDiv = this.container.childNodes[startNode];
      const endNodeDiv = this.container.childNodes[endNode];

      const startNodeRect = startNodeDiv.getBoundingClientRect();
      const endNodeRect = endNodeDiv.getBoundingClientRect();

      const startNodeX = startNodeRect.left + startNodeDiv.offsetWidth / 2 - this.container.getBoundingClientRect().left;
      const startNodeY = startNodeRect.top + startNodeDiv.offsetHeight / 2 - this.container.getBoundingClientRect().top;
      const endNodeX = endNodeRect.left + endNodeDiv.offsetWidth / 2 - this.container.getBoundingClientRect().left;
      const endNodeY = endNodeRect.top + endNodeDiv.offsetHeight / 2 - this.container.getBoundingClientRect().top;

      const edgeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      edgeLine.setAttribute('class', 'GraphEdge');
      edgeLine.setAttribute('x1', `${startNodeX}`);
      edgeLine.setAttribute('y1', `${startNodeY}`);
      edgeLine.setAttribute('x2', `${endNodeX}`);
      edgeLine.setAttribute('y2', `${endNodeY}`);
      if (edge.directed) {
        edgeLine.setAttribute('marker-end', 'url(#arrowhead)');
      }

      svgContainer.appendChild(edgeLine);
    }

    this.container.appendChild(svgContainer);
  }


  checkOverlap(positions, x, y) {
    for (const pos of positions) {
      if (Math.abs(pos.x - x) < 40 && Math.abs(pos.y - y) < 40) {
        return true;
      }
    }
    return false;
  }

  update() {
    this.container.innerHTML = '';
    this.draw();
  }

  insertNode(node) {
    this.nodes.push(node);
    this.update();
  }

  insertEdge(nodeFrom, nodeTo) {
    var edge = new Edge(nodeFrom, nodeTo);
    this.edges.push(edge);
    this.update();
  }

  insertEdgeWithText(nodeFrom, nodeTo, Text) {
    var edge = new Edge(nodeFrom, nodeTo);
    this.edges.push(edge);
    //edge.setText(Text); // TODO FIX the DRAWIG
    this.update();
  }

  setTextToAdgeIndex(index, Text) {
    this.edges[index].setText(Text);
    this.update();
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
      this.update();
    }
  }

  color(node) {
    const nodeDivs = this.container.getElementsByClassName('GraphNode');
    for (const nodeDiv of nodeDivs) {
      const index = Array.from(nodeDivs).indexOf(nodeDiv);
      if (this.nodes[index] === node) {
        nodeDiv.classList.add('highlight');
        break;
      }
    }
  }


  resetColor() {
    const nodes = this.container.getElementsByClassName('GraphNode');
    for (const node of nodes) {
      node.classList.remove('highlight');
    }
    this.update();
  }

  colorEdge(edge) {
    const edgeDivs = this.container.getElementsByClassName('GraphEdgeContainer');
    for (const edgeDiv of edgeDivs) {
      const index = Array.from(edgeDivs).indexOf(edgeDiv);
      if (this.edges[index] === edge) {
        edgeDiv.classList.add('highlight');
        break;
      }
    }
  }

  getNachbar(node) {
    const index = this.nodes.indexOf(node);
    const neighbors = [];

    for (const edge of this.edges) {
      if (edge.startNode === index && this.nodes[edge.endNode]) {
        neighbors.push(this.nodes[edge.endNode]);
      } else if (edge.endNode === index && !edge.directed && this.nodes[edge.startNode]) {
        neighbors.push(this.nodes[edge.startNode]);
      }
    }

    return neighbors;
  }

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  clearDS() {
    this.nodes = [];
    this.edges = [];
    this.container.innerHTML = null;
  }

  gettAdjazentMatrix(){
    var testMatrix=[[1,0,1,1],[1,0,0,0],[1,1,1,0],[1,0,1,0]];
    return testMatrix;
  }

  async tiefensuche() {
    const visited = new Set();

    const dfs = async (node) => {
      visited.add(node);
      this.color(node);
      console.log('Visited:', node.text);
      await this.sleep(1000);

      const neighbors = this.getNachbar(node);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          const edge = this.edges.find(
            (edge) =>
            (edge.startNode === node && edge.endNode === neighbor) ||
            (edge.startNode === neighbor && edge.endNode === node)
          );
          this.colorEdge(edge);
          await this.sleep(1000);
          await dfs(neighbor);
        }
      }
    };

    for (const node of this.nodes) {
      if (!visited.has(node)) {
        await dfs(node);
      }
    }
  }
  async breitensuche() {
    const visited = new Set();
    const queue = [];

    for (const node of this.nodes) {
      if (!visited.has(node)) {
        queue.push(node);
        visited.add(node);
        this.color(node);
        console.log('Visited:', node.text);
        await this.sleep(1000);
      }

      while (queue.length > 0) {
        const currentNode = queue.shift();
        const neighbors = this.getNachbar(currentNode);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            const edge = this.edges.find(
              (edge) =>
              (edge.startNode === currentNode && edge.endNode === neighbor) ||
              (edge.startNode === neighbor && edge.endNode === currentNode)
            );
            this.colorEdge(edge);
            await this.sleep(1000);
            queue.push(neighbor);
            visited.add(neighbor);
            this.color(neighbor);
            console.log('Visited:', neighbor.text);
            await this.sleep(1000);
          }
        }
      }
    }
  }
}