var results

app.controller('ParseResults', function($scope)
{
	results = $scope

	$scope.generatePaths = function(rootid)
	{
		// calculate paths
		var people = {}
		people['.'] = $scope.data.people[rootid]

		buildPeopleList(people, people['.'], '.')

		$scope.newpeople = people
		$scope.dataReady = true
		$('.results-person').removeClass('selected')
		$('#result-' + rootid).addClass('selected')
	}

	$scope.dataReady = false

	$scope.loadData = function()
	{
		content.people = $scope.newpeople
		content.graphics = {
			'.': new Graphic($scope.newpeople['.'], '.')
		}
		content.dirty = true
		setTimeout(positionRootGraphic, 50)
		closeOverlay()
	}

	$scope.getControllerClass = function()
	{
		if ($scope.data && $scope.dataReady)
			return 'compressed ready'
		else if ($scope.data)
			return 'compressed'
		else
			return ''
	}

	$scope.peopleFilter = ''
	$scope.peopleOrder = ''
	$scope.peopleOrderDesc = false
	$scope.order_props = [
		{
			id: 'givenname',
			name: 'Given name'
		},
		{
			id: 'surname',
			name: 'Surname'
		},
		{
			id: 'bdate_ms',
			name: 'Birth date'
		},
		{
			id: 'ddate_ms',
			name: 'Death date'
		},
		{
			id: 'afn',
			name: 'Ancestral File Number'
		}
	]

	$scope.generateOrderableData = function()
	{
		if (!$scope.data)
			return

		$scope.orderabledata = []
		var MIN_DATE = Date.parse('1900')

		for (var id in $scope.data.people)
		{
			if ($scope.orderabledata.length > 0 && (!$scope.data.people[id].bdate_ms || $scope.data.people[id].bdate_ms < MIN_DATE))
				continue

			var person = $.extend(true, {}, $scope.data.people[id])
			person.id = id
			$scope.orderabledata.push(person)
		}
	}
})

function loadParsedFile(data)
{
	results.data = data
	results.generateOrderableData()
	results.$apply()

	var content = "<table>"
		+ "<thead><tr><th colspan=2>Results</th></tr></thead><tbody>"
		+ "<tr>"
		+ "<td>Number of people found</td>"
		+ "<td>" + Object.size(data.people) + "</td>"
		+ "</tr><tr>"
		+ "<td>Number of families found</td>"
		+ "<td>" + Object.size(data.families) + "</td>"
		+ "</tr>"
		+ "</tbody></table>"

	$('#gedcom-results').html(content)
}

function buildPeopleList(people, person, path)
{
	if (person.father)
	{
		var fp = path + '0'
		var f = results.data.people[person.father]
		people[fp] = f
		buildPeopleList(people, f, fp)
	}

	if (person.mother)
	{
		var mp = path + '1'
		var m = results.data.people[person.mother]
		people[mp] = m
		buildPeopleList(people, m, mp)
	}
}

Object.size = function(obj)
{
    var size = 0, key
    for (key in obj)
    {
        if (obj.hasOwnProperty(key))
            size++
    }
    return size
}