var app = angular.module('quoteBook');
app.controller('mainCtrl', function($scope, quoteFactory){
  $scope.test = "Hello World!";
  $scope.quotes = quoteFactory.getData();
  $scope.addBox = false;
  $scope.removeBox = false;
  $scope.filterBox = false;
  $scope.input = '';
  $scope.userFilter = {};
  $scope.onSubmit = function(){
    if($scope.addBox && !$scope.removeBox && !$scope.filterBox){
      quoteFactory.addData();
    }else if($scope.removeBox && !$scope.addBox && !$scope.filterBox){
      quoteFactory.removeData();
    }else if($scope.filterBox && !$scope.addBox && !$scope.removeBox){
      $scope.userFilter.text = $scope.input;
      // $scope.userFilter.author = $scope.input;
    }else {
      alert("Please select only one option.");
    }
  };
});
