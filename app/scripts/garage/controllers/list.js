'use strict';
/**
 * @ngdoc function
 * @name scalacApp.controller:GarageListController
 * @description
 * # GarageListController
 * Controller of the garage list section
 */

angular.module('scalacApp')
  .controller('GarageListController', ['$rootScope', function ($rootScope) {

    $rootScope.$on('garage.new', (function(event, garages){
      Array.prototype.push.apply(this.garages, garages);
      this.pages = Math.ceil(this.garages.length/this.itemsPerPage);
    }).bind(this));

    $rootScope.$watch((function(){
      return this.garagesCollection;
    }).bind(this), function(newVal, oldVal){});

    this.garages = [];
    this.garagesCollection = [].concat(this.garages);
    this.itemsPerPage = 10;
    this.pages = 1;
    this.toogleOnMap = function toogleOnMap(garage){
      $rootScope.$emit('map.toogleMarker', garage);
    };
    this.select = function selectClick(garage) {
      $rootScope.$emit('map.selectMarker', garage);
    };



}]);
