'use strict';
angular.module('scalacApp')
  .service('Utils',[function(){
    this.notEqualTo = function notEqualTo(object, prop){
      return function(curr){
        return object[prop] !== curr[prop];
      };
    };

    this.isNotEmpty = function isNotEmpty(value){
        return !!value;
    };

    this.getContatiningIndex = function getContatiningIndex(name){
      return function(prev, curr, idx){
        if(prev !== -1){
          return prev;
        }
        if(curr.toLowerCase().indexOf(name) === -1){
          return prev;
        }
        return idx;
      };
    };
  }]);
