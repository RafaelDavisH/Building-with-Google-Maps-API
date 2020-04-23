// url to locations API 
endpoint =
  "https://raw.githubusercontent.com/RafaelDavisH/profile-database/master/locations";

// * Basic fetch request declaration
function fetchLocations() {
  const api = fetch(endpoint);
  api
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      createMarkers(data);
    })
    .catch(handleError);
}

function handleError(err) {
  console.log("Huston we have a problem!");
  console.log(err);
}

let map, infowindow;
function initMap() {
  const losAngeles = { lat: 34.042053, lng: -118.235848 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });

  fetchLocations();
}

function createMarkers(locations) {
  for (let i = 0; i < locations.length; i++) {
    let marker = new google.maps.Marker({
      position: locations[i].latlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: locations[i].title,
      content: locations[i].content
    });

    infowindow = new google.maps.InfoWindow({});

    marker.addListener("click", function() {
      populateInfoWindow(marker, infowindow);
      setBounce(marker);
      infowindow.open(map, marker);
    });
  }
}

function setBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(
    function() {
      marker.setAnimation(null);
    }.bind(marker),
    1400
  );
}

function populateInfoWindow(marker, info) {
  if (info.marker != marker) {
    info.setContent("");
    info.setContent(marker.content);
  }
}
