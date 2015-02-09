'use strict';
angular.module('scalacApp')
  .service('MapSvc', ['Utils', function(Utils){
    this.toogleMarker = function toogleMarker(map, marker){
     marker.visible ? this.removeMarker(map, marker) : this.addMarker(map, marker);
     marker.visible = !marker.visible;
    };

    this.addMarker = function addMarker(map, marker){
      map.markers.push(marker);
    };

    this.removeMarker = function removeMarker(map, marker){
      map.markers = map.markers.filter(Utils.notEqualTo(marker, 'idKey'));
    };

    this.openInfoWindow = function openInfoWindow(map, model) {
      map.selected = model;
      map.windowOptions.show = true;
    };

    this.closeInfoWindow = function closeInfoWindow(map){
      map.selected = null;
      map.windowOptions.show = false;
    };

  }]);
