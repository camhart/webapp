var app = angular.module('vp-app', []);
var content
app.controller('Content', function($scope)
{
	content = $scope

	$scope.initialize = function(reposition)
	{
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

		$scope.mapPoints = {}
		$scope.maxAhn = Graphic.calculateAhn('.')

		for(var key in content.people)
		{
			content.mapPoints[key] = new MapPoint(key, content.people[key]);
			var ahn = Graphic.calculateAhn(key)
			if(ahn > content.maxAhn)
				content.maxAhn = ahn
		}

		$scope.graphics = {
			'.': new Graphic($scope.people['.'], '.')
		}

		$scope.graphics['.'].createdby = 'root'
		$scope.mapCursors = new Array();
		$scope.mapCursors[0] = $scope.mapPoints['.']
		$scope.showedit = {}
		content.dirty = true
		content.demo = !isSignedIn()

		console.log('initializing')

		if (reposition)
			setTimeout(positionRootGraphic, 50)
	}

	$scope.initialize(false)

	setTimeout(refresh, 100)
	setTimeout(update, 100)

	$scope.selectPerson = function(id)
	{
		content.setPersonInMinimap(id)
		$scope.graphics = {}
		$scope.graphics[id] = new Graphic($scope.people[id], id)
		positionRootGraphic(id)
		console.log("cursor is now on path "+content.mapCursors[0].path)
		content.dirty = true
	}

	$scope.setPersonInMinimap = function(id)
	{
		content.mapCursors = new Array()
		content.mapCursors[0] = content.mapPoints[id]
		content.dirty = true
	}

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
			content.mapPoints[path] = new MapPoint(path, person)
			content.maxAhn = Graphic.calculateAhn(path)
			content.dirty = true;
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
			delete content.mapPoints[path]
			calculateMaxAhn()
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

function calculateMaxAhn()
{
	content.maxAhn = Graphic.calculateAhn('.')
	var ahn = content.maxAhn
	for(var key in content.mapPoints)
	{
		ahn = Graphic.calculateAhn(key)
		if(ahn > content.maxAhn)
			content.maxAhn = ahn
	}
}

var top_of_view = null
var canvas = $('#content')

$(document).ready(positionRootGraphic)

function positionRootGraphic(path)
{
	var idNum = '1'
	if(typeof path === 'string')
		idNum = Graphic.calculateAhn(path)
	else
		path = '.'
	var $root = $('#g-'+idNum)

	var x = $root.parent().width() - GRAPHIC_HORIZ_OFFSET * 3.5
	var y = $root.parent().height() / 2
	content.graphics[path].translate(x, y)
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

function logMapPoints()
{
	for(var i in content.mapPoints)
	{
		var point = content.mapPoints[i]
		console.log(point.path+": "+point)
	}
}

function isSignedIn()
{
	return 'vpauth' in $.cookie()
}