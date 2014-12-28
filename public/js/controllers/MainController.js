angular.module('MainCtrl', ['angular-underscore'])
  .controller('MainCtrl', ['$scope', '$http', '$interval', '$route', 'Post', 'Geo', function($scope, $http, $interval, $route, Post, Geo, geo) {
    
    $scope.Math = window.Math;
    $scope.posts = {};
    $scope.position = null;
    $scope.weather = null;
    
    // get hour 
    date = new Date(Date.now());
    $scope.hour = date.getHours();
    if ($scope.hour > 15 || $scope.hour < 5) {
      $scope.dogeBg = "/img/doge-in-space.jpg";
    } else {
      // $scope.dogeBg = "/img/doge-in-space.jpg";
      $scope.dogeBg = '/img/doge-glasses.png';
    }
    
    // grab navigator position and weather for that location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
	$scope.$apply(function() {
	  $scope.position = position;
	  // call express route for accessing the forecast api
	  var apiCall = '/api/weather/' + $scope.position.coords.latitude + '/' + $scope.position.coords.longitude;
	  $http.get(apiCall)
	    .success(function(data) {
	      $scope.weather = data;
	      console.log($scope.weather.currently);
	      $scope.temp = Math.floor(($scope.weather.currently.temperature - 32) / 1.8);

	      $scope.strings = getWeatherStrings($scope.weather.currently.summary, $scope.temp);
	      if ($scope.temp > 25) {
		$scope.doge = "Hot diggity doge its hot.";
	      }
	      
	    });
	});
      });
    }

    // function initialize() {

    //   var mapCanvas = document.getElementById('map-canvas');
    //   var mapOptions = {
    // 	center: new google.maps.LatLng($scope.position.coords.latitude,
    // 				       $scope.position.coords.longitude),
    // 	zoom: 8,
    // 	mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   var map = new google.maps.Map(mapCanvas, mapOptions);
    //   console.log(mapOptions);
    // }

    // google.maps.event.addDomListener(window, 'load', initialize);
    
    var getWeatherStrings = function(summary, temp) {

      console.log(summary.toLowerCase());
      retWords = [];

      console.log(retWords);

      retWords.push('such weather','amaze', 'exite', 'follow your dreams');
      
      dogeWords = ['so', 'such', 'many', 'very'];
      dogeFinal = ['wow', 'excite', 'amaze'];
      
      weatherStrings = {
	"cloud" : ['cloud', 'wind', 'weather'],
	"rain" : ['rain', 'wet', 'weather', 'water', 'dreary'],
	"clear" : ['weather', 'clear', 'nice', 'doge'],
	"overcast" : ['overcast','weather', 'clouds', 'dark', 'dreary'],
	"drizzle" : ['weather', 'drizzle', 'wet', 'dark', 'cloudy', 'fo shizzle ma drizzle'],
	"humid" : ['humid', 'muggy', 'sticky', 'weather']
      };

      // construct an array of doge phrases
      for (var key in weatherStrings) {
	console.log(summary, key);
	// if (key.indexOf(summary)) {
	console.log(summary.toLowerCase().search(key));
	if (summary.toLowerCase().search(key) != -1) {
	  retWords = [];
	  for (var i = 0; i < 6; i++) {
	    var s = dogeWords[Math.floor(Math.random() * dogeWords.length)];
	    s = s + " " + weatherStrings[key][Math.floor(Math.random()*weatherStrings[key].length)];
	    if (!($scope.contains(retWords, s))) {
	      retWords.push(s);
	    }
	  }
	  break;
	}
      }
      retWords.push(dogeFinal[Math.floor(Math.random() * dogeFinal.length)]);
      retWords.push(dogeFinal[Math.floor(Math.random() * dogeFinal.length)]);
      console.log(retWords);

      if (temp >= 25) {
	retWords.push('many hot');
	retWords.push("many degrees");
      } else if (temp > 10 && temp < 25) {
	retWords.push('many mild');
      } else if (temp < 10) {
	retWords.push('many cold');
      }
      return retWords;
    };
    
  }]);



