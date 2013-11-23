var __graphic_nextid__ = 0

function Graphic(person, path)
{
	this.id = __graphic_nextid__
	__graphic_nextid__ += 1
	this.empty = person.empty
	if (!this.empty)
	{
		this.displayname = person.givenname + ' ' + person.surname
		this.givenname = person.givenname
		this.surname = person.surname
	}

	this.gender = person.gender

	this.path = path
	this.center = new Vector2D()
	this.translate(0, 0)
	this.calculateAhn()
}

Graphic.getHalfWidth = function()
{
	return GRAPHIC_HALF_WIDTH
}

Graphic.getWidth = function()
{
	return GRAPHIC_WIDTH
}

Graphic.getHalfHeight = function()
{
	return GRAPHIC_HALF_HEIGHT
}

Graphic.getHeight = function()
{
	return GRAPHIC_HEIGHT
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
	this.center.x = Math.round(this.center.x * 100) / 100
	this.center.y = Math.round(this.center.y * 100) / 100
	this.topleft = this.getTopLeftCorner()
}

Graphic.prototype.calculateAhn = function()
{
	this.ahn = parseInt('1' + this.path.substring(1), 2)
	this.line = this.path.substring(1, 3)
	while(this.line.length < 2)
		this.line += '0'
}

Graphic.prototype.isNorthChild = function()
{
	return this.path.substring(this.path.length - 1) == '0'
}