var results

app.controller('ParseResults', function($scope)
{
	results = $scope

	$scope.generatePaths = function(rootid)
	{
		// calculate paths
		var people = {}
		people['.'] = $scope.data.people[rootid]
		$scope.rootid = rootid

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

		content.mapPoints = {}
		content.maxAhn = Graphic.calculateAhn('.')

		for(var key in content.people)
		{
			content.mapPoints[key] = new MapPoint(key, content.people[key]);
			var ahn = Graphic.calculateAhn(key)
			if(ahn > content.maxAhn)
				content.maxAhn = ahn
		}

		content.mapCursors = new Array();
		content.mapCursors[0] = content.mapPoints['.']

		content.dirty = true
		setTimeout(positionRootGraphic, 50)
		closeOverlay()

		// store root id in server
		$.ajax({
			url: '/api/user',
			method: 'post',
			data: {id: getUserID(), root: $scope.rootid},
			success: function(response)
			{
				console.log(response)
			},
			error: function(response)
			{
				console.log('error!:', response.status)
			}
		})
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

function setUpUploader()
{
	$('#upload-file-btn').click(function(e)
	{
		$('#file-upload').click()
	})

	var userid = getUserID()
	$('#file-upload').html5_upload({
		url: 'api/user/' + userid + '/parse',
		autostart: true,
		sendBoundary: window.FormData || $.browser.mozilla,
		onStartOne: function(event, name, number, total)
		{
			$('#uploaded-file-container .delete-button').click()
			$('#uploaded-file-container').html('')

			var content = "<div class='uploaded-file' id='uploaded-file'>"
				+ "<div class='delete-button btn btn-default' onclick='deleteUploadedFile()'>&times;</div>"
				+ "<span>" + name + "</span>"
				+ "<div id='file-progressbar' class='progress'>"
				+ "<div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>"
				+ "</div>"
				+ "<input type=hidden id='file-details' name='UploadedFiles'/>"
				+ "</div>"

			$('#uploaded-file-container').html(content)
			$('#upload-file-btn').hide()
			$('#gedcom-results').html("<img src='img/495.gif'/>")
			results.data = {}
			results.$apply()

			return true
		},
		setProgress: function(val)
		{
			var width = Math.floor(100 * val)
			if (width === 100 && $('#file-progressbar .progress-bar').attr('aria-valuenow') != width && !$('#upload-file-btn').is(':visible'))
			{
				$('#file-progressbar div').html("<span class='glyphicon glyphicon-arrow-up'></span> <span>Uploaded</span>")
				$('#gedcom-results').append("<h1>Parsing...</h1>")
			}
			$('#file-progressbar .progress-bar').css('width', width + '%')
			$('#file-progressbar .progress-bar').attr('aria-valuenow', width)
		},
		onFinishOne: function(event, response, name, number, total)
		{
			if ($('#upload-file-btn').is(':visible'))
				return

			$('#file-progressbar div').html("<span class='glyphicon glyphicon-ok'></span> <span>Complete</span>")
			response = JSON.parse(response)
			loadParsedFile(response)
		},
		onError: function(event, name, error)
		{
			$('#file-progressbar div').html("<span class='glyphicon glyphicon-ban-circle'></span> <span>Error</span>")
		}
	})
}

function deleteUploadedFile()
{
	$('#uploaded-file-container, #gedcom-results').html('')
	$('#upload-file-btn').show()
	delete results.data
	delete results.newpeople
	results.dataReady = false
	results.$apply()
}