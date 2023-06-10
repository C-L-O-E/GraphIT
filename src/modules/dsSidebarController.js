import {
  updateActiveSelectedIndex
} from './terminal.js';

export default class DataStructureView {
  constructor() {
    this.textArray = [];
    this.datastructureView = document.getElementById("datastructureView");
    this.datastructureView.addEventListener("click", this.handleClick.bind(this));
  }

  addTextToList(text) {
    this.textArray.push(text);

    const listItem = document.createElement("a");
    listItem.className = "dsTextElement";
    listItem.textContent = text;
    this.datastructureView.appendChild(listItem);
  }

  removeTextFromList(index) {
    if (index >= 0 && index < this.textArray.length) {
      this.textArray.splice(index, 1);
      this.datastructureView.removeChild(this.datastructureView.childNodes[index]);
    }
  }

  handleClick(event) {
    const index = Array.from(this.datastructureView.childNodes).indexOf(event.target);
    this.displayTextWithIndex(this.textArray[index], index);
    updateActiveSelectedIndex(index);
    Array.from(this.datastructureView.childNodes).forEach((element) => {
      element.style.backgroundColor = 'rgb(39, 39, 47)';
    });

    event.target.style.backgroundColor = 'rgb(41, 47, 58)';
  }

  displayTextWithIndex(text, index) {
    console.log("Text:", text);
    console.log("Index:", index);
  }
}