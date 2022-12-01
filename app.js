const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "black";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

//only color when mouse is down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//adding functions to the buttons
const grid = document.querySelector('.grid');
const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.eraser');
const resetBtn = document.querySelector('.reset');
const colorPicker = document.querySelector('.colorPicker');
const sizeSlider = document.querySelector('.sizeSlider');
const sizeDisplay = document.querySelector('.sizeDisplay');

colorPicker.oninput = (e)=> setColor(e.target.value);
sizeSlider.oninput = (e)=> setSize(e.target.value);
colorBtn.onclick = ()=> setMode("color");
rainbowBtn.onclick = ()=> setMode("rainbow");
eraserBtn.onclick = ()=> setMode("eraser");

resetBtn.onclick = ()=> {
    grid.innerHTML = '';
    MakeGrid(DEFAULT_SIZE);
}

//setters
function setMode(newMode){
  currentMode = newMode;
}

function setColor(color){
  currentColor = color;
}

function setSize(size){
  sizeDisplay.innerHTML = `${size} x ${size}`;
  grid.innerHTML = '';
  currentSize = size;
  MakeGrid(currentSize);
}

function defaultSetting(){
  grid.innerHTML = '';
  MakeGrid(DEFAULT_SIZE);
  currentMode = DEFAULT_MODE;
  currentColor = DEFAULT_COLOR;
  sizeDisplay.innerHTML = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
}

//Make grid
function MakeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div');
      gridElement.classList.add('grid-element');
      gridElement.addEventListener('mouseover', changeColor);
      gridElement.addEventListener('mousedown', changeColor);
      grid.appendChild(gridElement);
    }
}

//Change color depends on the mode
function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;

    if(currentMode === "color"){
      e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === "eraser"){
      e.target.style.backgroundColor = "white";
    }
    else if(currentMode === "rainbow"){
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

defaultSetting();