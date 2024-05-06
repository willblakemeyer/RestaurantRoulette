var slider = document.getElementById("slider");

async function getGeolocation(address) {
  var apiKey = 'AIzaSyDqNQz1JWjLjCKNDnobimxrlPnozzjdO0U';
  var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + apiKey;
  // Make a request to the Geocoding API
  return await fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
          // Check if the request was successful
          if (data.status === 'OK') {
              var location = data.results[0].geometry.location;

              var latitude = location.lat;
              var longitude = location.lng;
              
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);
              return [latitude,longitude];
          } else {
              console.error('Geocode was not successful for the following reason:', data.status);
              return "";
          }
      })
      .catch(error => {
          console.error('Error fetching geolocation:', error);
          return "";
      });
  }


async function verifyAndUseLoc() {
  var lat, long;
  var locVal = document.getElementById("locationEntered").value;
  
  //check if format is lat. / long.:
  var lc_locVal = locVal.toLowerCase();
  if (lc_locVal.substring(0, 4) == "lat:") {
    var spltLoc = lc_locVal.split("lat: ")[1];

    lat = Number(spltLoc.split(", long: ")[0]);
    long = Number(spltLoc.split(", long: ")[1]);
    

  } else {
    //validate address... if invalid, return false. Else, define latitude and longitude.
    //Notes:
    //convert to lat / long example request (missing API key):
    // http://maps.google.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
    //how to set up auto complete field: https://www.youtube.com/watch?v=c3MjU9E9buQ&ab_channel=GoogleMapsPlatform
    //---
    getGeolocation(locVal).then(coordinates => {
      console.log(coordinates);
      if (coordinates != "") {
        pos = {coords:{longitude:coordinates[0],latitude:coordinates[1]}};
        ask_api(pos);
        localStorage.setItem("Latitude", coordinates[0]);
        localStorage.setItem("Longitude", coordinates[1]);
        coordinates = "";
    
        setTimeout(() => {window.location.replace("wheel.html")}, 1000);
      }
    });
  }

  if (typeof lat !== "undefined" && typeof long !== "undefined") {
    //store lat. / long. in local storage & redirect to wheel.html

    var pos = {coords:{longitude:long,latitude:lat}};
    ask_api(pos);
    localStorage.setItem("Latitude", lat);
    localStorage.setItem("Longitude", long);

    setTimeout(() => {window.location.replace("wheel.html")}, 1000);
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
  pos = {coords:{longitude:position.coords.longitude,latitude:position.coords.latitude}};
  var location = [position.coords.latitude, position.coords.longitude];
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

  input.value = "Lat: " + location[0] + ", Long: " + location[1];
}

function callback(results, status) {
  var restaurants = [];
  var stars = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      restaurants.push(results[i].name);
      stars.push(results[i].rating);
    }
    localStorage.restaurants = JSON.stringify(restaurants);
    localStorage.stars = JSON.stringify(stars);
  }
}
