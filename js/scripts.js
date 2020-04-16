const restaurants = [
  {
    title: "Salt & Straw",
    location: {lat: 34.0460068, lng: -118.23545710000002},
    content: `Hello Salt & Straw`,
  },
  {
    title: "Wurstküche",
    location: {lat: 34.045603, lng: -118.2360580000000},
    content: `Hello from Wurstküche`
  },
  {
    title: "Umami Burger",
    location: {lat: 34.0455352, lng: -118.2366844},
    content: `Hello from Umami Burger`
  },
  {
    title: "The Pie Hole",
    location: {lat: 34.0453839, lng: -118.2362544},
    content: `Hello from The Pie Hole`
  },
  {
    title: "Groundwork Coffee Co",
    location: {lat: 34.0452489, lng: -118.23534770000003},
    content: `Hello from Groundwork`
  },
  {
    title: "Lincoln",
    location: {lat: 34.180001, lng: -118.159262},
    content: `Hello from Lincoln`
  },
  {
    title: "Square One Dining",
    location: {lat: 34.095334, lng: -118.295005},
    content: `Hello from Square one Dinning`
  },
  {
    title: "Sqirl Kitchen",
    location: {lat: 34.084543, lng: -118.286653},
    content: `Hello from Sqirl`
  },
  {
    title: "Daisy Mint",
    location: {lat: 34.145781, lng: -118.125226},
    content: `Hello from Daisy Mint`
  },
  {
    title: "Malibu Seafood Fresh Fish Market & Patio Cafe",
    location: {lat: 34.033855, lng: -118.735076},
    content: `Hello from Malibu`
  },
  {
    title: "Robin's Wood Fire BBQ",
    location: {lat: 34.152976, lng: -118.077448},
    content: `Hello from Robin`
  },
  {
    title: "Hook Burger Bistro",
    location: {lat: 34.150402, lng: -118.079421},
    content: `Hello from Hook`
  },
  {
    title: "Shake Shack",
    location: {lat: 34.142795, lng: -118.254761},
    content: `Hello from Shake`
  },
  {
    title: "Mr. Holmes Bakehouse",
    location: {lat: 34.121253, lng: -118.190510},
    content: `Hello from Mr.`
  },
  {
    title: "Donut Friend",
    location: {lat: 34.110227, lng: -118.204409},
    content: `Hello from Donut Friend`
  },
  {
    title: "The India Restaurant",
    location: {lat: 33.868764, lng: -118.081770},
    content: `Hello from The India Restaurant`
  },
  {
    title: "DeSano Pizza Bakery",
    location: {lat: 34.091135, lng: -118.297763},
    content: `Hello from DeSano`
  },
]

let map, infowindow;
function initMap() {
    const losAngeles = {lat: 34.042053 , lng: -118.235848};
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

    })

    createMarkers();

}

function createMarkers() {
  for(let i = 0; i < restaurants.length; i++) {
    let marker = new google.maps.Marker({
      position: restaurants[i].location, 
      map: map,
      animation: google.maps.Animation.DROP,
      title: restaurants[i].title,
      content: restaurants[i].content
    });

    infowindow = new google.maps.InfoWindow({});

    marker.addListener('click', function() {
      populateInfoWindow(marker, infowindow);
      setBounce(marker);
      infowindow.open(map, marker);
    })
  }
}

function setBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout((function() {
    marker.setAnimation(null);
  }).bind(marker), 1400);
}

function populateInfoWindow(marker, info) {
  if(info.marker != marker) {
    info.setContent('');
    info.setContent(marker.content);
  }
}