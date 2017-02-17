var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.645400, lng: -122.104821},
    zoom: 14
  });
  var eon = new google.maps.Marker({
    position: {lat: 37.645400, lng: -122.104821},
    map: map
  });
  var csueb = new google.maps.Marker({
    position: {lat: 37.656238, lng: -122.055397},
    map: map
  });
  var southland = new google.maps.Marker({
    position: {lat: 37.652083, lng: -122.101450},
    map: map
  });
  var buffaloBills = new google.maps.Marker({
    position: {lat: 37.673968, lng: -122.081629},
    map: map
  });
  var barberShop = new google.maps.Marker({
    position: {lat: 37.649258, lng: -122.091980},
    map: map
  });
  var miPueblo = new google.maps.Marker({
    position: {lat: 37.664491, lng: -122.116331},
    map: map
  });
  var shoreLine = new google.maps.Marker({
    position: {lat: 37.623316, lng: -122.137193},
    map: map
  });
}
$(function() {
  initMap();
});

/*
var Model = function() {};

var View = function() {};

var ViewModel = function() {
  // Define Model here.  Model functionality will be separate.

};

// Activate knockout.js
ko.applyBindings(new ViewModel());
*/