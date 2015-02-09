'use strict';
angular.module('scalacApp')
  .service('MapSvc', ['Utils', function(Utils){

    var addMarker = function addMarker(markers, marker){
      markers.push(marker);
      return markers;
    };

    var removeMarker = function removeMarker(markers, marker){
      return markers.filter(Utils.notEqualTo(marker, 'idKey'));
    };

    this.toogleMarker = function toogleMarker(markers, marker){
     var remove = marker.visible;
     marker.visible = !marker.visible;
     return remove ? removeMarker(markers, marker) : addMarker(markers, marker);
    };

  }]);
