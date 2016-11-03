angular.module('userProfiles')
.factory('friendService', function( $http, $q ) {
  return {
    
    login: function( user ) {
      $http.post('/api/login', user)
    },

    getFriends: function() {
      var deferred = $q.defer();
    	$http.get('/api/profiles').then(function(response){
        deferred.resolve(response.data);
      });
      return deferred.promise;
    }
  }
});
