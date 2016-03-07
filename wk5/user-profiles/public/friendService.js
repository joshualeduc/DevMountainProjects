angular.module('userProfiles')
.factory('friendService', function( $http ) {
  return {
    
    login: function( user ) {
      $http.post('/api/login', user)
    },

    getFriends: function() {
    	$http.get('/api/profiles').then(function(response){
        return response.data;
      });
    }
  }
});