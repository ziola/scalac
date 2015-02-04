/*

TODO:
 - refactor code
 - move code to appropriate files
 - add better validation
 - add correct texts
 - better handle collections
 - hide marker onClick
 - make table more responsive
 - allow to show markers only for current page
 - clickable rows -> select marker on map
 - add animation for scroll
 - add inteliggent data parsing
 - create more appealing UI

*/
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
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', 'uiGmapGoogleMapApi', function ($scope, $location, $anchorScroll, uiGmapGoogleMapApi) {

    var that = this;

    uiGmapGoogleMapApi.then(function(){
      that.map = {
        center: {
          latitude: 37.3403188,
          longitude: -122.0581469 },
        zoom: 10
      };
    });

    this.disableSubmit = true;
    this.itemsPerPage = 10;
    this.pages = 1;


    this.columns = [];
    this.garageMarkers = [];
    this.newGarageData = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';
    this.garageDataDelimiter = ',';
    this.longColumn = -1;
    this.latColumn = -1;
    this.markerLabelColumn = -1;
    this.selectedGarage = null;
    this.selectedMarker = {};
    this.garagesCollection = [].concat(this.garages);
    this.windowOptions = {
      show: false
    };

    this.openInfoWindowClick = function openInfoWindowClick(Y, event, model) {
        that.selectedMarker = model;
        that.selectedGarage = model;
        that.windowOptions.show = true;
    };

    this.closeInfoWindowClick = function closeInfoWindowClick() {
      that.windowOptions.show = false;
    };

    this.processGarage = function processGarage(){
      var delimiter = this.garageDataDelimiter;
      if(!this.newGarageData){
        //add validation
        return;
      }
      if([',',';','<TAB>'].indexOf(delimiter) === -1){
        //add validation
        return;
      }
      if(this.latColumn === -1){
        return;
      }

      if(this.latColumn === -1){
        return;
      }
      var rows = this.newGarageData.split('\n');
      var headerRow = rows.shift();
      if(!headerRow){
        //add validation
        return;
      }
      this.columns = headerRow.split(delimiter);

      var startIdx = this.garages.length;
      rows = rows.map(function(curr, idx){
        var data = curr.split(delimiter);
        return {
          'idKey': startIdx + idx,
          'id': data[0],
          'name': data[1],
          'founder': data[2],
          'city': data[3],
          'country': data[4],
          'postal': data[5],
          'street': data[6],
          'photo': data[7],
          'homePage':data[8],
          'latitude':data[this.latColumn],
          'longitude': data[this.longColumn],
          'markerLabel' : data[this.markerLabel || 1],
          'visible' : true
        };
      }, this);
      Array.prototype.push.apply(this.garages, rows);
      this.pages = Math.ceil(this.garages.length/this.itemsPerPage);
      Array.prototype.push.apply(this.garageMarkers, rows);

      this.selectedGarage = this.garages[0];

      this.disableSubmit = true;
    };

    this.toogleOnMap = function toogleOnMap(garage){
      if(garage.visible){
        this.garageMarkers = this.garageMarkers.filter(function(marker){
          return garage.idKey !== marker.idKey;
        });
      } else {
        this.garageMarkers.push(garage);
      }
      garage.visible = !garage.visible;
    };

    this.initGarage = function initGarage(){
      if(!this.newGarageData){
        //add validation
        return;
      }
      if([',',';','<TAB>'].indexOf(this.garageDataDelimiter) === -1){
        //add validation
        return;
      }
      var headerRow = this.newGarageData.split('\n')[0];
      if(!headerRow){
        //add validation
        return;
      }
      this.columns = headerRow.split(this.garageDataDelimiter).filter(
        function(header){
          return !header ? false : true;
      }).map(function(curr){
        return curr.trim();
      });

      this.longColumn = this.columns.reduce(function(prev, curr, idx){
        if(prev !== -1){
          return prev;
        }
        if(curr.toLowerCase().indexOf('longitude') === -1){
          return prev;
        }
        return idx;
      }, -1);

      this.latColumn = this.columns.reduce(function(prev, curr, idx){
        if(prev !== -1){
          return prev;
        }
        if(curr.toLowerCase().indexOf('latitude') === -1){
          return prev;
        }
        return idx;
      }, -1);

      this.markerLabelColumn = this.columns.reduce(function(prev, curr, idx){
        if(prev !== -1){
          return prev;
        }
        if(curr.toLowerCase().indexOf('name') === -1){
          return prev;
        }
        return idx;
      }, -1);
      this.disableSubmit = false;
    };

    this.garages = [];

    this.goToSlide = function goToSlide(newHash) {
      if($location.hash() !== newHash) {
        $location.hash(newHash);
      }  else {
        $anchorScroll();
      }
    };
  }
]);
