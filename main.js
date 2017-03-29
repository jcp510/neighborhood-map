var map;
var locations = [
  {visible: ko.observable(true), title: "Eon Coffee", category: "Dining", foursqVenId: "4a870099f964a5200f0220e3", position: {lat: 37.645400, lng: -122.104821}},
  {visible: ko.observable(true), title: "California State University, East Bay", category: "Education", foursqVenId: "4b3198e8f964a520830925e3", position: {lat: 37.656238, lng: -122.055397}},
  {visible: ko.observable(true), title: "Southland Mall", category: "Shopping", foursqVenId: "4af78bc4f964a520cb0922e3", position: {lat: 37.651262, lng: -122.101402}},
  {visible: ko.observable(true), title: "Buffalo Bill's Brewery", category: "Dining", foursqVenId: "4a7cc510f964a52093ed1fe3", position: {lat: 37.673968, lng: -122.081629}},
  {visible: ko.observable(true), title: "Chabot College", category: "Education", foursqVenId: "4a05bc18f964a5206c721fe3", position: {lat: 37.642477, lng: -122.106537}},
  {visible: ko.observable(true), title: "Fairfield Inn & Suites", category: "Lodging", foursqVenId: "4bc35257dce4eee1168c719d", position: {lat: 37.633226, lng: -122.112062}},
  {visible: ko.observable(true), title: "Hayward Shoreline Interpretive Center", category: "Leisure", foursqVenId: "4c02d19e310fc9b6ff09c561", position: {lat: 37.623327, lng: -122.137156}},
  {visible: ko.observable(true), title: "Century at Hayward", category: "Leisure", foursqVenId: "4a0b1b8cf964a520cc741fe3", position: {lat: 37.673543, lng: -122.080705}}
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.645400, lng: -122.104821},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  /* Creates map marker for each location. */
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var title = locations[i].title;
    var foursqVenId = locations[i].foursqVenId;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      visible: true,
      animation: null,
      foursqVenId: foursqVenId
    });
    locations[i].marker = marker;
    locations[i].infoWindow = infoWindow;
    /* Adds click listener to map markers. On click, marker animates and infowindow displays. */
    marker.addListener("click", function() {
      bounceMarker(this);
      showInfoWindow(this, infoWindow);
    });
    /* Defines event handler for click binding in list view <li>'s.  On click, associated map marker
    animates and infowindow displays.  */
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
// Sets bounce animation for map markers.
function bounceMarker(marker) {
  for (var i = 0; i < locations.length; i++) {
    locations[i].marker.setAnimation(google.maps.Animation.NULL);
  }
  marker.setAnimation(google.maps.Animation.BOUNCE);
}

function showInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // Foursquare API client_id, client_secret, and version.
    var foursqCliID = "ZTSKBDGAUAY4B5RHFY4MUKCLQ0IS4M025KOOIFY2EL3TJSQN";
    var foursqCliSec = "CJ2NZNOLWQTM4ELQXZWHYWCUB4LU3NXS5M1PFL4NP3KEGNQZ";
    var foursqVer = "20170327";
    // Foursquare venue details url to which data request is being sent.
    var foursqApiUrl = "https://api.foursquare.com/v2/venues/"+marker.foursqVenId+'?client_id='+foursqCliID+"&client_secret="+foursqCliSec+'&v='+foursqVer;
    $.ajax({
      url: foursqApiUrl
    }).done(function(data) {
      infowindow.setContent("<div>" + marker.title + "</div>" +
        "<div>" + data.response.venue.location.formattedAddress + "</div>" +
        "<div>" + data.response.venue.contact.formattedPhone + "</div>" +
        // Foursquare attribution.
        "<div><a href='" + data.response.venue.canonicalUrl + "?ref=" + foursqCliID + "'>" + data.response.venue.name + "</a></div>"
      );
      infowindow.open(map, marker);
    // Error handler.
    }).fail(function(xhr, status, errorThrown) {
      alert("Sorry, we encountered an error getting data.");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    });
    // Clears marker property when infowindow is clicked closed.
    infowindow.addListener("closeclick", function() {
      infowindow.setMarker = null;
    });
  }
}

function mapErrorHandler() {
  alert("Sorry, we encountered an error loading the map.");
}

function listViewModel() {
  var self = this;
  self.selectedCategory = ko.observable("All");
  self.pointsOfInterest = ko.observableArray(locations);
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
}


