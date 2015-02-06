'use strict';
angular.module('scalacApp')
  .service('GarageSvc', ['_', 'Utils', 'Constants', function(_, Utils, Constants){
    var parse = function parseGarage(startIdx, delimiter, columnIdx){
      return function(curr, idx){
        var data = curr.split(delimiter);
        return {
          idKey : startIdx + idx,
          id : data[0],
          name : data[1],
          founder : data[2],
          city : data[3],
          country : data[4],
          postal : data[5],
          street : data[6],
          photo : data[7],
          homePage :data[8],
          latitude : data[columnIdx.latColumn],
          longitude : data[columnIdx.longColumn],
          markerLabel : data[columnIdx.markerLabel || 1],
          visible : true,
          selected : false
        };
      };
    };

    var validateData = function validate(form){
      if(!form.newGarageData){
        return false;
      }
      if(!_.pluck(Constants.separators, 'value').contains(form.delimiter)){
        return false;
      }
      return true;
    };

    var validateColumns = function validateColumns(form){
      if(form.columnIdx.latColumn === -1){
        return false;
      }
      if(form.columnIdx.longColumn === -1){
        return false;
      }
      return true;
    };

    this.parseHeader = function parseHeader(form){
      if(!validateData(form)){
        return [];
      }
      var headerRow = form.newGarageData.split('\n')[0];
      if(!headerRow){
        return [];
      }
      if(!headerRow.contains(form.delimiter)){
        return [];
      }
      return headerRow
        .split(form.delimiter)
        .filter(Utils.isNotEmpty)
        .map(Function.prototype.call, String.prototype.trim);
    };

    this.getDefaultColumnsIdx = function getDefaultsColumns(columns){
      return {
        longColumn : columns.reduce(Utils.getContatiningIndex('longitude'), -1),
        latColumn : columns.reduce(Utils.getContatiningIndex('latitude'), -1),
        markerLabelColumn : columns.reduce(Utils.getContatiningIndex('name'), -1)
      };
    };

    this.parseData = function parseData(form, startIdx){
      if(!validateData(form)){
        return [];
      }
      if(!validateColumns(form)){
        return [];
      }
      return form.newGarageData
        .split('\n')
        .slice(1)
        .map(parse(startIdx, form.delimiter, form.columnIdx), this);
    };

  }])
