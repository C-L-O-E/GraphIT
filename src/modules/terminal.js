import array from './datastructures/array.js';
import LinkedList from './datastructures/sll.js';
import DoublyLinkedList from './datastructures/mll.js'
import stack from './datastructures/stack.js';
import DataStructureView from './dsSidebarController.js';
import BinarySearchTree from './datastructures/bst.js';
import {
  zoomIn,
  zoomOut
} from '../zoomlisteners.js';
import Graph from './graph/graph.js';
import numberInput from './numberinput/numberInputDialog.js'
import {
  addEventListeners,
  updateListener
} from './terminalTouchControles.js';
import {
  saveToDisk,
  createDirectoryIfNotExists,
  selectFile
} from '../diskControler/diskController.js';
import {
  getAppVersion,
  createSettingsObject,
  getUser,
  getProjectName,
  getAutoSaveOn,
  getGlobalWorkspacePath,
  getGlobalSettingsPath,
  getColorMode,
  getUpdateNumber,
  getTextColor,
  initSettings,
  setAutoSaveOn
} from '../settings.js';
import {
  Node
} from './graph/graph.js';

var sidebar = new DataStructureView();
var projectFileExists = false;
setAutoSaveOn(true);
var controllsWindow = null;

var view = document.getElementById("graphView");
var cons = document.getElementById('downPart');




var activeElements = [];


var activeElementIndex = -1;


export function updateActiveSelectedIndex(index) {
  activeElementIndex = index;
  writeOutput("Load: " + sidebar.textArray[activeElementIndex]);
}

var state = 'term';
var addition = "";
var viewState = "none";

var comandhistory = [];
var outputhistory = [];
var logsHistory = [];


let output = '';
var terminal = document.getElementById('terminal');
var additionsView=null;

export function saveToLocalFile() {
  if (projectFileExists == false) {
    var check = createDirectoryIfNotExists(process.env.workspacePath);
    if (check == true) {
      projectFileExists = true;
    }
  }
  saveToDisk(getGlobalWorkspacePath(), getProjectName(), activeElementIndex, activeElements);
}

export function addLog(data) {
  const timestamp = new Date().toISOString();
  var str = "<" + timestamp + "> [Log] " + data + ",";
  terminalLog(str);
}
export function addError(data) {
  const timestamp = new Date().toISOString();
  var str = "<" + timestamp + "> [Error] " + data + ",";
  terminalLog(str);
}
export function addWarning(data) {
  const timestamp = new Date().toISOString();
  var str = "<" + timestamp + "> [Warning] " + data + ",";
  terminalLog(str);
}


function processCommand(command) {



  output = processCMD(command);



  const outputLine = document.createElement('div');
  outputLine.textContent = output;
  terminal.appendChild(outputLine);
  comandhistory.push(outputLine);


  const inputLine = document.createElement('div');
  inputLine.id = 'input-line';
  inputLine.innerHTML = '<span>GraphIT' + addition + '></span> <input id="input" autofocus>';


  const input = inputLine.querySelector('#input');
  input.addEventListener('keydown', handleInput);
  terminal.appendChild(inputLine);
  input.focus();
}


function handleInput(event) {
  if (event.key === 'Enter') {
    const input = event.target;
    const command = input.value.trim();


    processCommand(command);


    input.value = '';
    input.disabled = true;
  }
}


function initializeTerminal() {
  const inputLine = document.createElement('div');

  inputLine.id = 'input-line';
  inputLine.innerHTML = '<span>GraphIT' + addition + '></span> <input id="input" autofocus>';

  const input = inputLine.querySelector('#input');
  input.addEventListener('keydown', handleInput);
  terminal.appendChild(inputLine);
  comandhistory.push(inputLine);
  input.focus();

}




initializeTerminal();

function previewCMD() {
  ipcRenderer.send("comand", "showVisual");
}

function Clear() {
  terminal.innerHTML = null;
  comandhistory = [];

}

function clearView() {
  view.innerHTML = null;
}

function clearOutput() {
  outputhistory = [];

}

function clearLog() {
  logsHistory()
}




function writeOutput(data) {
  let outputView = document.getElementById("outputView");
  const outputLine = document.createElement('div');
  outputLine.textContent = data;
  if (outputView != null) {
    outputView.appendChild(outputLine);
  }
  outputhistory.push(outputLine);
}

function terminalLog(data) {
  let logView = document.getElementById("logs");
  const logputLine = document.createElement('div');
  logputLine.textContent = data;
  if (logView != null) {
    logView.appendChild(logputLine);
  }
  logsHistory.push(logputLine);
}


var term = document.getElementById('termLBN');
var out = document.getElementById('ausgLBN');
var controls = document.getElementById('controlLBN');
var logs = document.getElementById('logsLBN');
var additionSLBN=document.getElementById('additionsViewLBN');

term.addEventListener('click', event => {
  state = 'term';
  switchView();
});

out.addEventListener('click', event => {
  state = "out";
  switchView();
});

controls.addEventListener('click', event => {
  state = "controls";
  switchView();
});

logs.addEventListener('click', event => {
  state = "logs";
  switchView();
});

additionSLBN.addEventListener('click', event =>{
  state="additionsView";
  switchView();
})



function switchView() {
  if (state === 'out') {
    cons.innerHTML = null;
    cons.innerHTML = '<div id="outputView"></div>';
    var outWindow = document.getElementById('outputView');
    outputhistory.forEach(element => {
      outWindow.appendChild(element);
    });
  } else if (state === 'term') {
    cons.innerHTML = null;
    cons.innerHTML = '<div id="terminal"></div>';
    terminal = document.getElementById("terminal");
    comandhistory.forEach(element => {
      terminal.appendChild(element);
    });
    initializeTerminal();
  } else if (state === 'controls') {
    cons.innerHTML = null;
    cons.innerHTML = '<div id="topBarC"><div class="tobBarElementC" id="i">Datastrutures</div><div class="tobBarElementC"id="ii">Controlles</div><div id="iii" class="tobBarElementC">DataStructure-Operations</div><div id="iiii"class="tobBarElementC">Settings</div></div><div id="controls"></div>';
    addEventListeners();
    updateListener();
  } else if (state === 'logs') {
    cons.innerHTML = null;
    cons.innerHTML = '<div id="logs"></div>';
    logs = document.getElementById("logs");
    logsHistory.forEach(element => {
      logs.appendChild(element);
    });
  }else if(state==='additionsView'){
    cons.innerHTML=null; 
    cons.innerHTML='<div id="additionsView"></<div>';
    additionsView=document.getElementById('additionsView');
    setAdditions();
  }
}



function exitApp() {
  closeAllWindows();
  ipcRenderer.send('exit', "exit");
}

writeOutput("GraphIT Output:");

function spawn() {
  const list = new LinkedList();
  list.addFirst(1);
  list.addFirst(3);
  list.addFirst(4);
  list.addFirst(5);
  list.addLast(10);
  console.log(list.toArray());



  var listDiv = document.createElement('div');
  view.appendChild(listDiv);

  function addBox(x, y, value) {
    var arrBox = document.createElement('div');
    arrBox.className = "listyBox";
    arrBox.style.left = x + "px";
    arrBox.style.top = y + "px";
    arrBox.textContent = value;
    listDiv.appendChild(arrBox);
  }
  var temp = list.head;
  for (i = 0; i < list.toArray().length; i++) {
    console.log(temp.data);
    addBox(50 + 120 * i, 100, temp.data)
    temp = temp.next;
  }
}




const helpSTR = `Available commands: 
-date
-greet
-help
-clear
-clearview
-preview
-back
-exit
-info
-load <path> <in Planing>
-sll/singel-Linked-list 
-----insertAtEnd   <value>
-----inserAtStart  <value>
-----deletAtEnd    <value>
-----deletAtStart  <value>
-mll/multi-linked-list
-----insertAtEnd   <value>
-----inserAtStart  <value>
-----deletAtEnd    <value>
-----deletAtStart  <value>
-stack
-----push
-----pop
-----peak
-array
-----insertAtIndex
-----replaceValue
-----...
-----array-sort:
----------bubbelsort
----------insertionsort
----------selectionsort
----------
----------bucketsort    <backendImplemented>
----------mergesort     <backendImplemented>
----------cocktailsort  <backendImplemented>
----------combosort     <backendImplemented>
----------cyclesort     <backendImplemented>
----------gnomesort     <backendImplemented>
----------heapsort      <backendImplemented>
----------pancakeSort   <backendImplemented>
----------quicksort     <backendImplemented>
----------radixsort     <backendImplemented>
----------shellsort     <backendImplemented>
----------timesort      <backendImplemented>
-bst/binary-search-tree
-----bst-insert <value>
-----bst-delet <value>
-----traverse:
----------inorder
----------preorder
----------postorder
----------levelorder
-Maxheap 
-----bst 	            <backendImplemented>
-----maxheapify        <backendImplemented>
-----....
-Minheap               <backendImplemented>
-----bst               <backendImplemented>
-----binomialhalde       <backendImplemented>
-----....
-hashTables              <in Planing>
-----openaddressing      <in Planing>
----------Linear Probing    <in Planing>
----------Quadratic Probing <in Planing>
----------Double hashing    <in Planing>
-----closedaddresing     <in Planing>
----------chaining using linked lists   <in Planing>
----------chaining using dynamic arrays <in Planing>
-Graphs    
-----DFA/NFA                 <idee>
----------DFA TO NFA            <idee>
----------NFA TO DFA            <idee>
-----Markierungsalgorithmus  <idee>
-----Deapthfirst search      <idee>
-----bread first search      <idee>
-Greedy
-----stable marige Problem    <idee>
-----backbag Packing          <idee>
-----....
-lookahead                  <idee>
-dynamische programierung   <idee>
-traveling saleesman        <idee>


--------------------------------------------------------------
<backendImplemented> = |not implemented graphically.... coming up (soon (hopefully))  |
<in Planing>         = |not implementet betatestes sepratly made coming up (eventualy)|
<idee>               = |not implementet no idea when and if coming up but planned     |
--------------------------------------------------------------

`;

function spawnHelp() {
  var h = helpSTR.split('\n');
  for (let i = 0; i < h.length; i++) {
    var outputLine = document.createElement('div');
    outputLine.textContent = h[i].toString();
    terminal.appendChild(outputLine);
    comandhistory.push(outputLine);
  }
  initializeTerminal();

}

function back() {
  addition = "";
  viewState = 'none';
}




function displayInfo(vst) {
  var msg = "";
  switch (vst) {
    case 'array':
      msg = "test array";
      break;

    default:
      writeOutput("No VST INFO FOUND");
      break;
  }

  ipcRenderer.send('info', msg);

}


function arrayCreate() {
  var newArray = new array(10, 'graphView');
  activeElements.push(newArray);
  viewState = 'array';
  addition = "/array";
  sidebar.addTextToList('Array');
}

function stackCreate() {
  var newStack = new stack();
  activeElements.push(newStack);
  addition = "/stack";
  viewState = 'stack';
  sidebar.addTextToList('Stack');
}

function binarySearchTreeCreate() {
  var newBst = new BinarySearchTree('graphView');
  activeElements.push(newBst);
  addition = "/BinarySearchTree";
  viewState = 'bst';
  sidebar.addTextToList('Binary-Search-Tree');
}

function SingelLLnkedListCreate() {
  var newSll = new LinkedList('graphView');
  activeElements.push(newSll);
  sidebar.addTextToList('Singel-Linked-List');
  addition = "/SingelLLnkedList";
  viewState = 'sll';
}

function MultiLinkedListCreate() {
  var newMLL = new DoublyLinkedList(false, 'graphView');
  activeElements.push(newMLL);
  addition = "/MultiLinkedList";
  viewState = 'mll';
  sidebar.addTextToList('Multi-Linked-List');

}

function GraphCreate() {
  var newGraph = new Graph('graphView', 800, 800);
  activeElements.push(newGraph);
  addition = "/Graph";
  viewState = 'Graph';
  sidebar.addTextToList('Graph');
}





function sendMoveRequestForChild() {
  ipcRenderer.send("comand", "showVisualSecondScreen");
}

function sendMoveRequestForChildThird() {
  ipcRenderer.send("comand", "showVisualThirdScreen");
}

function sendEndPresentation() {
  ipcRenderer.send("comand", "endPresentation");
}



var touchzone = document.getElementById('touchzone');
touchzone.addEventListener('click', event => {
  controllsWindow = window.open("./modules/controles/controls.html");
  controllsWindow.addEventListener("blur", function () {
    controllsWindow.close();
  });
});

window.addEventListener("message", function (event) {
  console.log(event.data);
  pars(event.data);
});


function isHighlightable(element) {
  var highlightableClasses = [
    'listyBox',
    'listBox',
    'stackBox',
    'arrayBox',
    'bstNode',
    'GraphEdge',
    'GraphNode'
  ];
  console.log("check");
  return highlightableClasses.some(function(className) {
    return element.classList.contains(className);
  });
}

function updateListenerForHighlighting() {
  console.log("Listeners update");
  var elements = view.querySelectorAll('*');

  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      if (isHighlightable(element)) {
        element.classList.toggle('highlighted');
        console.log("OK");
      }
    });

    element.addEventListener('mouseenter', function() {
      if (isHighlightable(element) && !element.classList.contains('highlighted')) {
        element.style.backgroundColor = 'deepskyblue';
        console.log("mousein");
      }
    });

    element.addEventListener('mouseleave', function() {
      if (isHighlightable(element) && !element.classList.contains('highlighted')) {
        element.style.backgroundColor = 'white';
        console.log("mouseOUT");

      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateListenerForHighlighting();
});

function getSelectedDatastructure() {
  updateListenerForHighlighting();
  return activeElements[activeElementIndex];
}

function getInput(type = null) {

  var a = window.open("./modules/inputfield/input.html", 'targetWindow',
    `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=no,
                                    resizable=no,
                                    width=770,
                                    height=420`, "popup");

  return a
}

function getFormattedCharacters(num) {
  let output = '';

  for (let i = 0; i < num; i++) {
    const leadingLetter = String.fromCharCode(65 + (i % 26));
    const repeatingLetter = String.fromCharCode(65 + (i % 26)).repeat(Math.floor(i / 26) + 1);
    output += leadingLetter + repeatingLetter + ' ';
  }

  return output.trim();
}


function randomGenerateGraphLength(graph, length) {
  for (let i = 0; i < length; i++) {
    var newNode = new Node(getFormattedCharacters(i));
    console.log("DONE");
    graph.insertNode(newNode);
  }
  for (let i = 0; i < Math.floor(Math.random() * (length + 1)); i++) {
    graph.insertEdge(Math.floor(Math.random() * (length + 1)), Math.floor(Math.random() * (length + 1)));
  }
  updateListenerForHighlighting();
}

function randomGenerateMLLLength(mll, length) {
  console.log("At random Length create");
  for (let i = 0; i < length; i++) {
    console.log("TATA");
    mll.addFirst(Math.floor(Math.random() * 100) + 1);
  }
  mll.draw();
  updateListenerForHighlighting();

}

function randomGenerateSLLLength(sll, length) {
  for (let i = 0; i < length; i++) {
    sll.addFirst(Math.floor(Math.random() * 100) + 1);
  }
  sll.draw();
  updateListenerForHighlighting();
}

function randomGenerationArrayLength(array, length) {
  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    array.insertAtIndex(randomNumber, i);
  }
  array.draw();
  updateListenerForHighlighting();
}

function randomGenerationBSTLenth(bst, length) {
  console.log(bst);
  for (let i = 0; i < length; i++) {
    bst.insert(Math.floor(Math.random() * 100) + 1);
  }
  bst.draw();
  updateListenerForHighlighting();

}

function randomGenerationStackLength(stack, length) {
  for (let i = 0; i < length; i++) {
    stack.push(Math.floor(Math.random() * 100) + 1);
  }
  stack.draw();
  updateListenerForHighlighting();
}

function randomGenerationArray(array) {
  let length = Math.floor(Math.random() * 50) + 1;
  randomGenerationArrayLength(array, length);
}

function randomGenerationBST(bst) {
  let length = Math.floor(Math.random() * 50) + 1;
  randomGenerationBSTLenth(bst, length);
}

function randomGenerateSLL(sll) {
  let length = Math.floor(Math.random() * 50) + 1;
  randomGenerateSLLLength(sll, length);
}

function randomGenerateMLL(mll) {
  let length = Math.floor(Math.random() * 50) + 1;
  console.log("TESTST");
  randomGenerateMLLLength(mll, length);
}

function randomGenerationStack(stack) {
  let length = Math.floor(Math.random() * 50) + 1;
  randomGenerationStackLength(stack, length);

}

function randomGenerateGraph(graph) {
  let length = Math.floor(Math.random() * 50) + 1;
  randomGenerateGraphLength(graph, length);

}


function defineGenerationArray(array, lenght) {
  for (var i = 0; i < length; i++) {
    array.insertAtIndex(0, i);
  }
  array.update();
}

function definesimpleArray(array, chrs) {
  for (var i = 0; i < chrs.length; i++) {
    array.insertAtIndex(chrs[i], i);
  }
  array.update();
}

function defineGenerationBST(bst) {
  return bst;
}

function defineGenerateSLL(sll) {
  return sll;
}

function defineGenerateMLL(mll) {
  return mll;
}

function defineGenerationStack(stack) {
  return stack;
}

function defineGenerateGraph(graph) {
  return Graph;
}



function checkIfSelectedIS(name) {
  console.log("AchtiveAlementIndex: " + activeElementIndex);
  console.log("output" + sidebar.textArray[activeElementIndex]);
  console.log(sidebar.textArray[activeElementIndex] + "|     |" + name);
  if (sidebar.textArray[activeElementIndex] == name) {
    console.log("LOG:TRUE");
    return true;
  }
  return false;
}


function clearSelectedDS() {
  getSelectedDatastructure().clearDS();
}

function reomoveSelectedDS() {
  activeElements.splice(activeElementIndex, activeElementIndex);
  sidebar.removeTextFromList(activeElementIndex);
  activeElementIndex = -1;
}






export function pars(command) {
  switch (command) {
    case 'clear view':
      clearView();
      break;
    case 'clear output':
      clearOutput();
      break;
    case 'clear terminal':
      Clear();
      break;
    case "presentation":
      previewCMD();
      break;
    case "back":
      back();
      break;
    case "ZOOM-IN":
      zoomIn();
      break;
    case "ZOOM-OUT":
      zoomOut();
      break;
    case "ZOOM-PREVIEW-OUT":
      zoomOutPrev();
      break;
    case "ZOOM-PREVIEW-IN":
      zoomInPrev();
      break;
    case "ZOOM-Preview-AUTO":
      toomAutoPrev();
      break;
    case "EXIT":
      exitApp();
    case "Presentation-to-Second-Screen":
      sendMoveRequestForChild();
      break;
    case "Presentation-to-Third-Screen":
      sendMoveRequestForChildThird();
      break;
    case "End-Presentation":
      sendEndPresentation();
      break;
    case "Binary-Search-Tree":
      binarySearchTreeCreate();
      initializeTerminal();
      break;
    case "Singel-Linked-List":
      SingelLLnkedListCreate();
      initializeTerminal();
      break;
    case "Multi-Linked-List":
      MultiLinkedListCreate();
      initializeTerminal();
      break;
    case "Stack":
      stackCreate();
      initializeTerminal();
      break;
    case "Array":
      arrayCreate();
      initializeTerminal();
      break;
    case "Graph":
      GraphCreate();
      initializeTerminal();
      break;
    case "Clear-Selected":
      clearSelectedDS();
      break;
    case "Remove-Selected":
      reomoveSelectedDS();
      break;
    case "Array-insert":
      if (checkIfSelectedIS("Array")) {
        var lbs = ['Index', 'Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        console.log("Test:" + numIN);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().insertAtIndex(event.data[1], event.data[0]);
          }
        });
      }
      break;
    case "Array-Create":
      if (checkIfSelectedIS("Array")) {
        var lbs = ['Length'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        console.log("Test:" + numIN);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().arrayCreateLength(event.data[0]);
          }
        });
      }
      break;
    case "Array-Simple-Creation":
      definesimpleArray(getSelectedDatastructure(), ['a', 'b', 'c']);
      break;
    case "Array-Random-Create":
      if (checkIfSelectedIS("Array")) {
        randomGenerationArray(getSelectedDatastructure());
      }
      break;
    case "Array-Random-Length-Create":
      console.log("test");
      if (checkIfSelectedIS("Array")) {
        var lbs = ['Length'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        console.log("Test:" + numIN);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().setLength(length);
            randomGenerationArrayLength(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "Array-Bubbelsort":
      if (checkIfSelectedIS("Array")) {
        getSelectedDatastructure().bubbleSortArray();
      }
      break;
    case "Array-insertionSort":
      if (checkIfSelectedIS("Array")) {
        getSelectedDatastructure().insertionSortArray();
      }
      break;
    case "Array-selectionSort":
      if (checkIfSelectedIS("Array")) {
        getSelectedDatastructure().selectionSortArray();
      }
      break;
    case "BST-Random-Create":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        console.log("BSTCREATE RANDOM");
        randomGenerationBST(getSelectedDatastructure());
      }
      break;
    case "BST-Random-Create-Length":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            randomGenerationBSTLenth(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "BST-Insert":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().insert(event.data[0]);
            getSelectedDatastructure().update();
          }
        });
      }
      break;
    case "BST-Remove":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().remove(event.data[0]);
            getSelectedDatastructure().update();
          }
        });
      }
      break;
    case "BST-Traverse-Inorder":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        getSelectedDatastructure().animateInOrderTraversal(getSelectedDatastructure().root);
      }
      break;
    case "BST-Traverse-Preorder":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        getSelectedDatastructure().animatePreOrderTraversal(getSelectedDatastructure().root);
      }
      break;
    case "BST-Traverse-Postorder":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        getSelectedDatastructure().animatePostOrderTraversal(getSelectedDatastructure().root);
        break;
      }
    case "BST-Traverse-Levelorder":
      if (checkIfSelectedIS("Binary-Search-Tree")) {
        getSelectedDatastructure().animateLevelOrderTraversal(getSelectedDatastructure().root);
      }
      break;
    case "Stack-Random-Generate":
      if (checkIfSelectedIS("Stack")) {
        randomGenerationStack(getSelectedDatastructure());
      }
      break;
    case "Stack-Random-Generate-Length":
      if (checkIfSelectedIS("Stack")) {
        var lbs = ['Length'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            randomGenerationStack(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "Stack-Push":
      if (checkIfSelectedIS("Stack")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        console.log("PUSHPUSHPUSH");
        let set = false;
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            console.log(event);
            if (set == false) {
              getSelectedDatastructure().push(event.data[0]);
              set = true;
            }
          }
        });
      }
      break;
    case "Stack-pop":
      if (checkIfSelectedIS("Stack")) {
        getSelectedDatastructure().pop();
      }
      break;
    case "Stack-peak":
      if (checkIfSelectedIS("Stack")) {
        getSelectedDatastructure().peak();
      }
      break;
    case "SLL-Random-Create":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        randomGenerateSLL(getSelectedDatastructure());
      }
      break;
    case "SLL-Random-Creat-Length":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        var lbs = ['List length'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            randomGenerateSLLLength(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "SLL-Insert-End":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        var lbs = ['Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().addLast(event.data[0]);
          }
        });
      }
      break;
    case "SLL-Insert-Begining":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        var lbs = ['Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().addFirst(event.data[0]);
          }
        });
      }
      break;
    case "SLL-Inser-At-Index":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        var lbs = ['index', 'Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().insertAtIndex(event.data[0], event.data[1]);
          }
        });
      }
      break;
    case "SLL-Remove-Start":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        getSelectedDatastructure().removeFirst();
      }
      break;
    case "SLL-Remove-End":
      if (checkIfSelectedIS("Singel-Linked-List")) {
        getSelectedDatastructure().removeLast();
      }
      break;
    case "MLL-Random-Create":
      if (checkIfSelectedIS("Multi-Linked-List")) {
        randomGenerateMLL(getSelectedDatastructure());
      }
      break;
    case "MLL-Random-Creat-Length":
      if (checkIfSelectedIS("Multi-Linked-List")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            randomGenerateMLLLength(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "MLL-Insert-End":
      if (checkIfSelectedIS("Multi-Linked-List")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().addLast(event.data[0]);
          }
        });
      }
      break;
    case "MLL-Insert-Begin":
      if (checkIfSelectedIS("Multi-Linked-List")) {
        var lbs = ['Value'];
        var numIN = new numberInput(1, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().addFirst(event.data);
          }
        });
      }
      break;
    case "MLL-Remove-End":
      if (checkIfSelectedIS("Multi-Linked-List")) {}
      getSelectedDatastructure().removeLast();
      break;
    case "MLL-Remove-Begin":
      if (checkIfSelectedIS("Multi-Linked-List")) {}
      getSelectedDatastructure().removeFirst();
      break;
    case "Graph-Tiefensuche":
      if (checkIfSelectedIS("Graph")) {
        getSelectedDatastructure().tiefensuche();
      }
      break;
    case "Graph-Breitensuche":
      if (checkIfSelectedIS("Graph")) {
        getSelectedDatastructure().breitensuche();
      }
      break;
    case "Graph-Insert":
      if (checkIfSelectedIS("Graph")) {
        var lbs = ['Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().insertNode(event.data[0]);
          }
        });
      }
      break;
    case "Graph-Remove":
      if (checkIfSelectedIS("Graph")) {
        var lbs = ['Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            getSelectedDatastructure().removeNode(event.data[0]);
          }
        });
      }
      break;
    case "Graph-Random-Create":
      if (checkIfSelectedIS("Graph")) {}
      randomGenerateGraph(getSelectedDatastructure());
      break;
    case "Graph-Rendom-Lenght-Create":
      if (checkIfSelectedIS("Graph")) {
        var lbs = ['Value'];
        var numIN = new numberInput(2, "ArrayInsertDialog", lbs);
        window.addEventListener('message', (event) => {
          if (Array.isArray(event.data)) {
            randomGenerateGraphLength(getSelectedDatastructure(), event.data[0]);
          }
        });
      }
      break;
    case "Graph-ResetColor":
      if (checkIfSelectedIS("Graph")) {
        getSelectedDatastructure().resetColor();
      }
      break;
    default:
      break;
  }

}






function zoomInPrev() {
  ipcRenderer.send("updateZoomPrev", "in");
}

function zoomOutPrev() {
  ipcRenderer.send("updateZoomPrev", "out");
}

function toomAutoPrev() {
  ipcRenderer.send("updateZoomPrev", "fit");
}







function processCMD(command) {
  switch (command) {
    case 'date':
      output = new Date().toString();
      break;
    case 'greet':
      output = 'Hello, world!';
      break;
    case 'help':
      output = "";
      spawnHelp();
      break;
    case 'create':
      output = 'What do you want to create?';
      break;
    case 'sll':
    case 'singel-Linked-list':
      output = 'Singel-Linked-list Spawned';
      SingelLLnkedListCreate();
      break;
    case 'mll':
    case 'multi linked list':
    case 'multilinkedlist':
      MultiLinkedListCreate();
      break;
    case 'clear':
      output = "";
      Clear();
      break;
    case 'clearview':
    case 'clear view':
      output = "View Is cleared";
      clearView();
      break;
    case 'clear output':
    case 'clearoutput':
      output = "Clead Output";
      clearOutput();
      break;
    case 'exit':
    case 'exit()':
      exitApp();
      break;
    case 'array':
      arrayCreate();
      break;
    case 'bst':
    case 'binarySearchTree':
    case 'binary-search-tree':
      binarySearchTreeCreate();
      break;
    case 'back':
      back();
      break;
    case 'stack':
      stackCreate();
      break;
    case 'preview':
      previewCMD();
      break;
    case 'info':
      displayInfo(viewState);
      break;
    case 'Graph':
    case 'graph':
      GraphCreate();
      break;
    default:
      output = 'Command not found';
      break;
  }
  return output;
}


ipcRenderer.on("logChannel", (event, data) => {
  addLog(data);
});

ipcRenderer.on("errorChannel", (event, data) => {
  addError(data);
});

ipcRenderer.on("warningChannel", (event, data) => {
  addWarning(data);
});

initSettings();


ipcRenderer.on('menueBar', (event, data) => {

});

ipcRenderer.on('startupMsg', (event, data) => {
  console.log(data);
});

var pointertogle=false;
var movetogle=false;

const switchElementPointer = document.getElementById('pointertoggle');
switchElementPointer.addEventListener('change', function() {

  const pointer = document.getElementById('toggleSwitchPointer');
  pointertogle=!pointertogle;
  

});

const switchElementMove = document.getElementById('movetogle');
switchElementMove.addEventListener('change', function() {
  movetogle=!movetogle;
});

document.addEventListener('mousemove', function(event) {
  var laser = document.getElementById('laser');
  
  if (pointertogle) {
    laser.style.left = event.clientX + 'px';
    laser.style.top = event.clientY + 'px'; 
    laser.classList.remove('hidden'); 
  }else{
    laser.classList.add('hidden');
  }
});

document.addEventListener('keydown', function(event) {
 
 if(movetogle){

  if (event.key === 'ArrowDown') {
  
    ipcRenderer.send('scroll', 'down');
  } else if (event.key === 'ArrowUp') {
 
    ipcRenderer.send('scroll', 'up');
  } else if (event.key === 'ArrowLeft') {
 
    ipcRenderer.send('scroll', 'left');
  } else if (event.key === 'ArrowRight') {
 
    ipcRenderer.send('scroll', 'right');
  }
}
if (event.key === 'Tab') {
  var switchElementMove = document.getElementById('toggleSwitchMove');
  switchElementMove.checked = !switchElementMove.checked; 
  movetogle=!movetogle;

}
});

function closeAllWindows(){
  ipcRenderer.send('closeAllWindows','*')
}



function setAdditions(){
  if (checkIfSelectedIS("Graph")) {
    console.log("Binary tre object should be: "+getSelectedDatastructure());
    var adjMatrix=getSelectedDatastructure().gettAdjazentMatrix();
    console.log(adjMatrix);
    createAdjazenzMatrix(getSelectedDatastructure());
  }
}

function getNewAdjmatrixBox(val){
  var box =document.createElement('div');
  box.innerText=val;
  box.style.height='100px';
  if(val==0){ 
    box.style.backgroundColor='lightred';
  }else{
    box.style.backgroundColor='lightgreen';
  }
  box.style.textAlign="center";
  return box;
} 

function createAdjazenzMatrix(graph){
  var adjMatrix=graph.gettAdjazentMatrix();
  additionsView.innerHTML=null;
  var adjMatrixContainer =document.createElement('div');
  adjMatrixContainer.id="adjazenzmatrixcontainer";
  adjMatrixContainer.classList.add("additionsElement");
  var fr="1fr ";
  var frStr=`${fr.repeat(adjMatrix.lenght)}`;
  adjMatrixContainer.style.display="grid";
  adjMatrixContainer.style.gridTemplateColumns=frStr;
  additionsView.appendChild(adjMatrixContainer);
console.log("AdjmatrixLength:"+adjMatrix.lenght);
  for(let i =0; i<adjMatrix.lenght;i++){
    for(let j=0;j<adjMatrix[i].lenght;j++){
      adjMatrixContainer.appendChild(getNewAdjmatrixBox(adjMatrix[i][j]));
    }
  }
}


