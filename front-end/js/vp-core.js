var easing = 'easeOutExpo'

$('#show-sidebar').click(function(e)
{
	var sidebar = $('#vp-sidebar')
	var left = sidebar.css('left')
	left = 0 - sidebar.outerWidth() - Number(left.substring(0, left.length - 2))
	console.log('animating using easing function', easing)
	sidebar.animate({
		left: left + 'px'
	}, {
		duration: 600,
		easing: easing
	})
});

$('#easing-select').change(function()
{
	console.log('setting easing to', this.value)

	easing = this.value
});

$('#ui-block').click(function(e)
{
	$.blockUI()

	setTimeout($.unblockUI, 2000)
});