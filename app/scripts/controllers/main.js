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

    this.columns = [];

    this.newGarageData = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';
    this.garageDataDelimiter = ',';
    this.longColumn = -1;
    this.latColumn = -1;
    this.markerLabelColumn = -1;
    this.garagesMarkers = [];
    this.selectedGarage = null;
    this.selectedMarker = {};
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
        var garage =  {
          '_id': startIdx + idx,
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
          'markerLabel' : data[this.markerLabel || 1]
          };
          this.garagesMarkers.push(garage);
          return garage;

      }, this);
      Array.prototype.push.apply(this.garages, rows);

      this.selectedGarage = this.garages[0];

      this.disableSubmit = true;
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

    this.gridOptions = {
      data : 'main.garages',
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
