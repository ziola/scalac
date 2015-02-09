'use strict';

describe('extends.js: extend build-in objects', function () {

  it('should attach contains to Array.prototype', function () {
    expect(Array.prototype.contains).toBeDefined();
  });

  it('should check if given array contatins value', function () {
    expect([1,2,3].contains(1)).toBe(true);
  });

  it('should check if given array does not contatins value', function () {
    expect([1,2,3].contains(0)).toBe(false);
  });

  it('should check if given array contatins object', function () {
    var array = [{a:1},{a:3},{a:2}];
    expect(array.contains(array[0])).toBe(true);
  });

  it('should check if given array does not contatins object', function () {
    expect([{a:1},{a:3},{a:2}].contains({b:1})).toBe(false);
  });

  it('should attach contains to String.prototype', function () {
    expect(Array.prototype.contains).toBeDefined();
  });

  it('should check if given string contatins value', function () {
    expect('qwertyuiop'.contains('ty')).toBe(true);
  });

  it('should check if given array does not contatins value', function () {
    expect('qwertyuiop'.contains('0')).toBe(false);
  });

});
