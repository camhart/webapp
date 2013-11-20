angular.module('vp', []).
directive('draggable', function($document)
{
	console.log('implementing draggable')
	return function(scope, element, attr)
	{
		console.log('setting up draggable for', element)
		var startX = 0, startY = 0, x = 0, y = 0;
		function mousemove(event)
		{
			console.log('mousemove')
			y = event.screenY - startY;
			x = event.screenX - startX;
			element.css({
				top: y + 'px',
				left:  x + 'px'
			});
		}

		function mouseup()
		{
			console.log('mouseup')
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}

		element.on('mousedown', function(event)
		{
			// Prevent default dragging of selected content
			event.preventDefault();
			console.log('mousedown');
			startX = event.screenX - x;
			startY = event.screenY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});
	}
});