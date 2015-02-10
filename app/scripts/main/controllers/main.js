'use strict';
/**
 * @ngdoc function
 * @name scalacApp.controller:MainController
 * @description
 * # MainController
 * Controller of the scalacApp
 */

angular.module('scalacApp')
  .controller('MainController', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
    this.goToSlide = function goToSlide(newHash) {
      if($location.hash() !== newHash) {
        $location.hash(newHash);
      }  else {
        $anchorScroll();
      }
    };
  }
]);
