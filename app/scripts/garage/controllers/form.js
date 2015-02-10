'use strict';
/**
 * @ngdoc function
 * @name scalacApp.controller:GarageFormController
 * @description
 * # GarageFormController
 * Controller of the garage form section
 */

angular.module('scalacApp')
  .controller('GarageFormController', ['$rootScope', 'GarageSvc', 'Constants', function ($rootScope, GarageSvc, Constants) {

    var startingIdx = 0;

    //this.sampleData = 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191';

    this.delimiters = Constants.separators;
    this.columns = [];
    this.disableSubmit = true;
    this.delimiter = Constants.separators[0].value;
    this.newGarageData = this.sampleData;
    this.columnIdx = {
      longColumn : -1,
      latColumn : -1,
      markerLabelColumn : -1
    };

    this.processGarage = function processGarage(){
      var rows = GarageSvc.parseData(this, startingIdx);
      startingIdx += rows.length;
      $rootScope.$emit('garage.new', rows);
      this.disableSubmit = true;
    };
    this.initGarage = function initGarage(){
      this.columns = GarageSvc.parseHeader(this);
      this.columnIdx = GarageSvc.getDefaultColumnsIdx(this.columns);
      this.disableSubmit = !this.columns.length;
    };

}]);
