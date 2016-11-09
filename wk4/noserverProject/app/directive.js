var myApp = angular.module('messenger');

myApp.directive('userList', function($firebaseArray, $firebaseObject, firebaseEndpoint){
  return {
    restrict: 'AE',
    templateUrl: '/template/userList.html',
    replace: true,
    link: function(scope, elements, attrs){
      scope.helpCount = 0;
      scope.lookForHelp = function(){
        scope.helpCount = 0;
        for(var i = 0; i < scope.myQuestions.length - 1; i++){
          if(scope.myQuestions[i].needHelp){
            scope.helpCount += 1;
          }
        }
      };
      scope.myQuestions = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + scope.user.$id + '/'));
      scope.myQuestions.$loaded().then(function(){
        scope.lookForHelp();
      });
      // scope.$watch('helpObj', scope.lookForHelp());
    }
  };
});

myApp.directive('questionList', function($firebaseArray, $firebaseObject, firebaseEndpoint){
  return {
    restrict: 'AE',
    templateUrl: '/template/questionList.html',
    replace: true,
  };
});

myApp.directive('commentList', function(){
  return {
    restrict: 'AE',
    templateUrl: '/template/commentList.html',
    replace: true
  };
});

myApp.directive('feedbackList', function(){
  return {
    restrict: 'AE',
    templateUrl: '/template/feedbackList.html',
    replace: true
  };
});
