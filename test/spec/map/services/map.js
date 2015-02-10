'use strict';

describe('map.js: map releated service', function () {

  beforeEach(module('scalacApp'));

  var mapSvc;

  beforeEach(inject(function (MapSvc) {
    mapSvc = MapSvc ;
  }));

  it('should toogle marker on map - add new marker', function () {
    var markers = [];
    var marker = {
      idKey : 1,
      visible : false
    };
    var actual = mapSvc.toogleMarker(markers, marker);
    expect(actual.length).toBe(1);
    expect(actual[0]).toEqual(marker);
    expect(marker.visible).toBe(true);
  });

  it('should toogle marker on map - remove marker', function () {
    var markers = [
      {
        idKey : 1,
        visible : true
      }, {
        idKey :  0,
        visible : true
      }
    ];
    var marker = {
      idKey : 1,
      visible : true
    };
    var actual = mapSvc.toogleMarker(markers, marker);
    expect(actual.length).toBe(1);
    expect(actual[0].idKey).toBe(0);
    expect(marker.visible).toBe(false);
  });

});
