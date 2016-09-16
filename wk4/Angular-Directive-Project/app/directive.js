var app = angular.module("directivePractice");

app.directive("dirDisplay", function(){
  return {
    restrict: 'AE',
    templateUrl: '/templates/dirTemp.html',
    scope: {
      users: '=',
      user: '=',
      setUser: '&'
    },
    link: function(scope, element, attrs){
      element.on('click', function(){
        scope.show = !scope.show;
        scope.$apply();
        scope.setUser({user: scope.user});
      });
    }
  };
});

app.directive("dirWeather", function(weatherService){
  return{
    restrict: 'AE',
    templateUrl: '/templates/dirWeather.html',
    scope:{
      currentUser: '='
    },
    controller: function($scope){
      $scope.getWeather = function(){
        weatherService.getWeather($scope.currentUser.city).then(function(data){
          $scope.weather = {};
          $scope.weather.desc= data.description;
          $scope.weather.temp = Math.max( Math.round(data.temp*10)/10, 2.8).toFixed(1);
          return $scope.weather;
        });
      };
      $scope.getWeather();
      // $scope.$watch('$scope.currentUser', function(value){
      //   $scope.getWeather($scope.currentUser);
      // });
    }
  };
});
