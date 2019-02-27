const canvas = document.querySelector("#draw");

//drawing on the context
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

// simulates mouse up or down
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop function from running, when they are not moused down
  console.log(e);

  // this is where we set the color of the storke
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  //this is where we draw
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  /*
  lastX = e.offsetX;
  lastY = e.offsetY;
  same as: 
  */
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;

  // if linewidth is smaller than hundred, increase it. once reached, flip it and decrease it.
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  // setting the initial position to where the mouse is.
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
