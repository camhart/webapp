function Content($scope)
{
	$scope.people = {
		'0': {
			id: 1,
			displayname: 'Ryan Cheatham',
			gender: 'm',
			ahn: 1
		},
		'0w': {
			id: 2,
			displayname: 'Robyn Abrahamson',
			gender: 'f',
			ahn: false
		},
		'00': {
			id: 3,
			displayname: 'Max Todd Cheatham',
			gender: 'm',
			ahn: 2
		},
		'01': {
			id: 4,
			displayname: 'Nancy Price',
			gender: 'f',
			ahn: 3
		},
		'000': {
			id: 5,
			displayname: 'Clair Cheatham',
			gender: 'm',
			ahn: 4
		},
		'001': {
			id: 6,
			displayname: 'Vida Frances Nation',
			gender: 'f',
			ahn: 5
		},
		'010': {
			id: 7,
			displayname: 'Delmar Obray Price',
			gender: 'm',
			ahn: 6
		},
		'011': {
			id: 8,
			displayname: 'Marilyn Jensen',
			gender: 'f',
			ahn: 7
		}
	}

	setTimeout(function()
	{
		watch($scope)
	}, 100)
}

var top_of_view = null

$(document).ready(function()
{
	var $root = $('#g-0')

	GRAPHIC_WIDTH = $root.outerWidth()
	GRAPHIC_HEIGHT = $root.outerHeight()
	top_of_view = $root.parent().offset().top

	var top = ($root.parent().height() - GRAPHIC_HEIGHT) / 2 + top_of_view
	var left = $root.parent().width() / 4 - GRAPHIC_WIDTH / 2
	$root.css('top', top + 'px')
	$root.css('left', left + 'px')

	if ($('#g-0w').length > 0)
	{
		$wife = $('#g-0w')
		var wtop = top + GRAPHIC_HEIGHT * 2
		$wife.css('top', wtop + 'px')
		$wife.css('left', left + 'px')
	}
	else if ($('#g-0h').length > 0)
	{
		$husband = $('#g-0h')
		var htop = top - GRAPHIC_HEIGHT * 2
		$husband.css('top', htop + 'px')
		$husband.css('left', left + 'px')
	}

	setTimeout(vp_content_update, 0)
});

function watch($scope)
{
	// update all visible graphics



	setTimeout(vp_content_update, 30)
}