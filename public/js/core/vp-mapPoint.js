function MapPoint(path, person)
{
	this.path = path
	this.ahn = Graphic.calculateAhn(this.path)
	this.person = person
	this.topLeft = new Vector2D()
}

var DEBUG = true;

MapPoint.prototype.getX = function(maxAhn)
{
	this.getTopLeft(maxAhn)
	if(DEBUG)
		console.log("map point at path "+this.path+" has X: "+this.topLeft.x)
	return this.topLeft.x
}

MapPoint.prototype.getY = function(maxAhn)
{
	this.getTopLeft(maxAhn)
	if(DEBUG)
		console.log("map point at path "+this.path+" has Y: "+this.topLeft.y)
	return this.topLeft.y
}

function log(base,num)
{
	return Math.log(num)/Math.log(2)
}

MapPoint.prototype.getTopLeft = function(maxAhn)
{
	this.prevMaxAhn = this.maxAhn;
	this.maxAhn = maxAhn;
	if (this.prevMaxAhn != this.maxAhn)
	{
		var numRows = ~~(log(2,this.maxAhn)+1)
		var myRow = ~~log(2,this.ahn)
		var numCols = ~~Math.pow(2,myRow)
		var myCol = ~~(this.ahn - Math.pow(2,myRow))
		var rowWidth = ~~(MINIMAP_WIDTH/numRows)
		var colHeight = ~~(MINIMAP_HEIGHT/numCols)
		if(DEBUG)
		{
			console.log("In getTopLeft for path "+this.path+" with maxAhn "+maxAhn+" and ahn "+this.ahn)
			console.log("\tnumRows:"+numRows)
			console.log("\tnumCols:"+numCols)
			console.log("\tmyRow:"+myRow)
			console.log("\tmyCol:"+myCol)
			console.log("\trowWidth:"+rowWidth+" and colHeight:"+colHeight)
		}
		this.topLeft.x = myRow*rowWidth+rowWidth/2
		this.topLeft.y = colHeight*myCol+colHeight/2
	}
}