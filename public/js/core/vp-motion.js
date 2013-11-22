var x, y

function _content_mousemove(e)
{
	var dx = e.clientX - x
	var dy = e.clientY - y
	x = e.clientX
	y = e.clientY

	translate_graphics(dx, dy, y)
}

function _content_mouseup(e)
{
	$(this).unbind('mousemove', _content_mousemove)
	$(this).unbind('mouseup', _content_mouseup)
}

$('#content').mousedown(function(e)
{
	x = e.clientX
	y = e.clientY
	$(this).on('mousemove', _content_mousemove)
	$(this).on('mouseup', _content_mouseup)
})

function translate_graphics(dx, dy, y)
{
	for (i in content.graphics)
	{
		var graphic = content.graphics[i]
		graphic.translate(dx, dy)
	}
}