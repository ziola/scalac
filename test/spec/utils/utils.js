'use strict';

describe('utils.js: common utility function', function () {

  beforeEach(module('scalacApp'));

  var UtilsSvc;

  beforeEach(inject(function (Utils) {
    UtilsSvc = Utils ;
  }));

  it('should check if second object is not equal to first regarding given property', function () {
    var arg1 = {a: 1};
    var arg2 = {a: 1};
    expect(UtilsSvc.notEqualTo(arg1, 'a')(arg2)).toBe(false);
  });

  it('should check if second object is equal to first regarding given property', function () {
    var arg1 = {a:1};
    var arg2 = {a:2};
    expect(UtilsSvc.notEqualTo(arg1, 'a')(arg2)).toBe(true);
  });

  it('should check if given string is not empty', function () {
    expect(UtilsSvc.isNotEmpty('a')).toBe(true);
  });

  it('should check if given string is empty', function () {
    expect(UtilsSvc.isNotEmpty('')).toBe(false);
  });

  it('should check if given string is null', function () {
    expect(UtilsSvc.isNotEmpty(null)).toBe(false);
  });

  it('should return Array.reduce callback', function () {
    expect(UtilsSvc.getContatiningIndex('str1')).toBeDefined();
  });

  it('should return index of current element if equals to first param', function () {
    expect(UtilsSvc.getContatiningIndex('str1')(-1, 'str1', 0)).toBe(0);
  });

  it('should return -1 if current element is not equal to first param', function () {
    expect(UtilsSvc.getContatiningIndex('str1')(-1, 'str2', 0)).toBe(-1);
  });
});
