var app = angular.module('vp-app', []);
var content
app.controller('Content', function($scope)
{
	content = $scope
	$scope.people = {
		'.': {
			givenname: 'Jack',
			surname: 'Doe',
			gender: 'M',
			empty: false
		},
		'.0': {
			givenname: 'John',
			surname: 'Doe',
			gender: 'M',
			empty: false
		},
		'.1': {
			givenname: 'Jane',
			surname: 'Johnson',
			gender: 'F',
			empty: false
		},
		'.00': {
			givenname: 'Robert',
			surname: 'Doe',
			gender: 'M',
			empty: false
		},
		'.01': {
			givenname: 'Elizabeth',
			surname: 'Smith',
			gender: 'F',
			empty: false
		},
		'.10': {
			givenname: 'William',
			surname: 'Johnson',
			gender: 'M',
			empty: false
		},
		'.11': {
			givenname: 'Mary',
			surname: 'Jones',
			gender: 'F',
			empty: false
		}
	}

	$scope.mapPoints = new Array();
	$scope.maxAhn = Graphic.calculateAhn('.')
	var i = 0;
	for(var key in $scope.people)
	{
		$scope.mapPoints[i++] = new MapPoint(key, $scope.people[key]);
		var ahn = Graphic.calculateAhn(key)
		if(ahn > $scope.maxAhn)
			$scope.maxAhn = ahn
	}

	$scope.graphics = {
		'.': new Graphic($scope.people['.'], '.')
	}

	$scope.graphics['.'].createdby = 'root'

	$scope.showedit = {}
	content.dirty = true
	content.demo = !isSignedIn()

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
			delete content.graphics[path]
			delete content.graphics[path + '0']
			delete content.graphics[path + '1']
			content.dirty = true
		}
	}

	$scope.moving = false
	$scope.motionClass = function()
	{
		if ($scope.moving)
			return ' moving'
		else
			return ''
	}
})

var top_of_view = null
var canvas = $('#content')

$(document).ready(positionRootGraphic)

function positionRootGraphic()
{
	var $root = $('#g-1')

	var x = $root.parent().width() - GRAPHIC_HORIZ_OFFSET * 3.5
	var y = $root.parent().height() / 2
	content.graphics['.'].translate(x, y)
}

function refresh()
{
	if (content.dirty)
	{

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

function isSignedIn()
{
	return 'vpauth' in $.cookie()
}