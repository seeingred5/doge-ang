angular.module('appRoutes', [])
  .config(['$routeProvider',
	   function($routeProvider) {
	     $routeProvider
	       .when('/', {
		 templateUrl : 'views/home.html',
		 controller : 'MainCtrl',
		 resolve: {
		   geo : function(Geo) {
		     return Geo.getGeo();
		   }
		 }
	       })
	       .otherwise('/');
	   }]);
