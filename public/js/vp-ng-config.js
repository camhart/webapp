angular.module('vp', []).
directive('draggable', function($document)
{
	return function(scope, element, attr)
	{
		var startX = 0, startY = 0, x = 0, y = 0;
		function mousemove(event)
		{
			y = event.screenY - startY;
			x = event.screenX - startX;
			element.css({
				top: y + 'px',
				left:  x + 'px'
			});
		}

		function mouseup()
		{
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}

		element.on('mousedown', function(event)
		{
			x = element.css('left')
			x = Number(x.substring(0, x.length - 2))

			y = element.css('top')
			y = Number(y.substring(0, y.length - 2))
			// Prevent default dragging of selected content
			event.preventDefault();
			startX = event.screenX - x;
			startY = event.screenY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});
	}
});