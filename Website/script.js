var slider = document.getElementById("slider");
var locationC

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
        pos = {coords:{latitude:coordinates[0],longitude:coordinates[1]}};
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

    var pos = {coords:{latitude:lat,longitude:long}};
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

window.display_map = function(latitude, longitude) {
  var directionsDisplay, directionsService, mapping;

  directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // var start = new google.maps.LatLng(lat, long);
  var current = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: current,
    mapId: "main_map",
  };

  var mapping = new google.maps.Map(
    document.getElementById("map_canvas"),
    mapOptions
  );
}

function milesToMeters(miles) {
  return miles * 1609;
}

function ask_api(position) {
  pos = {coords:{latitude:position.coords.latitude,longitude:position.coords.longitude}};
  locationC = [position.coords.latitude, position.coords.longitude];
  var current = new google.maps.LatLng(locationC[0], locationC[1]);
  var map;
  var service;
  var input = document.getElementById("locationEntered");

  map = new google.maps.Map(document.getElementById("map_canvas"), {
    center: current,
    zoom: 15,
  });
  var restaurantTypes = document.querySelectorAll('input[name="prompt"]');
  var restaurantType = "";
  for(let i=0; i< restaurantTypes.length; i++) {
    if (restaurantTypes[i].checked)
      restaurantType = restaurantTypes[i].value;
  }
  console.log(restaurantType);
  // alert(restaurantType);
  var request = {
    location: current,
    radius: `${milesToMeters(slider.value)}`, //This is in meters
    query: "restaurants "+restaurantType,
    rankby: "distance"
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  input.value = "Lat: " + locationC[0] + ", Long: " + locationC[1];
}

function callback(results, status) {
  var restaurants = [];
  var stars = [];
  var open = [];
  var addresses = [];
  var geolocations = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      if (getDistanceFromLatLonInM(
        results[i].geometry.location.lat(),
        results[i].geometry.location.lng(),
        locationC[0],
        locationC[1]
      ) > milesToMeters(slider.value)) {
        continue;
      }
      geolocations.push([
        results[i].geometry.location.lat(),
        results[i].geometry.location.lng()
      ]);
      restaurants.push(results[i].name);
      stars.push(results[i].rating);
      open.push(results[i].opening_hours.open_now);
      addresses.push(results[i].formatted_address);
    }
    
    localStorage.restaurants = JSON.stringify(restaurants);
    localStorage.stars = JSON.stringify(stars);
    localStorage.open = JSON.stringify(open);
    localStorage.geolocations = JSON.stringify(geolocations);
    localStorage.addresses = JSON.stringify(addresses);
  }
}


//copied from stackoverflow; adjusted from Km to meters.
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d*1000;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}