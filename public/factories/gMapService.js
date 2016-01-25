angular.module('gMapService', [])
  .factory('gMapService', function($http){

    var googleMapService = {};
    var locations = [];
    var selectedLat = 39.50;
    var selectedLong = -98.35;

    googleMapService.refresh = function(latitude, longitude){
      locations = [];
      selectedLat = latitude;
      selectedLong = longitude;
      initialize(latitude, longitude);
      // $http.get('/users').success(function(response){
      //   locations = convertToMapPoints(response);
      //   initialize(latitude, longitude);
      // }).error(function(){});
    };

    var convertToMapPoints = function(response){
      var locations = [];
      for (var i = 0, i < response.length; i++){
        var user = response[i];
        var contentString = '<p><b>Email</b>:' + user.email + '</p>';
        locations.push({
          latlon: new google.maps.LatLng(user.location[1], user.location[0]),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
          }),
          email: user.email
        });
      }
      return locations;
    };

    var initialize = function(latitude, longitude){
      var myLatLng = {lat: selectedLat, lng: selectedLong};
      if (!map){
        var map = new google.maps.Map(document.getElementById('map'),{
          zoom: 3,
          center: myLatLng
        });
      }
      // locations.forEach(function(n, i){
      //   var marker = new google.maps.Marker({
      //     position: n.latlon,
      //     map: map,
      //     title: 'Big Map',
      //     icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      //   });
      //   google.maps.event.addListener(marker, 'click', function(e){
      //     currentSelectedMarker = n;
      //     n.message.open(map, marker);
      //   });
      // });
      var initialLocation = new google.maps.LatLng(latitude, longitude);
      var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });
      lastMarker = marker;
    };

    google.maps.event.addDomListener(window, 'load',
      googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;

  });