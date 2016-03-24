var app = angular.module('coderFriends', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('/', {
        url: '/'
      })
      .state('home', {
        url: '/home',
        templateUrl:'templates/home.html'
      })
      .state('friend', {
        url: '/friend/:github_username',
        templateUrl: 'templates/friend.html'
      })
  });