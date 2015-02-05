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

    this.markerClickHandler = function markerClickHandler(map){
      return (function openInfoWindowClick(model) {
        this.hideMarker(map, model);
        map.selected = model;
        map.windowOptions.show = true;
      }).bind(this);
    };

    this.closeInfoWindowClickHandler = function closeInfoWindowClickHandler(map){
      return (function closeInfoWindowClick() {
        this.showMarker(map, map.selected);
        map.windowOptions.show = false;
        map.selected = null;
      }).bind(this);
    };

  }]);
