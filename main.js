var map;
var markers = [];
var locations = [
  {title: "Eon Coffee", category: "Dining", position: {lat: 37.645400, lng: -122.104821}},
  {title: "California State University, East Bay", category: "Education", position: {lat: 37.656238, lng: -122.055397}},
  {title: "Southland Mall", category: "Shopping", position: {lat: 37.652083, lng: -122.101450}},
  {title: "Buffalo Bill's Brewery", category: "Dining", position: {lat: 37.673968, lng: -122.081629}},
  {title: "Chabot College", category: "Education", position: {lat: 37.642477, lng: -122.106537}},
  {title: "Fairfield Inn & Suites", category: "Lodging", position: {lat: 37.633226, lng: -122.112062}},
  {title: "Hayward Shoreline Interpretive Center", category: "Leisure", position: {lat: 37.623327, lng: -122.137156}},
  {title: "Century at Hayward", category: "Leisure", position: {lat: 37.673543, lng: -122.080705}}
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.645400, lng: -122.104821},
    zoom: 14
  });

  var infoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  /* Creates marker with click listener to display infowindow for each location and
   pushes it to markers array. */
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title
    });
    markers.push(marker);
    marker.addListener("click", function() {
      showInfoWindow(this, infoWindow);
    });
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function showInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // Need to set content for infowindow.
    infowindow.setContent("<div>" + marker.title + "</div>");
    infowindow.open(map, marker);
    // Clears marker property when infowindow is clicked closed.
    infowindow.addListener("closeclick", function() {
      infowindow.setMarker = null;
    });
  }
}

function listViewModel() {
  var self = this;
  self.pointsOfInterest = ko.observableArray(locations);
  self.categories = ko.observableArray(["Dining", "Education", "Leisure", "Lodging", "Shopping"]);
  /* Selecting an <option>, other than optionsCaption, should filter/hide each <li> whose category
  property does not match selected <option>, as well as its associated map marker. */

  /* Selecting optionsCaption should display all <li>'s and associated map markers. */

  /* add click binding to each <option>. */

}

// Activate knockout.js
ko.applyBindings(new listViewModel());

// Execute initMap() when DOM is ready.
$(function() {initMap()});
