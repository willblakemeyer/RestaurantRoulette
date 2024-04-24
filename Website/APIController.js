// We will have classes and functions that interact with Google's API in here.

class APIController {
    constructor() {
        this.userIP;
        this.location;
        this.userData;
    }

    getInfo() {
        $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
            this.userData = JSON.stringify(data, null, 2);
          });
    }
}
let map;
let center;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  center = { lat: 37.4161493, lng: -122.0812166 };
  map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 11,
    // ...
  });
  findPlaces();
}

async function findPlaces() {
  const { Place } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const request = {
    textQuery: "Tacos in Mountain View",
    fields: ["displayName", "location", "businessStatus"],
    includedType: "restaurant",
    locationBias: { lat: 37.4161493, lng: -122.0812166 },
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
  };
  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location);
      console.log(place);
    });
    map.fitBounds(bounds);
  } else {
    console.log("No results");
  }
}

initMap();