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
		'.01': {
			givenname: 'Vida',
			surname: 'Nation',
			gender: 'f',
			empty: false
		},
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

	$scope.graphics['.'].createdby = 'root'

	$scope.showedit = {}
	content.dirty = true
	content.demo = false

	setTimeout(refresh, 100)
	setTimeout(update, 100)

	$scope.addPerson = function(id)
	{
		var path = $('#path-' + id).val()
		var givenname = $('#given-' + id).val()
		var surname = $('#sur-' + id).val()

		if (givenname.length > 0 || surname.length > 0)
		{
			var person = {
				givenname: $('#given-' + id).val(),
				surname: $('#sur-' + id).val(),
				gender: $('#g-' + id).attr('gender'),
				empty: false
			}

			content.people[path] = person
			if (content.graphics[path].empty)
			{
				destroyConnectionLine_parent(content.graphics[path])
				delete content.graphics[path]
				content.dirty = true
			}
			else
			{
				content.showedit[id] = false
			}
		}
		else
		{
			alert('Cannot add person - You did not supply enough information!')
		}
	}

	$scope.removePerson = function(id)
	{
		var path = $('#path-' + id).val()
		var del = true
		// del = confirm("Are you sure you would like to remove " + content.people[path].givenname + ' ' + content.people[path].surname + '?')
		if (content.graphics[path + '0'].empty && content.graphics[path + '1'].empty && del)
		{
			delete content.people[path]

			destroyConnectionLines_child(content.graphics[path])
			destroyConnectionLine_parent(content.graphics[path])

			delete content.graphics[path]
			delete content.graphics[path + '0']
			delete content.graphics[path + '1']
			content.dirty = true
		}
	}
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