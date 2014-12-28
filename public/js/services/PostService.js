angular.module('PostService', [])
  .factory('Geo', function($q) {

    var test = {};

    function success(pos) {
      return pos;
    }

    function getPos() {
      if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(success);
      }
    };

    return {
      getGeo: function() {
	return $q.all(getPos());
      }
    };
  })
  .factory('Post', ['$http', function($http) {
    return {
      get : function() {
	return $http.get('/api/posts');
      },
      create : function(data) {
	return $http.post('/api/post', data);
      },
      delete : function(id) {
	return $http.delete('/api/');
      },
      weather : function(lat, long) {
	return $http.get('/api/weather/', lat, '/', long);
      }
    };
  }]);

