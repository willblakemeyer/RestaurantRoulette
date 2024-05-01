let restaurants = 4;
let numberOfTimes = 2;
let lines = 360 / (restaurants * numberOfTimes);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  let angle = frameCount * 0.1;

  rotate(angle);
  drawWheel();
}

function drawWheel() {
  let numSegments = 12;
  let segmentAngle = TWO_PI / numSegments;

  for (let i = 0; i < numSegments; i++) {
    colorMode(HSL,100)
    let hue = 360/12*i/4; 
    fill(hue, hue, 50);
    colorMode(RGB,100)
    stroke(0);
    strokeWeight(2);
    arc(0, 0, 300, 300, i * segmentAngle, (i + 1) * segmentAngle, PIE);
  }


  for (let i = 0; i < numSegments; i += lines) {
    let startAngle = i * segmentAngle;
    let endAngle = (i + lines) * segmentAngle;
    stroke(255, 255, 0); 
    strokeWeight(4);
    line(0, 0, 150 * cos(startAngle), 150 * sin(startAngle));
    stroke(255, 0, 0); 
    line(0, 0, 150 * cos(endAngle), 150 * sin(endAngle));
  }
}
