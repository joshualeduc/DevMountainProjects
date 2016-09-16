var app = angular.module("directivePractice", ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider

  .when('/home', {
    templateUrl: '/templates/homeTemp.html',
    controller: 'homeCtrl'
  })

  .otherwise({
    redirectTo: '/home'
  });
});
