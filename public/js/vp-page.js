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

	setTimeout($.unblockUI, 2000)
});

$.extend($.blockUI.defaults.css, {
	padding:        '10px 0',
    color:          '#333',
    border:         'none',
    'border-radius':'6px',
})

$('#user-signup').click(function(e)
{
	$('#overlay').addClass('overlay-visible')
})

$('#user-login').click(function(e)
{
	$('#overlay').addClass('overlay-visible')
})

$('#overlay').click(function(e)
{
	$(this).removeClass('overlay-visible')
})