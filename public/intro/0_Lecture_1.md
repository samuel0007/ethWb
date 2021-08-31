# Lecture 1: Vectors

Before we dive into more of the details about vectors, let’s look at a basic Processing example that demonstrates why we should care about vectors in the first place. If you’ve read any of the introductory Processing textbooks or taken a class on programming with Processing (and hopefully you’ve done one of these things to help prepare you for this book), you probably, at one point or another, learned how to write a simple bouncing ball sketch.

<iframe width=450 height=450  src="https://preview.p5js.org/samuel0007/embed/TFOpt0YN8" style="margin: 0 auto;"></iframe>

## Example 1.1

~~~js
let rays = [];
let dists = [];

let shapes = [];
let Epsilon = 1;
let y,x;
let goingDown = true;
let speed = 0.5;
let intersected = [];
let r;
let checkbox;
let player;

function setup() {
  rectMode(CENTER);
  createCanvas(400, 400);
  shapeOne = new Shape(createVector(width / 2, height / 4), "square", 100);
  shapes.push(shapeOne);
  y = height / 4;
  x = 0;
  r = 0;
  checkbox = createCheckbox('Show sphere tracing', false);
  player = new Particle(0,0);
}

function draw() {
  background(220);

  if (keyIsDown(LEFT_ARROW)) {
    if(player.anchor.x>0) player.anchor.x -= 5;
  } else if(keyIsDown(RIGHT_ARROW)) {
    if(player.anchor.x<width) player.anchor.x+= 5;
  }
  if(keyIsDown(UP_ARROW)) {
    if(player.anchor.y>0) player.anchor.y -= 5;
  } else if(keyIsDown(DOWN_ARROW)){
    if(player.anchor.y<height/2) player.anchor.y+= 5;
  }

  player.updateLook();
  let anchor = player.getPos();
  // Has to be refactorised
  let radius = 1;
  let offset =  player.getHeading();

  for (let theta = -40; theta < 40; theta+=0.1) {
    let s = anchor.copy();
    s.add(cos(radians(theta)+offset)*radius, sin(radians(theta)+offset)*radius);
    let ray = new Ray(anchor, s);
    rays.push(ray);
  }


  for (let i = 0; i < rays.length; ++i) {
    dists.push(rays[i].cast());
  }

  for (let i = 0; i < rays.length; ++i) {
    rays[i].show();
  }
  rays = [];

  fill("white");
  for (let i = 0; i < shapes.length; ++i) {
    shapes[i].show();
  }

  for (let i = 0; i < intersected.length; ++i) {
    let el = intersected[i];
    fill("red");
    circle(el.x, el.y, 2);
  }
  push();
  translate(0, height/2);
  noStroke();
  fill("black");
  rect(width/2, height/2, width, height);
  const w = width/dists.length;
  for(let i = 0; i < dists.length; ++i){
    if(dists[i] != Infinity) {
        let sq = dists[i]*dists[i];
        let c = map(sq, 0, width*width/3, 240, 100)
        let h = map(sq, 0, width*width, height/2, 0)
        fill(c);
        rect(w/2+i*w, height/4, w+1, h);
        

    } else {
        fill("black");
        rect(w/2+i*w, height/2, w+1, height);

    }
  }
  pop();
  
  dists = [];

}

function mousePressed() {
  shapeOne = new Shape(createVector(mouseX, mouseY), "circle", random(10, 100));
  shapes.push(shapeOne);
}

~~~
