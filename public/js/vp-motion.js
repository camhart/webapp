var x, y, is_mousedown = false

$('#content').mousedown(function(e)
{
	is_mousedown = true
	x = e.clientX
	y = e.clientY
})

$('#content').mousemove(function(e)
{
	if (is_mousedown)
	{
		var dx = e.clientX - x
		var dy = e.clientY - y
		console.log('dragging!', dx, 'x', dy)
		x = e.clientX
		y = e.clientY

		translate_graphics(dx, dy, y)
	}
})

$('#content').mouseup(function(e)
{
	is_mousedown = false
})

function translate_graphics(dx, dy, y)
{

}