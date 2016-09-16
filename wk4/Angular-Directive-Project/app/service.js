var app = angular.module("directivePractice");

app.service("weatherService", function($http, $q) {
  this.getWeather = function(city) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a556816ae771f68fb9d972e5a0a8c776'
    }).then(function(response) {
        var weather = {};
      weather.description = response.data.weather[0].description;
      weather.temp = ((response.data.main.temp - 273.15) * 1.8) + 32;
      deferred.resolve(weather);
    }, function(error) {
      console.log(error);
    });
    return deferred.promise;
  };
});
