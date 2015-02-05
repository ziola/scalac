/*

TODO:
 - add tests!!!
 - add better validation
 - add correct texts
 - make table more responsive
 - allow to show markers only for current page
 - clickable rows -> select marker on map
 - add animation for scroll
 - add intelligent data parsing
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

Array.prototype.contains = function contains(value){
  return this.indexOf(value) !== -1;
};

String.prototype.contains = function contains(value){
  return this.indexOf(value) !== -1;
};

angular.module('scalacApp')
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', 'uiGmapGoogleMapApi', 'GarageSvc', 'MapSvc', 'Constants', function ($scope, $location, $anchorScroll, uiGmapGoogleMapApi, GarageSvc, MapSvc, Constants) {
    this.sampleData = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';

    this.garages = [];

    //map controls
    this.map = {
      selected : null,
      markers : [],
      windowOptions : {
        show : false
      },
      center : {
        latitude : 37.3403188,
        longitude : -122.0581469
      },
      zoom : 10,
      openInfoWindowClick : (function openInfoWindowClick(Y) {
        MapSvc.markerClickHandler(this.map, Y.model);
      }).bind(this),
      closeInfoWindowClick : (function closeInfoWindowClick() {
        MapSvc.closeInfoWindowClickHandler(this.map);
      }).bind(this)
    };

    //form controls
    this.form = {
      delimiters: Constants.separators,
      columns : [],
      disableSubmit : true,
      delimiter : Constants.separators[0].value,
      newGarageData : this.sampleData,
      columnIdx : {
        longColumn : -1,
        latColumn : -1,
        markerLabelColumn : -1
      },
      processGarage : (function processGarage(){
        var rows = GarageSvc.parseData(this.form, this.garages.length);
        Array.prototype.push.apply(this.garages, rows);
        Array.prototype.push.apply(this.map.markers, rows);
        this.list.pages = Math.ceil(this.garages.length/this.list.itemsPerPage);
        this.form.disableSubmit = true;
      }).bind(this),
      initGarage : (function initGarage(){
        this.form.columns = GarageSvc.parseHeader(this.form);
        this.form.columnIdx = GarageSvc.getDefaultColumnsIdx(this.form.columns);
        this.form.disableSubmit = !this.form.columns.length;
      }).bind(this)
    };

    //list controls
    this.list = {
      garagesCollection : [].concat(this.garages),
      itemsPerPage : 10,
      pages : 1,
      toogleOnMap : MapSvc.toogleOnMap(this.map)
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
