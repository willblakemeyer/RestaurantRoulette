function helloWorld() {
  var locationEntered = document.getElementById("locationEntered").value;
  alert("Searching " + locationEntered + " for the best place to eat!");
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
