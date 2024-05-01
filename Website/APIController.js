// We will have classes and functions that interact with Google's API in here.
      
      var map;
      var service;
      var infowindow;

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(initialize);
        } else {
          alert("Hahaha this doesn't work");
        }
      }

      function milesToMeters(miles) {
        return miles * 1609;
      }

      //By default it is about 500 m ~ . Just made it more american so we can understand/ Input is in miles
      function initialize(position, dist = ".31") {
        var location = [position.coords.longitude, position.coords.latitude];
        var current = new google.maps.LatLng(location[1], location[0]);

        map = new google.maps.Map(document.getElementById("map"), {
          center: current,
          zoom: 15,
        });

        var request = {
          location: current,
          radius: `${milesToMeters(dist)}`, //This is in meters
          query: "restaurants near me",
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
      }

      function callback(results, status) {
        var resturants = [];
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            resturants.push(results[i].name);
          }
          alert(resturants);
        }
      }