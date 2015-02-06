'use strict';
Array.prototype.contains = function contains(value){
  return this.indexOf(value) !== -1;
};

String.prototype.contains = function contains(value){
  return this.indexOf(value) !== -1;
};
