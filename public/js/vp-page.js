// window.onbeforeunload = function()
// {
// 	return "Are you sure? You may lose data"
// }

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

	$('.blockMsg').click(function(e)
	{
		$.unblockUI()
	})
});

$.extend($.blockUI.defaults.css, {
	padding:        '10px 0',
    color:          '#333',
    border:         'none',
    'border-radius':'6px',
})

$(document).ready(function()
{
	$overlay = $('#overlay')
	$overlay.remove()

	$('#user-login, #user-signup').click(function(e)
	{
		$('body').append($overlay)
		setTimeout(function()
		{
			$overlay.addClass('overlay-visible')
		}, 50)

		$overlay.click(function(e)
		{
			$overlay.removeClass('overlay-visible')
			setTimeout(function()
			{
				$overlay.remove()
			}, 250)
		})
	})
})
