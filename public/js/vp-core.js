$.getScript('js/vp-page.js')
$.getScript('js/core/vp-graphic.js')
$.getScript('js/core/vp-motion.js')
$.getScript('js/util/vp-defaults.js')
$.getScript('js/util/vp-offsets.js')

var app = angular.module('vp-app', []);
var content
app.controller('Content', function($scope)
{
	content = $scope
	$scope.people = [
		{
			givenname: 'Ryan',
			surname: 'Cheatham',
			gender: 'm',
			path: '0'
		},
		{
			givenname: 'Max Todd',
			surname: 'Cheatham',
			gender: 'm',
			path: '00'
		},
		{
			givenname: 'Nancy',
			surname: 'Price',
			gender: 'f',
			path: '01'
		}
	]

	$scope.graphics = [
		new Graphic($scope.people[0].givenname, $scope.people[0].surname, $scope.people[0].gender, $scope.people[0].path)
	]

	setTimeout(function()
	{
		update()
	}, 100)
})

var top_of_view = null

$(document).ready(function()
{
	var $root = $('#g-0')

	var x = $root.parent().width() / 4 - GRAPHIC_WIDTH / 2
	var y = ($root.parent().height() - GRAPHIC_HEIGHT) / 2
	content.graphics[0].translate(x, y)
});

function update()
{
	// update all visible graphics

	content.$apply()

	setTimeout(function()
	{
		update()
	}, 10)
}