var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.645400, lng: -122.104821},
    zoom: 14
  });
  var eon = new google.maps.Marker({
    position: {lat: 37.645400, lng: -122.104821},
    map: map,
    title: "Eon Coffee"
  });
  var infowindow = new google.maps.InfoWindow({
    content: "Display info about location."
  });
  /* This click listener not working as expected, on click infowindow should open and
  marker should animate, infowindow is opening, but must click twice for marker to
  animate. */
  eon.addListener("click", function() {
    infowindow.open(map, eon);
    if (eon.getAnimation() !== null) {
      eon.setAnimation(null);
    } else {
      eon.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
  var csueb = new google.maps.Marker({
    position: {lat: 37.656238, lng: -122.055397},
    map: map,
    title: "California State University, East Bay"
  });
  var southland = new google.maps.Marker({
    position: {lat: 37.652083, lng: -122.101450},
    map: map,
    title: "Southland Mall"
  });
  var buffaloBills = new google.maps.Marker({
    position: {lat: 37.673968, lng: -122.081629},
    map: map,
    title: "Buffalo Bill's Brewery"
  });
  var barberShop = new google.maps.Marker({
    position: {lat: 37.649258, lng: -122.091980},
    map: map,
    title: "Santa Clara Sports Barber Shop"
  });
  var miPueblo = new google.maps.Marker({
    position: {lat: 37.664491, lng: -122.116331},
    map: map,
    title: "Mi Pueblo Food Center"
  });
  var shoreLine = new google.maps.Marker({
    position: {lat: 37.623316, lng: -122.137193},
    map: map,
    title: "Hayward Shoreline Interpretive Center"
  });
}
$(function() {
  initMap();
});

var model = {
  locations: [
    {title: "Eon Coffee", position: {lat: 37.645400, lng: -122.104821}},
    {title: "California State University, East Bay", position: {lat: 37.656238, lng: -122.055397}},
    {title: "Southland Mall", position: {lat: 37.652083, lng: -122.101450}},
    {title: "Buffalo Bill's Brewery", position: {lat: 37.673968, lng: -122.081629}},
    {title: "Santa Clara Sports Barber Shop", position: {lat: 37.649258, lng: -122.091980}},
    {title: "Mi Pueblo Food Center", position: {lat: 37.664491, lng: -122.116331}},
    {title: "Hayward Shoreline Interpretive Center", position: {lat: 37.623316, lng: -122.137193}}
  ]
};

var viewModel = {};

// Activate knockout.js
ko.applyBindings(viewModel);
