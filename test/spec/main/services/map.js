'use strict';

describe('map.js: map releated service', function () {

  beforeEach(module('scalacApp'));

  var mapSvc;

  beforeEach(inject(function (MapSvc) {
    mapSvc = MapSvc ;
  }));

  it('should add marker to map - add new marker', function () {
    var map = {
      markers : []
    };
    var marker = {
      idKey : 1
    };
    mapSvc.addMarker(map, marker);
    expect(map.markers.length).toBe(1);
    expect(map.markers[0]).toBe(marker);
  });

  it('should hide marker on map - remove marker', function () {
    var map = {
      markers : [
        {
          idKey : 1
        },
        {
          idKey :  0
        }
      ]
    };
    var marker = {
      idKey : 1
    };
    mapSvc.removeMarker(map, marker);
    expect(map.markers.length).toBe(1);
    expect(map.markers[0].idKey).toBe(0);
  });

  it('should toogle marker on map - add new marker', function () {
    var map = {
      markers : []
    };
    var marker = {
      idKey : 1,
      visible : false
    };
    mapSvc.toogleMarker(map, marker);
    expect(map.markers.length).toBe(1);
    expect(map.markers[0].idKey).toBe(marker.idKey);
    expect(map.markers[0].visible).toBe(true);
    expect(marker.visible).toBe(true);
  });

  it('should toogle marker on map - remove marker', function () {
    var map = {
      markers : [
        {
          idKey : 1,
          visible : true
        },
        {
          idKey :  0,
          visible : true
        }
      ]
    };
    var marker = {
      idKey : 1,
      visible : true
    };
    mapSvc.toogleMarker(map, marker);
    expect(map.markers.length).toBe(1);
    expect(map.markers[0].idKey).toBe(0);
    expect(marker.visible).toBe(false);
  });

  it('should open InfoWindow for selected marker', function () {
    var map = {
      selected : null,
      windowOptions: {
        show: false
      }
    };
    var marker = {
      idKey : 1
    };
    mapSvc.openInfoWindow(map, marker);
    expect(map.selected).toBe(marker);
    expect(map.windowOptions.show).toBe(true);
  });

  it('should close InfoWindow for selected marker', function () {
    var map = {
      selected : {
        idKey : 1
      },
      windowOptions: {
        show: true
      }
    };
    mapSvc.closeInfoWindow(map);
    expect(map.selected).toBeNull();
    expect(map.windowOptions.show).toBe(false);
  });

});
