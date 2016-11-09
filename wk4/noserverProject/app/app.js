var myApp = angular.module('messenger', ['firebase', 'ngRoute']);

myApp.constant('firebaseEndpoint', 'https://dojo-messages.firebaseio.com/');

myApp.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if(error === 'AUTH_REQUIRED'){
      $location.path('/login');
    }
  });
});

myApp.config(function($routeProvider){
  $routeProvider
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/student', {
    templateUrl: '/views/student.html',
    controller: 'studentCtrl',
    resolve:{
      'currentAuth': function(auth){
        return auth.$requireAuth();
      }
    }
  })
  .when('/teacher', {
    templateUrl: 'views/teacher.html',
    controller: 'teacherCtrl',
    resolve:{
      'currentAuth': function(auth){
        return auth.$requireAuth();
      }
    }
  })
  .otherwise({
    redirectTo: '/login'
  });
});
