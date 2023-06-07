import array from './datastructures/array.js';
import LinkedList from './datastructures/sll.js';
import DoublyLinkedList from './datastructures/mll.js'
import stack from './datastructures/stack.js';
import DataStructureView  from './dsSidebarController.js';
import BinarySearchTree from './datastructures/bst.js';
import { zoomIn,zoomOut } from '../zoomlisteners.js';
import Graph from './graph/graph.js';


var sidebar = new DataStructureView();

var controllsWindow=null;

var view = document.getElementById("graphView");
var cons=document.getElementById('downPart');

//the array for active elements that are used
//there to save project data later on
var activeElements=[];

//activly selected Element
var activeElementIndex=-1;

//update the activeselectedindex
export function updateActiveSelectedIndex(index) {
  activeElementIndex = index;
  writeOutput("Load: " + sidebar.textArray[activeElementIndex]);
}
//state varible to indicate the current state we are in
var state='term';
var addition="";
var viewState="none";
//Define buffer to save comands and outputs
var comandhistory=[];
var outputhistory=[];

// terminal output
let output = '';

// Get the terminal element
var terminal = document.getElementById('terminal');

// Create a function to process the entered command
function processCommand(command) {
  

  // Process the command
 output=processCMD(command);
  

  // Display the command output
  const outputLine = document.createElement('div');
  outputLine.textContent = output;
  terminal.appendChild(outputLine);
  comandhistory.push(outputLine);

  // Create a new input line
  const inputLine = document.createElement('div');
  inputLine.id = 'input-line';
  inputLine.innerHTML = '<span>GraphIT'+addition+'></span> <input id="input" autofocus>';

  // Replace the current input line with the new one
  const input = inputLine.querySelector('#input');
  input.addEventListener('keydown', handleInput);
  terminal.appendChild(inputLine);
  input.focus();
}

// Handle the Enter key press event
function handleInput(event) {
  if (event.key === 'Enter') {
    const input = event.target;
    const command = input.value.trim();

    // Process the command
    processCommand(command);

    // Clear the input field
    input.value = '';
    input.disabled = true;
  }
}

// Initialize the terminal with an input line
function initializeTerminal() {
  const inputLine = document.createElement('div');

  inputLine.id = 'input-line';
  inputLine.innerHTML = '<span>GraphIT'+addition+'></span> <input id="input" autofocus>';

  const input = inputLine.querySelector('#input');
  input.addEventListener('keydown', handleInput);
  terminal.appendChild(inputLine);
  comandhistory.push(inputLine);
  input.focus();
  
}



// Start the terminal
initializeTerminal();

function previewCMD(){
  ipcRenderer.send("comand","showVisual");
}

function Clear(){
  terminal.innerHTML=null;
  comandhistory=[];

}

function clearView(){
  view.innerHTML=null;
}

function clearOutput(){
  outputhistory=[];

}
//==================================================
//          Start Output section 
//==================================================

function writeOutput(data){
  let outputView =document.getElementById("outputView");
  const outputLine = document.createElement('div');
  outputLine.textContent = data;
  if(outputView!=null){
    outputView.appendChild(outputLine);
  }
  outputhistory.push(outputLine);
}


//==================================================
//          End Output section
//==================================================


//==================================================
//    Event listener section
//==================================================
//add the elements as vars 
var term= document.getElementById('termLBN');
var out= document.getElementById('ausgLBN');
var controls=document.getElementById('controlLBN');

term.addEventListener('click', event=>{
  state='term';
  switchView();
});

out.addEventListener('click', event=>{
  state="out";
  switchView();
});

controls.addEventListener('click', event=>{
  state="controls";
  switchView();
});


//==================================================
//    End of Event listener section
//==================================================



//==================================================
//          Switch Section
//==================================================

function switchView(){
  if(state==='out'){
        cons.innerHTML=null;
        cons.innerHTML='<div id="outputView"></div>';
        var outWindow=document.getElementById('outputView');
        outputhistory.forEach(element => {
          outWindow.appendChild(element);
        });
    }else if(state==='term'){
      cons.innerHTML=null;
      cons.innerHTML='<div id="terminal"></div>';
      terminal=document.getElementById("terminal");
      comandhistory.forEach(element => {
        terminal.appendChild(element);
      });
      initializeTerminal();
  }else if(state==='controls'){
    cons.innerHTML=null;
    cons.innerHTML='<div id="controls"></div>';
  }
}


//==================================================
//         End of  Switch Section
//==================================================


function exitApp() {
  ipcRenderer.send('exit',"exit");
}

writeOutput("GraphIT Output:");

function spawn(){
  const list =new LinkedList();
  list.addFirst(1);
  list.addFirst(3);
  list.addFirst(4);
  list.addFirst(5);
  list.addLast(10);
  console.log(list.toArray());



  var listDiv=document.createElement('div');
  view.appendChild(listDiv);
  function addBox(x,y,value){
    var arrBox=document.createElement('div');
    arrBox.className="listyBox";
    arrBox.style.left=x+"px";
    arrBox.style.top=y+"px";
    arrBox.textContent=value;
    listDiv.appendChild(arrBox);
}
  var temp=list.head;
  for(i=0;i<list.toArray().length;i++){
        console.log(temp.data);  
        addBox(50+120*i,100,temp.data)
        temp=temp.next;
  }
}

//=============================================================
//                       Help section
//=============================================================
const helpSTR= `Available commands: 
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
-sll/singel-linked-list 
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

function spawnHelp(){
  var h=helpSTR.split('\n');
  for(let i=0; i<h.length;i++){
    var outputLine = document.createElement('div');
    outputLine.textContent = h[i].toString();
    terminal.appendChild(outputLine);
    comandhistory.push(outputLine);
  }
  initializeTerminal();
      
}

function back(){
      addition="";
      viewState='none';
}

//=============================================================
//             end of help section
//=============================================================


//=============================================================
//             display info  section
//=============================================================

function displayInfo(vst){
  var msg="";
  switch (vst) {
    case 'array':
      msg="test array";
      break;
  
    default:
      writeOutput("No VST INFO FOUND");
      break;
  }

  ipcRenderer.send('info',msg);
  
}

//=============================================================
//             end of display info section
//=============================================================



//=============================================================
//             Array controll section
//=============================================================
function arrayCreate(){
  var newArray = new array(10,'graphView');
  activeElements.push(newArray);
  viewState='array';
  addition="/array";
  sidebar.addTextToList('Array');
  
}

function stackCreate(){
  var newStack= new stack();
  activeElements.push(newStack);
  addition="/stack";
  viewState='stack';
  sidebar.addTextToList('Stack');
}

function binarySearchTreeCreate(){
  var newBst = new BinarySearchTree();
  activeElements.push(newBst);
  addition="/BinarySearchTree";
  viewState='bst';
  sidebar.addTextToList('BinarySearchTree');
  
}

function SingelLinkedListCreate(){
  var newSll=new LinkedList('graphView');
  activeElements.push(newSll);
  sidebar.addTextToList('Singel-Linked-List');
  addition="/SingelLinkedList";
  viewState='sll';
}

function MultiLinkedListCreate(){
  var newMLL=new DoublyLinkedList(false,'graphView');
  activeElements.push(newMLL);
  addition="/MultiLinkedList";
  viewState='mll';
  sidebar.addTextToList('Multi-linked-List');

}

function GraphCreate(){
  var newGraph=new Graph('graphView',800,800);
  activeElements.push(newGraph);
  addition="/Graph";
  viewState='Graph';
  sidebar.addTextToList('Graph');
}

//=============================================================
//             end of Array Controll Section
//=============================================================

function sendMoveRequestForChild(){
  ipcRenderer.send("comand","showVisualSecondScreen");
}

function sendEndPresentation(){
  ipcRenderer.send("comand","endPresentation");
}


//=============================================================
//            touch section
//=============================================================

var touchzone=document.getElementById('touchzone');
  touchzone.addEventListener('click',event=>{
  controllsWindow=window.open("./modules/controles/controls.html");
});

window.addEventListener("message", function(event) {
  console.log(event.data);
  pars(event.data);
});

//=============================================================
//          end of  touch sectoion 
//=============================================================

// Listener hinzufügen
document.addEventListener('DOMContentLoaded', function() {
  // Div-Element mit der ID "graphView" auswählen


  // Alle Elemente innerhalb des Divs auswählen
  var elements = view.querySelectorAll('*');

  // Durch die Liste der Elemente iterieren
  elements.forEach(function(element) {
    // Listener für jedes Element hinzufügen
    element.addEventListener('click', function() {
      // Überprüfen, ob das Element die Klasse "my-class" hat
      if (element.classList.contains('listyBox')) {
        // Hintergrundfarbe des Elements ändern
        if(element.style.backgroundColor!='yellow'){
          element.style.backgroundColor = 'yellow';
        }else{
          element.style.backgroundColor='white';
        }
      }
    });
  });


  elements.forEach(function(element) {
    // Listener für jedes Element hinzufügen
    element.addEventListener('mouseenter', function() {
      // Überprüfen, ob das Element die Klasse "my-class" hat
      if (element.classList.contains('listyBox')) {
        // Hintergrundfarbe des Elements ändern
        if(element.style.backgroundColor!='yellow'){
          element.style.backgroundColor = 'deepskyblue';
        }
      }
    });
  });

  elements.forEach(function(element) {
    // Listener für jedes Element hinzufügen
    element.addEventListener('mouseleave', function() {
      // Überprüfen, ob das Element die Klasse "my-class" hat
      if (element.classList.contains('listyBox')) {
        // Hintergrundfarbe des Elements ändern
        if(element.style.backgroundColor!='yellow'){
          element.style.backgroundColor = 'white';
        }
      }
    });
  });

});

function getSelectedDatastructure(){
  return activeElements[activeElementIndex];
}

//helping functions
function getFormattedCharacters(num) {
  let output = '';

  for (let i = 0; i < num; i++) {
    const leadingLetter = String.fromCharCode(65 + (i % 26));
    const repeatingLetter = String.fromCharCode(65 + (i % 26)).repeat(Math.floor(i / 26) + 1);
    output += leadingLetter + repeatingLetter + ' ';
  }

  return output.trim();
}


function randomGenerateGraphLength(graph,lenght){
  for (let i = 0; i < length; i++) {
    var newNode = new Node(getFormattedCharacters(i));
    graph.insertNode(newNode);
  }
  for(let i=0;i< Math.floor(Math.random() * (length + 1));i++){
    graph.insertEdge( Math.floor(Math.random() * (length + 1)), Math.floor(Math.random() * (length + 1)));
  }
}
function randomGenerateMLLLength(mll,length){
  for (let i = 0; i < length; i++) {
    mll.addFirst(Math.floor(Math.random() * 100) + 1);
  }
  mll.draw();

}

function randomGenerateSLLLength(sll,length){
  for (let i = 0; i < length; i++) {
    sll.addFirst(Math.floor(Math.random() * 100) + 1);
  }
  sll.draw();
}

function randomGenerationArrayLength(array,length){
  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    array.insertAtIndex(randomNumber,i);
  }
  arr.update();
}

function randomGenerationBSTLenth(bst,lenght){
  for (let i = 0; i < length; i++) {
    bst.insert(Math.floor(Math.random() * 100) + 1);
  }
  
  bst.draw();

}

function randomGenerationStackLength(stack,length){
  for (let i = 0; i < length; i++) {
    stack.addFirst(Math.floor(Math.random() * 100) + 1);
  }
  stack.draw();
}

//random generate section
function randomGenerationArray(array){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerationArrayLength(array,length);
}

function randomGenerationBST(bst){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerationBSTLenth(bst,length);
}

function randomGenerateSLL(sll){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerateSLLLength(sll,length);
}

function randomGenerateMLL(mll){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerateMLLLength(mll,length);
}

function randomGenerationStack(stack){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerationStackLength(stack,length);
  
}

function randomGenerateGraph(graph){
  let length=Math.floor(Math.random() * 50) + 1;
  randomGenerateGraphLength(graph,length);
 
}


//defineed generate section
function defineGenerationArray(array){
  return array;
}

function defineGenerationBST(bst){
  return bst;
}

function defineGenerateSLL(sll){
  return sll;
}

function defineGenerateMLL(mll){
  return mll;
}

function defineGenerationStack(stack){
  return stack;
}

function defineGenerateGraph(graph){
  return Graph;
}


//check for types
function checkIfSelectedIS(name){
  if(sidebar.textArray[activeElementIndex]==name){
       return true;   
  }
    return false;
}


//=============================================================
//            pars section
//=============================================================

function pars(command){
  switch (command) {
    case 'clear view':
      clearView();
      break;
    case'clear output':
      clearOutput();
      break;
    case'clear terminal':
      Clear();
      break;
    case"presentation":
      previewCMD();
      break;
    case"back":
      back();
      break;
    case"ZOOM-IN":
      zoomIn();
      break;
    case"ZOOM-OUT":
      zoomOut();
      break;
    case"ZOOM-PREVIEW-OUT":
      zoomOutPrev();
      break;
    case"ZOOM-PREVIEW-IN":
      zoomInPrev();
      break;
    case"ZOOM-Preview-AUTO":
      toomAutoPrev();
      break;
    case"EXIT":
      exitApp();
    case"Presentation-to-Second-Screen":
      sendMoveRequestForChild();
      break;
    case"End-Presentation":
      sendEndPresentation();
      break;
    case"Binary-Search-Tree":
      binarySearchTreeCreate();
      initializeTerminal();
      break;
    case"Singel-linked-List":
      SingelLinkedListCreate();
      initializeTerminal();
      break;
    case"Mulit-Linked-List":
      MultiLinkedListCreate();
      initializeTerminal();
      break;
    case"Stack":
      stackCreate();
      initializeTerminal();
      break;
    case"Array":
      arrayCreate();
      initializeTerminal();
      break;
    case"Graph":
      GraphCreate();
      initializeTerminal();
      break;
    case "Array-insert":
        // Code for Array-insert function
        break;
    case "Array-Create":
        if(checkIfSelectedIS("Array")){
            
        }
        break;
    case "Array-Random-Create":
        if(checkIfSelectedIS("Array")){
          randomGenerationArray(getSelectedDatastructure());
        }
        break;
    case "Array-Random-Length-Create":
        if(checkIfSelectedIS("Array")){
          
        }
        break;
    case "Array-Bubbelsort":
        if(checkIfSelectedIS("Array")){
          
        }
        break;
    case "Array-insertionSort":
        if(checkIfSelectedIS("Array")){
          
        }
        break;
    case "Array-selectionSort":
        if(checkIfSelectedIS("Array")){
            
        }
        break;
    case "BST-Random-Create":
        // Code for BST-Random-Create function
        break;
    case "BST-Insert":
        // Code for BST-Insert function
        break;
    case "BST-Remove":
        // Code for BST-Remove function
        break;
    case "BST-Traverse-Inorder":
        // Code for BST-Traverse-Inorder function
        break;
    case "BST-Traverse-Preorder":
        // Code for BST-Traverse-Preorder function
        break;
    case "BST-Traverse-Postorder":
        // Code for BST-Traverse-Postorder function
        break;
    case "BST-Traverse-Levelorder":
        // Code for BST-Traverse-Levelorder function
        break;
    case "Stack-Push":
        // Code for Stack-Push function
        break;
    case "Stack-pop":
        // Code for Stack-pop function
        break;
    case "Stack-peak":
        // Code for Stack-peak function
        break;
    case "SLL-Insert-End":
        // Code for SLL-Insert-End function
        break;
    case "SLL-Insert-Begining":
        // Code for SLL-Insert-Begining function
        break;
    case "SLL-Remove-Start":
        // Code for SLL-Remove-Start function
        break;
    case "SLL-Remove-End":
        // Code for SLL-Remove-End function
        break;
    case "MLL-Insert-End":
        // Code for MLL-Insert-End function
        break;
    case "MLL-Insert-Begin":
        // Code for MLL-Insert-Begin function
        break;
    case "MLL-Remove-End":
        // Code for MLL-Remove-End function
        break;
    case "MLL-Remove-Begin":
        // Code for MLL-Remove-Begin function
        break;
    case "Graph-Tiefensuche":
        // Code for Graph-Tiefensuche function
        break;
    case "Graph-Breitensuche":
        // Code for Graph-Breitensuche function
        break;
    case "Graph-Insert":
        // Code for Graph-Insert function
        break;
    case "Graph-Remove":
        // Code for Graph-Remove function
        break;
    case "Graph-Random-Create":
        // Code for Graph-Random-Create function
        break;
    case "Graph-Rendom-Lenght-Create":
        // Code for Graph-Rendom-Lenght-Create function
        break;
    case "Graph-ResetColor":
        // Code for Graph-ResetColor function
        break;
    default:
      break;
  }
 
}


//=============================================================
//          end of pars sectoion 
//=============================================================

function zoomInPrev(){
  ipcRenderer.send("updateZoomPrev","in");
}

function zoomOutPrev(){
  ipcRenderer.send("updateZoomPrev","out");
}
function toomAutoPrev(){
  ipcRenderer.send("updateZoomPrev","fit");
}


//=============================================================
//             comand section
//=============================================================


function processCMD(command){
  switch (command) {
    case 'date':
      output = new Date().toString();
      break;
    case 'greet':
      output = 'Hello, world!';
      break;
    case 'help':
      output="";
      spawnHelp();
      break;
    case 'create':
      output = 'What do you want to create?';
      break;
    case 'sll':
    case 'singel-linked-list':
      output = 'Singel-linked-list Spawned';
      SingelLinkedListCreate();
      break;
    case'mll':
    case'multi linked list':
    case'multilinkedlist':
      MultiLinkedListCreate();
      break;
    case 'clear':
      output="";
      Clear();
      break;
    case 'clearview':
    case 'clear view':
      output="View Is cleared";
      clearView();
      break;
    case'clear output':
    case'clearoutput':
      output="Clead Output";
      clearOutput();
      break;
    case'exit':
    case'exit()':
      exitApp();
      break;
    case'array':
      arrayCreate();
      break;
    case'bst':
    case'binarySearchTree':
    case'binary-search-tree':
      binarySearchTreeCreate();
      break;
    case'back':
      back();
      break;
    case'stack':
     stackCreate();
      break;
    case'preview':
      previewCMD();
      break;
    case'info':
      displayInfo(viewState);
      break;
    case'Graph':
    case'graph':
      GraphCreate();
      break;
    default:
      output = 'Command not found';
      break;
  }
  return output;
}

//=============================================================
//             end of comand section
//=============================================================

//window.open("./modules/inputfield/input.html");