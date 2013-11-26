var x, y, _content_top = 110

function _content_mousemove(e)
{
	e.preventDefault()
	e.stopPropagation()
	var dx = e.clientX - x
	var dy = e.clientY - _content_top - y
	x = e.clientX
	y = e.clientY - _content_top

	translate_graphics(dx, dy, y)
}

function _content_mouseup(e)
{
	$('body').unbind('mousemove', _content_mousemove)
	$('body').unbind('mouseup', _content_mouseup)
}

$('#content').mousedown(function(e)
{
	_content_top = $('#content').offset().top
	x = e.clientX
	y = e.clientY -_content_top
	$('body').on('mousemove', _content_mousemove)
	$('body').on('mouseup', _content_mouseup)
})

function translate_graphics(dx, dy, y)
{
	for (i in content.graphics)
	{
		var vec = new Vector2D(dx, dy)
		var g = content.graphics[i]

        var yOff = g.center.y - y;
        var exp = (vec.x * -1.0) / GRAPHIC_HORIZ_OFFSET;
        var dyOff = yOff * (Math.pow(2, exp) - 1);
        vec.y += dyOff;

		g.translate(vec)
	}

	content.dirty = true
}