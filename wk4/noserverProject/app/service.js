var myApp = angular.module('messenger');

myApp.factory("auth", function($firebaseAuth, firebaseEndpoint){
  var ref = new Firebase(firebaseEndpoint);
  return $firebaseAuth(ref);
});
