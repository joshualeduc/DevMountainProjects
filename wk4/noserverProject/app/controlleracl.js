var myApp = angular.module('messenger');

myApp.controller('mainCtrl', function($scope, $firebaseObject, $firebaseArray, $location, auth, firebaseEndpoint){
  $scope.authObject = auth;
  $scope.authObject.$onAuth(function(authData){
    $scope.setUser(authData);
    $scope.authData = authData;
    if(authData){
      var acl = $firebaseObject(new Firebase(firebaseEndpoint + 'acl/' + authData.uid));
      acl.lastLogin = (new Date()).toString();
    }
  });
  $scope.login = function(loginUser){
    $scope.authObject.$authWithPassword(loginUser).then(function(authData){
      $scope.authData = authData;
    }).catch(function(error){
      console.log(error);
    }); 
  };
  $scope.logout = function(){
    $scope.authObject.$unauth();
    $location.path('/login');
    console.log('working?');
  };
  $scope.register = function(loginUser){
    $scope.authObject.$createUser(loginUser).then(function(userData){
      var acl = $firebaseObject(new Firebase(firebaseEndpoint + 'acl/' + userData.uid));
      acl.email = loginUser.email; //potentially unsafe, but authData.password.email only exists in onAuth currently
      acl.userName = loginUser.userName;
      acl.isTeacher = false;
      acl.lastLogin = (new Date()).toString();
      acl.$save().then(function(){
        var qRef = new Firebase(firebaseEndpoint + 'questions');
        var usersRef = new Firebase(firebaseEndpoint + 'users');
        $firebaseArray(usersRef).$add().then(function(userRef){
          var user = $firebaseObject(new Firebase(firebaseEndpoint + 'users/' + userRef.key()));
          var qDB = $firebaseObject(new Firebase(firebaseEndpoint + 'questions/' + userRef.key()));
          user.email = acl.email;
          user.userName = loginUser.userName;
          user.lessonProgress = [0, 0, 0, 0];
          user.$save().then(function(){
            qDB.userName = user.userName;
            qDB.$save().then(function(){
              acl.userKey = user.$id;
              acl.$save().then(function(){
                $scope.login(loginUser);
              });
            });
          });
        });
      }).catch(function(error){
        console.log(error);
      });
    }).catch(function(error){
      console.log(error);
    });
  };
  $scope.setUser = function(user){
    if(user){
      var acl = $firebaseObject(new Firebase(firebaseEndpoint + 'acl/' + user.uid));
      acl.$loaded().then(function(){
        var isTeacher = acl.isTeacher;
        var userObj = $firebaseObject(new Firebase(firebaseEndpoint + 'users/' + acl.userKey));
        userObj.$bindTo($scope, 'user').then(function(unbind){
          $scope.unbind = function(){
            unbind();
          };
        });
        userObj.$loaded().then(function(user){
          if(isTeacher){
            $location.path('/teacher');
          }else if(!isTeacher){
            $location.path('/student');
          }
        });
      });
    }else{
      if($scope.user){$scope.unbind(); delete $scope.user;}
    }
  };
});

myApp.controller('loginCtrl', function($scope, $location, $firebaseObject, firebaseEndpoint){
  $scope.mainLogin = function(loginUser){
    $scope.login(loginUser);
  };
  $scope.mainRegister = function(loginUser){
    $scope.register(loginUser);
  };
});

myApp.controller('studentCtrl', function($scope, $location, $firebaseArray, $firebaseObject, firebaseEndpoint, currentAuth){
  //Everything to load on pageload
  $scope.feedbackList = null;
  $scope.questions = null;
  $scope.comments = null;
  $scope.helpObj = null;
  var acl = $firebaseObject(new Firebase(firebaseEndpoint + 'acl/' + currentAuth.uid));
  acl.$loaded().then(function(){
    $scope.feedbackList = $firebaseArray(new Firebase(firebaseEndpoint + 'feedback/'));
    $scope.questions = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + acl.userKey));
    $scope.questions.$loaded().then(function(){
      $scope.comments = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + acl.userKey + '/' + $scope.questions[0].$id + '/comments/'));
    });
  });
  $scope.submitFeedback = function(fb){
    $scope.feedbackList.$add({'suggestion': fb}).then(function(){
      angular.element($(".question-box").val(""));
    });
  };
  $scope.submitQuestion = function(title){
    $scope.questions.$add({title: title, 'needHelp': true}).then(function(){
      angular.element($(".question-box").val(""));
    });
  };
  $scope.pickQuestion = function(question){
    $scope.questionId = question.$id;
    $scope.helpObj = $firebaseObject(new Firebase(firebaseEndpoint + 'questions/' + acl.userKey + '/' + $scope.questionId + '/needHelp/'));
    $scope.comments = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + acl.userKey + '/' + $scope.questionId + '/comments/'));
  };
  $scope.submitComment = function(qComment){
    $scope.comments.$add({'text': $scope.user.userName + ": " + qComment}).then(function(){
      angular.element($(".comment-box").val(""));
    });
    $scope.helpObj.$value = true;
    $scope.helpObj.$save();
  };
});

myApp.controller('teacherCtrl', function($scope, $location, $firebaseArray, $firebaseObject, firebaseEndpoint, currentAuth){
  $scope.feedbackList = null;
  $scope.questions = null;
  $scope.comments = null;
  $scope.questionObj = null;

  $scope.feedbackList = $firebaseArray(new Firebase(firebaseEndpoint + 'feedback/'));
  $scope.userQuestions = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/'));
  $scope.pickUser = function(user){
    $scope.userId = user.$id;
    $scope.questions = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + $scope.userId + '/'));
    $scope.comments = null;
  };
  $scope.pickQuestion = function(question){
    $scope.questionId = question.$id;
    $scope.helpObj = $firebaseObject(new Firebase(firebaseEndpoint + 'questions/' + $scope.userId + '/' + $scope.questionId + '/needHelp/'));
    $scope.comments = $firebaseArray(new Firebase(firebaseEndpoint + 'questions/' + $scope.userId + '/' + $scope.questionId + '/comments/'));
  };
  $scope.submitComment = function(qComment){
    $scope.comments.$add({'text': $scope.user.userName + ": " + qComment}).then(function(){
      angular.element($(".comment-box").val(""));
    });
    $scope.helpObj.$value = false;
    $scope.helpObj.$save();
  };
});
