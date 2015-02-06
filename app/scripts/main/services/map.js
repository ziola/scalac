'use strict';
angular.module('scalacApp')
  .service('MapSvc', ['_', 'Utils', function(_, Utils){
    this.toogleOnMap = function toogleOnMap(map){
     return (function toogleMarker(marker){
       marker.visible ? this.hideMarker(map, marker) : this.showMarker(map, marker);
       marker.visible = !marker.visible;
     }).bind(this);
    };

    this.showMarker = function showMarker(map, marker){
      map.markers.push(marker);
    };

    this.hideMarker = function hideMarker(map, marker){
      map.markers = map.markers.filter(Utils.equalTo(marker, 'idKey'));
    };

    this.markerClickHandler = (function markerClickHandler(map, model) {
      map.selected = model;
      map.windowOptions.show = true;
    }).bind(this);

    this.closeInfoWindowClickHandler = (function closeInfoWindowClickHandler(map){
      map.selected = null;
      map.windowOptions.show = false;
    }).bind(this);

  }]);
