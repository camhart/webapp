$('#show-sidebar').click(function(e)
{
	var sidebar = $('#vp-sidebar')
	var left = sidebar.css('left')
	left = Number(left.substring(0, left.length - 2))
	var target = left == 0 ? -sidebar.outerWidth() : 0

	sidebar.animate({
		left: target + 'px'
	}, {
		duration: 400,
		easing: 'easeOutExpo'
	})
});

$('#ui-block').click(function(e)
{
	$.blockUI()

	setTimeout($.unblockUI, 2000)
});

$.extend($.blockUI.defaults.css, {
	padding:        '10px 0',
    color:          '#333',
    border:         'none',
    'border-radius':'6px',
})

function Content($scope)
{
	$scope.graphics = [
		{
			id: 1,
			displayname: 'Ryan Cheatham',
			gender: 'm',
			ahn: 1
		},
		{
			id: 2,
			displayname: 'Robyn Abrahamson',
			gender: 'f',
			ahn: false
		}
	]
}