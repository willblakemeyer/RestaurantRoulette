//Blake variables
var restaurantNames = ["El Testo Restuaranto", "Bob's Burgers", "Texas Cafe","","",""];
var restaurantStars = [2,4,5,1,3,4];
//---

var restaurants = 4;
var numberOfTimes = 2;
var lines = 360 / (restaurants * numberOfTimes);
var angle = 0;
var startAngleVel = 0.005;
var angleVel = startAngleVel;
var angleMultAccel = 1.03;
var angleAccel = 0.01;
// var angleMultAccel = 1;
var counter = 0;
var doSpin = false;
var doStop = false;
var counterStopAmt = 60*3;

function setup() {
  var canvas = createCanvas(400, 400);

  canvas.parent("funny-wheel");
  frameRate(60);
}

function spinWheel() {
  if (doStop == false && doSpin == false) {
    counter = 0;
    doSpin = true;  
  }
}

function draw() {
  translate(width / 2, height / 2);

  // let angle = frameCount * 0.1;
  angle = (angle-angleVel)%360;

  if (doSpin) {
    angleVel = Math.min(0.5,angleVel+angleAccel);
    // angleVel = Math.min(2,angleVel*angleMultAccel);
    counter++;
    if (counter >= counterStopAmt) {
      doSpin = false;
      doStop = true;
      counter = 0;
    }
  } else if (doStop) {
    angleVel = Math.floor(Math.min(2,angleVel/((angleMultAccel-1)/4+1))*100000)/100000;
    if (angleVel <= 0) {
      //select restaurant and show results (for now we just revert back to original state after 2 seconds of waiting.)
      var delay = setTimeout(function() {doStop = false}, 2000);
    }
  } else {
    angleVel = startAngleVel;
  }
  rotate(angle);
  drawWheel();
}

function drawWheel() {
  let numSegments = restaurantStars.reduce((partialSum, a) => partialSum + a, 0);
  let segmentAngle = TWO_PI / numSegments;
  let rotation = 0;

  for (let i = 0; i < restaurantNames.length; i++) {
    colorMode(RGB,100)
    let hue = 90-100/numSegments*i/4;
    let c1 = (i%3==0) ? hue : hue/2*((i%2+i%3)-1);
    let c2 = (i%3==1) ? hue : hue/2*((i%2+i%3)-1);
    let c3 = (i%3==2) ? hue : hue/2*((i%2+i%3));
    fill(c1*0.9, c2*0.9, c3*0.9);
    colorMode(RGB,255)
    stroke(0);
    strokeWeight(2);
    arc(0, 0, 300, 300, (rotation) * segmentAngle, (rotation+restaurantStars[i]) * segmentAngle, PIE);
    rotation+=restaurantStars[i];
  }
  // #FABC2A
  // R:250, G:188, B:42
  colorMode(RGB,255)
  fill(250,188,42);
  circle(0,0,200);


//   for (let i = 0; i < numSegments; i += lines) {
//     let startAngle = i * segmentAngle;
//     let endAngle = (i + lines) * segmentAngle;
//     stroke(255, 255, 0); 
//     strokeWeight(4);
//     line(0, 0, 150 * cos(startAngle), 150 * sin(startAngle));
//     stroke(255, 0, 0); 
//     line(0, 0, 150 * cos(endAngle), 150 * sin(endAngle));
//   }
}
