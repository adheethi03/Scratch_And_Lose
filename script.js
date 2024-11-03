const imgEl = document.getElementById('random-image');
const btn = document.getElementById('btn');

const srcArray = ['images1.jpg', 'images2.jpg','images4.jpg', 'images6.jpg', 'images7.jpg', 'images8.jpg', 'images9.jpg','images11.jpg','images12.jpg' ];

let index;

randomImage();
function randomImage(){
    const randomIndex = Math.floor(Math.random()*srcArray.length);
   if(randomIndex !== index){

    imgEl.src = srcArray[randomIndex];
    index = randomIndex;

   } else {
        randomImage();
   }
}

// scrathing


let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#b2cdd1");
  gradientColor.addColorStop(1, "#94bbe9");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 1000, 1000);
};

//initially mouse X and mouse Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Start Scratch
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  //Get x and y position
  getXY(event);
  scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

//stop drawing
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

//If mouse leaves the square
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out draws new shapes behind the existing canvas content
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc makes circle - x,y,radius,start angle,end angle
  context.arc(x, y, 90, 0, 2 * Math.PI);
  context.fill();
  
};

window.onload = init();