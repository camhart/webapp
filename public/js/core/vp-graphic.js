var __graphic_nextid__ = 0

function Graphic(givenname, surname, gender, path)
{
	this.id = __graphic_nextid__
	__graphic_nextid__ += 1
	this.displayname = givenname + ' ' + surname
	this.givenname = givenname
	this.surname = surname
	this.gender = gender
	this.path = path
	this.center = new Vector2D()
	this.calculateAhn()
}

Graphic.prototype.getCenterPoint = function()
{
	return this.center.getCopy()
}

Graphic.prototype.getTopLeftCorner = function()
{
	var point = this.getCenterPoint()
	point.x -= GRAPHIC_HALF_WIDTH
	point.y -= GRAPHIC_HALF_HEIGHT
	return point
}

Graphic.prototype.translate = function(x, y)
{
	this.center.add(x, y)
}

Graphic.prototype.calculateAhn = function()
{
	this.ahn = parseInt('1' + this.path, 2)
}
