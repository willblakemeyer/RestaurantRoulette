function verifyAndUseLoc() {
  var lat, long;
  var locVal = document.getElementById("locationEntered").value;
  
  //check if format is lat. / long.:
  var lc_locVal = locVal.toLowerCase();
  if (lc_locVal.substring(0,4) == "Lat:") {

    var spltLoc = lc_locVal.split("Lat: ")[0];

    lat  = (int)(spltLoc.split(", Long: ")[0]);
    long = (int)(spltLoc.split(", Long: ")[1]);

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
    return navigator.geolocation.getCurrentPosition(ask_api);
  } else {
    return alert("Geolocation is not supported by this browser.");
  }
}

//Takes from the input from user. Function should be built right under here

//Request the data from API or webscraper????

function ask_api(position) {
  var location = [position.coords.longitude, position.coords.latitude];
  console.log(location);
  var input = document.getElementById("locationEntered");
  input.value = "Lat: "+location[0]+", Long: "+location[1];



  // this code will not run for now...
  return;
  const link = `https://www.google.com/maps/search/food+near+me/@${location[0]},${location[1]},17z/data=!3m1!4b1?entry=ttu`;

  var webpage = new XMLHttpRequest();
  webpage.open("get", link);
  webpage.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  webpage.send();
  console.log(webpage.response);
}
