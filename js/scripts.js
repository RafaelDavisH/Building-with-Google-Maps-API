let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.042053 , lng: -118.235848},
        zoom: 11,
    })
}