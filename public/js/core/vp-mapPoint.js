alert(numPeople);

function MapPoint()
{
	// Check to see if the count has been initialized
    if ( typeof MapPoint.count == 'undefined' ) {
        // It has not... perform the initilization
        MapPoint.count = 0;
    }
    else
    	++MapPoint.count;
	this.id = MapPoint.count;
}

MapPoint.prototype.calculatePosition = function()
{
	var count = MapPoint.count;
	var rows = math.log(count+1);
	this.x = 0;
	this.y = 0;
}