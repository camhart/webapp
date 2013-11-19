$('#show-sidebar').click(function(e)
{
	var sidebar = $('#vp-sidebar')
	var left = sidebar.css('left')
	left = Number(left.substring(0, left.length - 2))
	var target = left == 0 ? -sidebar.outerWidth() : 0

	var sidebar_visible = sidebar.css('left') == '0'
	var easing = 'easeOutExpo'
	if (left == '0')
		easing = 'easeInExpo'

	sidebar.animate({
		left: target + 'px'
	}, {
		duration: 400,
		easing: easing
	})
});

$('#ui-block').click(function(e)
{
	$.blockUI()

	setTimeout($.unblockUI, 2000)
});

$('#test-js-java').click(function(e)
{
	applet.testString = "Hello this is JavaScript code"
	var result = applet.testMethod("I am JavaScript")
	alert("calling Java method testMethod(String) returned " + result)
});

function jsMethod(param)
{
	alert("JavaScript method called from Java with parameter: " + param)
}