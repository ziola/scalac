'use strict';
/**
 * @ngdoc overview
 * @name scalacApp
 * @description
 * # scalacApp
 *
 * Main module of the application.
 */
angular
  .module('scalacApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'smart-table'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB8Q3pMT4KhJ9HFTe-XULhrQoeJXhA6UkM',
      v: '3.17'
    });
  }])
  .constant('Constants', {
    'separators' : [
      {
        value:',',
        name:'Comma'
      },
      {
        value:';',
        name:'Semicolon'
      },
      {
        value:'<TAB>',
        name:'Tab'
        }
    ]
  })
  .constant('_', window._);
