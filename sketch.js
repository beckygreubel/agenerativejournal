// calling the inital parameters = x and y are the starting points, rgb are the colors, w and h are the width and height of the created ellipse, and fr is the starting frames per second (how fast it draws);
let x;
let y;

let r;
let g;
let b;

let w = 10;
let h = 10;

let fr = 120;

// setting the top and bottom RGB values for the fill
let maxR = 200;
let maxG = 255;
let maxB = 200;

let minR = 150;
let minG = 150;
let minB = 150;

//setting the top and bottom amount of color change possible
let maxChangeR = 1;
let maxChangeG = 1;
let maxChangeB = 1;

let minChangeR = -1;
let minChangeG = -1;
let minChangeB = -1;

function setup() {
    if (windowWidth < 800){
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent('myCanvas');
    }
  
  colorMode(RGB);
  
  // setting the starting point 
  x = width/2;
  y = height/2;
  
  
  // setting the initial colors
  r = map(noise(x,y), 0, 1, minR, maxR);
  g = map(noise(x,y), 0,1, minG, maxG);
  b = map(noise(x,y), 0, 1, minB, maxB);
  
  frameRate(fr);
  
  noStroke();
}

function draw() {

  // using a dice to randomly move the line;
  var randomValue = random(TWO_PI);
  let lastRandom=0;
  //to avoid similar direction;
  if (abs(randomValue-lastRandom)> (PI/3)){
    lastRandom=randomValue;
    x+=w*cos(lastRandom);
    y+=w*sin(lastRandom);
  }
  
  // wrap around left and right sides
  if(x < 0){
    x = width;
  }
  else if(x > width){
    x = 0;
  }
  
  // wrap around top and bottom sides
  if(y < 0){
    y = height;
  }
  else if(y > height){
    y = 0;
  }
  
  fill(r, g, b,70);
  
  ellipse(x, y,w*noise(x,y)*1.5);
  ellipse(-x, y, w*noise(x,y)*1.5);
  ellipse(-x, -y, w*noise(x,y)*1.5);
  ellipse(x, -y, w*noise(x,y)*1.5);
  
  // randomly change color by an amount within the allowed change
  r += random(minChangeR,maxChangeR);
  g += random(minChangeG,maxChangeG);
  b += random(minChangeB,maxChangeB);
  
  // constraining the RGB values so they don't go outside of the set maxes and mins
  r = r%255;
  g = g%255;
  b = b%255;

}