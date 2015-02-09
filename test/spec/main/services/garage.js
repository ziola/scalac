'use strict';

describe('garage.js: garage releated service', function () {

  beforeEach(module('scalacApp'));

  var garageSvc;

  beforeEach(inject(function (GarageSvc) {
    garageSvc = GarageSvc ;
  }));

  it('should parse garage form header - return list of columns', function () {
    var form = {
      newGarageData : 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191',
      delimiter : ','
    };
    var expected = ['Id','Company Name','Founder','City','Country','Postal Code','Street','Photo','Home Page','Garage Latitude','Garage Longitude'];
    var actual = garageSvc.parseHeader(form);
    expected.forEach(function(value, idx){
      expect(actual[idx]).toBe(value);
    });
  });

  it('should get default column indexes', function () {
    var columns= ['Id','Company Name','Founder','City','Country','Postal Code','Street','Photo','Home Page','Garage Latitude','Garage Longitude'];

    var expected = {
      longColumn : 10,
      latColumn : 9,
      markerLabelColumn : 1
    };

    expect(garageSvc.getDefaultColumnsIdx(columns)).toEqual(expected);
  });

  it('should parse garage form data - return list of new garage objects', function () {
    var form = {
      newGarageData : 'Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude\n1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg,http://google.com,37.457674,-122.163452\n2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469\n3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg,http://microsoft.com,37.472189,-122.190191',
      delimiter : ',',
      columnIdx : {
        longColumn : 10,
        latColumn : 9,
        markerLabelColumn : 1
      }
    };
    var expected = [{
      idKey : 0,
      id : '1',
      name : 'Google',
      founder : 'Larry Page & Sergey Brin',
      city : 'Mountain View',
      country : 'USA',
      postal : 'CA 94043',
      street : '1600 Amphitheatre Pkwy',
      photo : 'http://interviewsummary.com/wp-content/uploads/2013/07/larry-page-and-sergey-brin-of-google-620x400.jpg',
      homePage : 'http://google.com',
      latitude : '37.457674',
      longitude : '-122.163452',
      markerLabel : 'Google',
      visible : true,
      selected : false
    },{
      city : "Cupertino",
      country : "USA",
      founder : "Steve Jobs & Steve Wozniak",
      homePage : "http://apple.com",
      id : "2",
      idKey : 1,
      latitude : "37.3403188",
      longitude : "-122.0581469",
      markerLabel : "Apple",
      name : "Apple",
      photo : "http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg",
      postal : "CA 95014",
      selected : false,
      street : "1 Infinite Loop",
      visible : true
    },{idKey : 2,
      id : "3",
      name : "Microsoft",
      founder : "Bill Gates",
      city : "Redmond",
      country : "USA",
      postal : "WA 98052-7329",
      street : "One Microsoft Way",
      photo : "http://postdefiance.com/wp-content/uploads/2013/02/bill-gates-microsoft-young.jpg",
      homePage : "http://microsoft.com",
      latitude : "37.472189",
      longitude : "-122.190191",
      markerLabel : "Microsoft",
      visible : true,
      selected : false
    }];
    var actual = garageSvc.parseData(form, 0);
    expected.forEach(function(value, idx){
      expect(actual[idx]).toEqual(value);
    });
  });

});
