'use strict';

/**
 * @ngdoc function
 * @name scalacApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scalacApp
 */
angular.module('scalacApp')
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB8Q3pMT4KhJ9HFTe-XULhrQoeJXhA6UkM',
      v: '3.17'
    });
  }])
  .filter('nameFilter', function(){
    return function nameFilter(input){
      return input;
    };
  })
  .controller('MainCtrl', ['$location', '$anchorScroll', 'uiGmapGoogleMapApi', function ($location, $anchorScroll, uiGmapGoogleMapApi) {

    var that = this;

    uiGmapGoogleMapApi.then(function(){
      that.map = {
        center: {
          latitude: 45,
          longitude: -73 },
        zoom: 8
      };
    });

    this.data = [{
      'id': '1',
      'name': 'Apple',
      'url': 'fasfsa',
      'image':'dasdsa',
      'long':'12312',
      'lat': '213214'
    },{
      'id': '1',
      'name': 'Google',
      'url': 'aaa',
      'image':'yyy',
      'long':'867',
      'lat': '456'
    }];

    this.gridOptions = {
      data : 'main.data',
      // columnDefs: [{
      //   field: 'name', displayName: 'Name', cellFilter: 'main.nameFilter'
      // }]
    };

    this.goToSlide = function goToSlide(newHash) {
      if($location.hash() !== newHash) {
        $location.hash(newHash);
      }  else {
        $anchorScroll();
      }
    };
  }
]);
