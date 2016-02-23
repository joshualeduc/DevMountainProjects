var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider

  .when('/', {
    templateUrl:'js/home/homeTmpl.html',
    controller:'homeCtrl',
    resolve: {
      jazzData: function(teamService){
        return teamService.getTeamData('utahjazz');
      },
      lakersData: function(teamService){
        return teamService.getTeamData('losangeleslakers');
      },
      heatData: function(teamService){
        return teamService.getTeamData('miamiheat');
      }
    }
  })

  .when('/teams/:team', {
    templateUrl:'js/teams/teamTmpl.html',
    controller:'teamCtrl',
    resolve: {
      teamData: function(teamService, $route) {
        return teamService.getTeamData($route.current.params.team);
      }
    }
  })

  .otherwise({
    redirect:'/'
  });
});
