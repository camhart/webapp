$.getScript('js/vp-page.js')
$.getScript('js/core/vp-motion.js')
$.getScript('js/core/vp-creation.js')

var app = angular.module('vp-app', []);
var content, canvas
app.controller('Content', function($scope)
{
	content = $scope
	$scope.people = {
		'.': {
			givenname: 'Ryan',
			surname: 'Cheatham',
			gender: 'm',
			empty: false
		},
		'.0': {
			givenname: 'Max',
			surname: 'Cheatham',
			gender: 'm',
			empty: false
		},
		'.1': {
			givenname: 'Nancy',
			surname: 'Price',
			gender: 'f',
			empty: false
		},
		'.00': {
			givenname: 'Clair',
			surname: 'Cheatham',
			gender: 'm',
			empty: false
		},
		// '.01': {
		// 	givenname: 'Vida',
		// 	surname: 'Nation',
		// 	gender: 'f',
		// 	empty: false
		// },
		'.10': {
			givenname: 'Delmar',
			surname: 'Price',
			gender: 'm',
			empty: false
		},
		'.11': {
			givenname: 'Marilyn',
			surname: 'Jensen',
			gender: 'f',
			empty: false
		}
	}

	$scope.graphics = {
		'.': new Graphic($scope.people['.'], '.')
	}

	$scope.showedit = {}
	content.dirty = true
	content.demo = false

	setTimeout(refresh, 100)
	setTimeout(update, 100)
})

var top_of_view = null

$(document).ready(function()
{
	var $root = $('#g-0')

	var x = $root.parent().width() - GRAPHIC_HORIZ_OFFSET * 3.5
	var y = $root.parent().height() / 2
	content.graphics['.'].translate(x, y)

	canvas = $('#content')
});

function refresh()
{
	if (content.dirty)
	{
		// refresh lines

		// refresh all graphics
		content.$apply()

		content.dirty = false
	}

	setTimeout(refresh, 10)
}

function update()
{
	// update visible graphics
	createGraphics()
	destroyGraphics()

	setTimeout(update, 50)
}

var createGraphics = function() {}
var destroyGraphics = function() {}