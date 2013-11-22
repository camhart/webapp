app.directive('graphic', function($document)
{
	return function(scope, element, attr)
	{
		function mousemove(event)
		{
			event.stopPropagation()
		}

		function mouseup(event)
		{
			event.stopPropagation()
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}

		element.on('mousedown', function(event)
		{
			event.stopPropagation()
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});
	}
});