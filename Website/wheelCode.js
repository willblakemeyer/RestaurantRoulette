//Defaults!
var restaurantNames = ["El Testo Restuaranto", "Bob's Burgers", "Texas Cafe","KFC","McDonald's","Wendy's"];
var restaurantStars = [1,4,2,4,3,4];
//---
//Overwrite defaults...
restaurantNames = JSON.parse(localStorage.restaurants);
restaurantStars = JSON.parse(localStorage.stars);
var restaurantAddress = JSON.parse(localStorage.addresses);
var restaurantOpen = JSON.parse(localStorage.open);
var restaurantLocation = JSON.parse(localStorage.geolocations);
var lat = localStorage.getItem("Latitude");
var long = localStorage.getItem("Longitude");
//---

const twoPI = Math.PI*2;
var colors = generateRandomColors(restaurantNames.length);
var scale1 = 1.3
var restaurants = 4;
var numberOfTimes = 2;
var lines = 360 / (restaurants * numberOfTimes);
var angle = 0;
var angleDeg = 0;
var startAngleVel = 0.005;
var angleVel = startAngleVel;
var angleMultAccel = 1.03;
var angleAccel = 0.01;
// var angleMultAccel = 1;
var counter = 0;
var doSpin = false;
var doStop = false;
var counterStopAmt = 60*3;
var curRestaurant = "";
var curAddress = "";
var curRestOpen = "";
var curLocation = "";
var delaySet = false;
var randAccel = 0;
var randAccelDiv = 1000;
var readOffset = Math.PI*0.5;

function setup() {
  var canvas = createCanvas(400, 400);

  canvas.parent("funny-wheel");
  frameRate(60);
  display_map(lat,long);
}

function selectRestaurant() {
  //show on map & update fields on GUI
  display_map(curLocation[0],curLocation[1]);
  
  var lastRestaurant = document.getElementById("lastRestuarant");
  var lastAddress = document.getElementById("lastAddress");
  var lastRestOpen = document.getElementById("lastRestOpen");
  lastRestaurant.innerHTML = "Restaurant: "+curRestaurant;
  lastAddress.innerHTML = "Address: "+curAddress;
  lastRestOpen.innerHTML = "Is Open: "+((curRestOpen) ? "Yes" : "No");
}

function spinWheel() {
  if (doStop == false && doSpin == false) {
    counter = 0;
    doSpin = true;  
    randAccel = Math.random()/randAccelDiv;
  }
}

function draw() {
 
  background(163,22,33);
  stroke(0,0,0);

  strokeWeight(2);
  translate(width / 2, height / 2);

  // let angle = frameCount * 0.1;
  // angle = angle-angleVel;
  angle = (angle+angleVel)%twoPI;

  if (doSpin) {
    angleVel = Math.min(0.5,angleVel+angleAccel+randAccel);
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
      //select restaurant and show results (for now we just revert back to original state after 1 second of waiting.)
      if (!delaySet) {
        delaySet = true;
        var delay = setTimeout(function() {
          doStop = false;
          selectRestaurant();
          angleVel = startAngleVel;
          delaySet = false;
        }, 1000);  
      }
        // doStop = false;
        // selectRestaurant();
        // angleVel = startAngleVel;
    }
  } else {
    angleVel = startAngleVel;
  }
  rotate(angle);
  drawWheel();
  
  textSize(25);
  rotate(-angle);
  textAlign("center");
  fill("black");
  strokeWeight(30);
  textWidth = 200;
  stroke("white");
  text("v", -(textWidth/2), -240, textWidth);
  strokeWeight(0) //was 10, but caused overlap with wheel.
  // stroke(250,188,42);
  text(curRestaurant, -(textWidth/2), -90, textWidth);
  textSize(20)
  strokeWeight(0) //was 5.
  text(curAddress, -(textWidth)/1.75, 10, textWidth*1.15);
  // window.valuesArr = [];
  // let numSegments = restaurantStars.reduce((partialSum, a) => partialSum + a, 0);
  // let segmentAngle = TWO_PI / numSegments;
  // let rotation = 0;
  
  // for (let i = 0; i < restaurantNames.length; i++) {
  //   window.valuesArr.push([(angle+(rotation) * segmentAngle)%twoPI,(angle+(rotation+restaurantStars[i]) * segmentAngle)%twoPI]);
  //   line(0, 0, 150 * cos(angle+(rotation) * segmentAngle), 150 * sin(angle+(rotation) * segmentAngle));
  //   rotation+=restaurantStars[i];
  //   strokeWeight(3);
  //   stroke(255, 100, 100);
  // }

  // console.log(window.valuesArr);
}

function drawWheel() {
  let numSegments = restaurantStars.reduce((partialSum, a) => partialSum + a, 0);
  let segmentAngle = TWO_PI / numSegments;
  let rotation = 0;
  
  for (let i = 0; i < restaurantNames.length; i++) {

    colorMode(RGB,255)
    fill(colors[i]);
    var anglePI = (angle+twoPI)%twoPI;
    if ((angle+(rotation) * segmentAngle+readOffset)%twoPI > (angle+(rotation+restaurantStars[i]) * segmentAngle+readOffset)%twoPI) {
      curRestaurant = restaurantNames[i];
      curAddress = restaurantAddress[i];
      curRestOpen = restaurantOpen[i];
      curLocation = [restaurantLocation[i][0],restaurantLocation[i][1]];
    }
    // console.log(angle);
    // console.log(angleDeg);
    // colorMode(RGB,100)
    // let hue = 90-100/numSegments*i/4;
    // let c1 = (i%3==0) ? hue : hue/2*((i%2+i%3)-1);
    // let c2 = (i%3==1) ? hue : hue/2*((i%2+i%3)-1);
    // let c3 = (i%3==2) ? hue : hue/2*((i%2+i%3));
    // fill(c1*0.9, c2*0.9, c3*0.9);
    stroke(0);
    strokeWeight(2);
    arc(0, 0, 300 * scale1, 300 * scale1, (rotation) * segmentAngle, (rotation+restaurantStars[i]) * segmentAngle, PIE);
    rotation+=restaurantStars[i];
  }
  // #FABC2A
  // R:250, G:188, B:42
  colorMode(RGB,255)
  fill(250,188,42);
  circle(0,0,200 * scale1);

  strokeWeight(0);
  stroke(250,188,42);
  line(0, 0, 150 * cos(-angle-readOffset), 150 * sin(-angle-readOffset));
}

function display_map(latitude, longitude) {
  var directionsDisplay, directionsService, mapping;

  directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var start = new google.maps.LatLng(lat,long);
  var current = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: current,
    mapId: "main_map"
  };

  var mapping = new google.maps.Map(
    document.getElementById("map_canvas"),
    mapOptions
  );

  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: mapping,
    position: current,
    title: 'place',
});

 if (curRestaurant != "") {
  var request = {
    origin: start,
    destination: current,
    optimizeWaypoints: true,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
};

directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];

  }
});
 }

  directionsDisplay.setMap(mapping);
}
