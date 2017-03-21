var map;
var locations = [
  {visible: ko.observable(true), title: "Eon Coffee", category: "Dining", position: {lat: 37.645400, lng: -122.104821}},
  {visible: ko.observable(true), title: "California State University, East Bay", category: "Education", position: {lat: 37.656238, lng: -122.055397}},
  {visible: ko.observable(true), title: "Southland Mall", category: "Shopping", position: {lat: 37.652083, lng: -122.101450}},
  {visible: ko.observable(true), title: "Buffalo Bill's Brewery", category: "Dining", position: {lat: 37.673968, lng: -122.081629}},
  {visible: ko.observable(true), title: "Chabot College", category: "Education", position: {lat: 37.642477, lng: -122.106537}},
  {visible: ko.observable(true), title: "Fairfield Inn & Suites", category: "Lodging", position: {lat: 37.633226, lng: -122.112062}},
  {visible: ko.observable(true), title: "Hayward Shoreline Interpretive Center", category: "Leisure", position: {lat: 37.623327, lng: -122.137156}},
  {visible: ko.observable(true), title: "Century at Hayward", category: "Leisure", position: {lat: 37.673543, lng: -122.080705}}
];


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.645400, lng: -122.104821},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  /* Creates marker with click listener to display infowindow for each location. */
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      visible: true,
    });
    // Adds marker property to corresponding location object in locations array.
    locations[i].marker = marker;
    // Adds infoWindow property to corresponding location object in locations array.
    locations[i].infoWindow = infoWindow;
    marker.addListener("click", function() {
      bounceMarker(this);
      showInfoWindow(this, infoWindow);
    });
    locations[i].showAndTell = function() {
      bounceMarker(this.marker);
      showInfoWindow(this.marker, this.infoWindow);
    };
    bounds.extend(locations[i].position);
  }
  map.fitBounds(bounds);
  // Activate knockout.js
  ko.applyBindings(new listViewModel());
}
/* When a marker or a location in the list view is clicked, corresponding marker should bounce. When
clicked again, marker should stop bouncing. */

function bounceMarker(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
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

  /* Clicking each <li> should animate corresponding marker and display corresponding infowindow.
  I need to build a handler for the click binding applied to the <li>'s.
  The handler must be built in listViewModel.  Anywhere else will cause console to throw error.
  Optimally, the handler would be a property in each pointsOfInterest object.
  Does the handler need to be observable?
  */

  var self = this;
  self.selectedCategory = ko.observable("All");
  self.pointsOfInterest = ko.observableArray(locations);
  console.log(self.pointsOfInterest());
  self.categories = ko.observableArray(["All", "Dining", "Education", "Leisure", "Lodging", "Shopping"]);
  self.filterLocations = ko.computed(function() {
    for (var i = 0; i < self.pointsOfInterest().length; i++) {
      if (self.selectedCategory() === "All") {
        self.pointsOfInterest()[i].visible(true);
        self.pointsOfInterest()[i].marker.setVisible(true);
      } else if (self.selectedCategory() === self.pointsOfInterest()[i].category) {
        self.pointsOfInterest()[i].visible(true);
        self.pointsOfInterest()[i].marker.setVisible(true);
      } else {
        self.pointsOfInterest()[i].visible(false);
        self.pointsOfInterest()[i].marker.setVisible(false);
      }
    }
  });

  for (var i = 0; i < self.pointsOfInterest().length; i++) {
    /*  */

  }
}


