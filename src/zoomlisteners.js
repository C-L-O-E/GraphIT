var view = document.getElementById('graphView');
var zoomInBtn = document.getElementById('zoomIn');
var zoomOutBtn = document.getElementById('zoomOut');
var links = document.getElementsByClassName('custom-link');
var labels = document.getElementsByClassName('custom-label');
var zoomLevel = 1;
var zoomStep = 0.3;

zoomInBtn.addEventListener('click', (event) => {
  zoomIn();
});

zoomOutBtn.addEventListener('click', (event) => {
  zoomOut();
});

export function zoomIn() {
  zoomLevel += zoomStep;
  view.style.zoom = zoomLevel;
}


export function zoomOut() {
  zoomLevel -= zoomStep;
  view.style.zoom = zoomLevel;
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('mouseover', function () {
    this.style.cursor = 'pointer';
  });

  links[i].addEventListener('mouseout', function () {
    this.style.cursor = 'auto';
  });
}

for (var i = 0; i < labels.length; i++) {
  labels[i].addEventListener('mouseover', function () {
    this.style.cursor = 'pointer';
  });

  labels[i].addEventListener('mouseout', function () {
    this.style.cursor = 'auto';
  });
}