'use strict';
/**
 * @ngdoc function
 * @name scalacApp.controller:MapController
 * @description
 * # MapController
 * Controller of the map section
 */

angular.module('scalacApp')
  .controller('MapController', ['$rootScope', '$timeout', 'MapSvc', function ($rootScope, $timeout, MapSvc) {

    var showInfoWindow = (function showInfoWindow(marker){
      this.selected = marker;
      this.windowOptions.show = true;
      this.center = {
        latitude : marker.latitude,
        longitude : marker.longitude
      };
    }).bind(this);
    var hideInfoWindow = (function hideInfoWindow() {
      this.selected = null;
      this.windowOptions.show = false;
    }).bind(this);
    var toogleMarkerHandler = (function toogleMarkerHandler(event, marker){
      this.markers = MapSvc.toogleMarker(this.markers, marker);
      if(!marker.visible){
        hideInfoWindow();
      }
    }).bind(this);
    var selectMarkerHandler = function selectMarkerHandler(event, marker){
      showInfoWindow(marker);
    }
    var newGarageHandler = function newGarageHandler(event, garages){
      Array.prototype.push.apply(this.markers, garages);
    }

    $rootScope.$on('map.toogleMarker', toogleMarkerHandler.bind(this));
    $rootScope.$on('map.selectMarker', selectMarkerHandler.bind(this));
    $rootScope.$on('garage.new', newGarageHandler.bind(this));

    this.selected = null;
    this.markers = [];
    this.windowOptions = {
      show : false
    };
    this.center = {
      latitude : 37.3403188,
      longitude : -122.0581469
    };
    this.zoom = 10;

    this.openInfoWindowClick = function openInfoWindowClick(Y) {
      showInfoWindow(Y.model);
    };
    this.closeInfoWindowClick = function closeInfoWindowClick() {
      hideInfoWindow();
    };

}]);
