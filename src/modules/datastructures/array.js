export default class array {
    constructor(length, viewId) {
        this.length = length;
        this.arr = new Array(length).fill(0);
        this.view = document.getElementById(viewId);
        this.arrayDiv = document.createElement('div');
        this.arrayDiv.className = "arrayView";
        this.view.appendChild(this.arrayDiv);
        this.size = 80;
        this.x = 100;
        this.y = 100;
    }

    newBox(value) {
        var html = '<a>' + value + '</a>';
        var box = document.createElement('div');
        box.className = 'arrayBox';
        box.innerHTML = html;
        return box;
    }

    draw() {
        for (var i = 0; i < this.length; i++) {
            var temp = this.newBox(this.arr[i]);
            temp.style.position = "absolute"
            temp.style.top = (this.y) + "px";
            temp.style.left = (this.x + i * this.size) + "px";
            this.arrayDiv.appendChild(temp);
        }
    }

    update() {
        this.arrayDiv.innerHTML = null;
        this.draw();
    }
    clearDS() {
        this.clearArray();
    }
    clearArray() {
        this.arr = []
        this.length = 0;
        this.update()
    }

    setLength(lenght) {
        this.length = length;
        this.update();
    }

    insertAtIndex(value, index) {
        this.arr[index] = value;
        console.log("Value:" + value + "at index " + index);
        this.update();
    }

    getIndex(index) {
        return arr[index];
    }

    setIndex(index, value) {
        arr[index] = value;
    }

    bubbleSortArray() {
        setArr(this);
        bubbleSort(this);
    }

    selectionSortArray() {
        setArr(this);
        selectionSort(this);
    }

    insertionSortArray() {
        setArr(this);
        insertionSort(this);
    }

}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

var animationSpeed = 10;

var arr = null;

function setArr(array) {
    arr = array;
}


async function swap(indexOne, indexTwo) {
    var elements = document.querySelectorAll('.arrayBox');
    var elemOne = elements[indexOne];
    var elemTwo = elements[indexTwo];
    var one = arr.getIndex(indexOne);
    var two = arr.getIndex(indexTwo);
    arr.setIndex(indexOne, two);
    arr.setIndex(indexTwo, one);
    console.log(one);
    console.log(two);
    for (var i = 0; i < 80; i++) {
        elemOne.style.left = elemOne.offsetLeft + 1 + "px";
        elemTwo.style.left = elemTwo.offsetLeft - 1 + "px";
        await Sleep(animationSpeed);
    }
}






async function swapE(indexOne, indexTwo) {
    var elements = document.querySelectorAll('.arrayBox');
    var elemOne = elements[indexOne];
    var elemTwo = elements[indexTwo];
    var one = arr.getIndex(indexOne);
    var two = arr.getIndex(indexTwo);
    arr.setIndex(indexOne, two);
    arr.setIndex(indexTwo, one);
    for (var i = 0; i < 90; i++) {
        elemOne.style.top = elemOne.offsetTop - 1 + "px";
        elemTwo.style.top = elemTwo.offsetTop - 1 + "px";
        await Sleep(animationSpeed);
    }
    for (var i = 0; i < 80 * (indexTwo - indexOne) - 1; i++) {
        elemOne.style.left = elemOne.offsetLeft + 1 + "px";
        elemTwo.style.left = elemTwo.offsetLeft - 1 + "px";
        await Sleep(animationSpeed);
    }
    for (var i = 0; i < 90; i++) {
        elemOne.style.top = elemOne.offsetTop + 1 + "px";
        elemTwo.style.top = elemTwo.offsetTop + 1 + "px";
        await Sleep(animationSpeed);
    }
}

async function shiftToRightByOne(indexStart, indexEnd) {
    var elements = document.querySelectorAll('.arrayBox');
    for (var i = indexEnd - 1; i >= indexStart; i--) {
        var elem = elements[i];
        for (var j = 0; j < 80; j++) {
            elem.style.left = elem.offsetLeft + 1 + "px";
            await Sleep(animationSpeed);
        }
    }
    return true;
}

async function takeout(index) {
    var elements = document.querySelectorAll('.arrayBox');
    var takeoutElement = elements[index];
    for (var i = 0; i < 90; i++) {
        takeoutElement.style.top = takeoutElement.offsetTop - 1 + "px";
        await Sleep(animationSpeed);
    }
    return true;
}






async function jumpToindex(elem, index) {
    let x = 80 + 80 * index;
    let y = 250;
    let currenty = elem.offsetTop;
    let currentx = elem.offsetLeft;
    let diffY = 0;
    let diffX = 0;
    while (currentx != x || currenty != y) {
        diffX = x - currentx;
        diffY = y - currenty;
        elem.style.left = elem.offsetLeft + diffX + "px";
        elem.style.top = elem.offsetTop + diffY + "px";
        currentx += diffX;
        currenty += diffY;
        await Sleep(animationSpeed + 200);
    }
    return true;
}


async function longShiftSwap(takeOutIndex, PutInIndex) {
    var elements = document.querySelectorAll('.arrayBox');
    var takeoutElement = elements[takeOutIndex];

    for (var i = 0; i < 90; i++) {
        takeoutElement.style.top = takeoutElement.offsetTop - 1 + "px";
        await Sleep(animationSpeed);
    }
    shiftToRightByOne(PutInIndex, takeOutIndex);
    for (var i = takeOutIndex; i > PutInIndex; i--) {
        elements[i] = elements[i - 1];
    }
    elements[PutInIndex] = takeoutElement;
    for (var j = 0; j < 80 * (takeOutIndex - PutInIndex); j++) {
        takeoutElement.style.left = takeoutElement.offsetLeft - 1 + "px";
        await Sleep(animationSpeed);
    }

    for (var i = 0; i < 90; i++) {
        takeoutElement.style.top = takeoutElement.offsetTop + 1 + "px";
        await Sleep(animationSpeed);
    }

    return true;
}

async function bubbleSort(arr) {
    var len = arr.length;
    var swapped;

    do {
        swapped = false;

        for (var i = 0; i < len - 1; i++) {
            if (arr.arr[i] > arr.arr[i + 1]) {
                var temp = arr.arr[i];
                arr.arr[i] = arr.arr[i + 1];
                arr.arr[i + 1] = temp;
                swapped = true;
                console.log('Swapped:', i, i + 1, arr.arr);
                await swap(i, i + 1);
            } else {
                console.log('Not swapped:', -1, -1, arr.arr);
            }
            arr.update();
        }

        len--;
    } while (swapped);

    return arr.arr;
}


async function insertionSort(arr) {
    var elements = document.querySelectorAll('.arrayBox');
    for (let i = 1; i < arr.arr.length; i++) {
        arr.update();

        await Sleep(animationSpeed);
        let einzusortierender_wert = arr.arr[i];
        let j = i;
        while (j > 0 && arr.arr[j - 1] > einzusortierender_wert) {
            arr.arr[j] = arr.arr[j - 1];
            j--;
        }

        if (j != i) {
            await longShiftSwap(i, j);
            arr.update();

        }
        arr.arr[j] = einzusortierender_wert;
        console.log(`Runde ${i}: Verschiebung von Index ${i} nach Index ${j}`);
        console.log(arr.arr);
        arr.update();

    }
    for (let j = 0; j < 10; j++) {
        elements[j].style.backgroundColor = "lightgreen";
        console.log("Done");
    }
    return arr;
}






async function selectionSort(arr) {
    var elements = document.querySelectorAll('.arrayBox');
    var smalestVal = -1;
    var index = -1;
    var newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (smalestVal == -1 && arr[j] != -1) {
                smalestVal = arr[j];
                index = j;
            } else if (smalestVal > arr[j] && smalestVal != -1 && arr[j] != -1) {
                smalestVal = arr[j];
                index = j;
            }
        }
        await jumpToindex(elements[index], i);

        console.log("Move index: " + index + " value " + smalestVal + " to " + i);
        newArr.push(arr[index]);
        smalestVal = -1;
        arr[index] = -1;
        index = -1;
    }
    return newArr;
}