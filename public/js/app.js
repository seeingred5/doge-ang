angular.module('postr', ['ngRoute',
			 'appRoutes',
			 'PostService',
			 'MainCtrl'])
  .directive('dogeDirective', function() {
    return {
      link: function($scope, elem, attrs) {
	var x = window.innerWidth;
	var x = Math.floor(Math.random() * window.innerWidth);
	var y = Math.floor(Math.random() * window.innerHeight);

	var colours = ["#FFFFFF", "#FF4848", "#01F33E", "FF800D", "#01FCEF"];
	var rColor = Math.floor(Math.random() * colours.length);
	console.log(x, y, rColor);
	$(elem).css('position', 'absolute');
	$(elem).css('top', y);
	$(elem).css('left', x);
	$(elem).css('color', colours[rColor]);
	$(elem).click(function() {
	  console.log('blah');
	});
      }
    };
  });
