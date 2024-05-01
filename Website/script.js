
var slider = document.getElementById("slider");

function verifyAndUseLoc() {
  var lat, long;
  var locVal = document.getElementById("locationEntered").value;
  
  //check if format is lat. / long.:
  var lc_locVal = locVal.toLowerCase();
  if (lc_locVal.substring(0,4) == "lat:") {
    var spltLoc = lc_locVal.split("lat: ")[1];

    lat  = Number(spltLoc.split(", long: ")[0]);
    long = Number(spltLoc.split(", long: ")[1]);

  } else {
    //validate address... if invalid, return false. Else, define latitude and longitude.


    //Notes:
      //convert to lat / long example request (missing API key):
      // http://maps.google.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
      //how to set up auto complete field: https://www.youtube.com/watch?v=c3MjU9E9buQ&ab_channel=GoogleMapsPlatform
    //---


  }

  if (typeof lat !== "undefined" && typeof long !== "undefined") {
    //store lat. / long. in local storage & redirect to wheel.html

    localStorage.setItem("Latitude",lat);
    localStorage.setItem("Longitude",long);

    window.location.replace("wheel.html");
    return;
  }
}

function helloWorld() {
  var locationEntered = document.getElementById("locationEntered").value;
  alert("Searching " + locationEntered + " for the best place to eat!");
}

function fillLocation() {
  var input = document.getElementById("locationEntered");
  input.value = getLocation();
}

function currentLocation() {
  alert("Searching based on your current location...");
}

//There should be 2 major functions. One that takes the data from your computer and one from the input that you put in

//Takes from your computer location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ask_api);
  } else {
    return alert("Geolocation is not supported by this browser.");
  }
}

function milesToMeters(miles) {
  return miles * 1609;
}

function ask_api(position) {
  var location = [position.coords.longitude, position.coords.latitude];
  var current = new google.maps.LatLng(location[1], location[0]);
  var map;
  var service;
  var input = document.getElementById("locationEntered");
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: current,
    zoom: 15,
  });

  var request = {
    location: current,
    radius: `${milesToMeters(slider.value)}`, //This is in meters
    query: "restaurants near me",
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  
  input.value = "Lat: "+location[0]+", Long: "+location[1];
}

function callback(results, status) {
  var resturants = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      resturants.push(results[i].name);
    }
    localStorage.resturants = JSON.stringify(resturants);
  }
}


