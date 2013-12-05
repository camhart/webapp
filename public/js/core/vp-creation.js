createGraphics = function()
{
	for (var i in content.graphics)
	{
		var g = content.graphics[i]

		if (g.center.x < canvas.width()
			&& g.center.x > 0
			&& g.center.y > 0
			&& g.center.y < canvas.height())
		{
			// get parents
			var fp = g.path + '0'
			var mp = g.path + '1'

			if (!g.empty && /**/!(fp in content.graphics))
			{
				var f = getPerson(fp)

				var fg = new Graphic(f, fp)
				var fc = VPOffsets.getCenterOfNorthChild(g)
				fg.translate(fc)
				content.graphics[fp] = fg
				drawConnectionLines(g, fg)
				content.dirty = true
			}

			if (!g.empty && /**/!(mp in content.graphics))
			{
				var m = getPerson(mp)

				var mg = new Graphic(m, mp)
				var mc = VPOffsets.getCenterOfSouthChild(g)
				mg.translate(mc)
				content.graphics[mp] = mg
				drawConnectionLines(g, mg)
				content.dirty = true
			}

			// get child
			if (g.path.length > 1)
			{
				var cp = g.path.substring(0, g.path.length - 1)
				if (!(cp in content.graphics))
				{
					var c = getPerson(cp)

					var cg = new Graphic(c, cp)
					var cc = VPOffsets.getCenterOfParent(g)

					cg.translate(cc)
					content.graphics[cp] = cg
					content.dirty = true
				}
			}

			// get north neighbor
			if (!g.empty && /**/g.path.indexOf('1') !== -1)
			{
				var np = (g.ahn - 1).toString(2)
				np = '.' + np.substring(1)

				if (!(np in content.graphics) && np in content.people)
				{
					var n = getPerson(np)
					var ng = new Graphic(n, np)
					var nc = VPOffsets.getCenterOfNorthNode(g)

					ng.translate(nc)
					content.graphics[np] = ng
					content.dirty = true
				}
			}

			// get south neighbor
			if (!g.empty && /**/g.path.indexOf('0') !== -1)
			{
				var sp = (g.ahn + 1).toString(2)
				sp = '.' + sp.substring(1)

				if (!(sp in content.graphics) && sp in content.people)
				{
					var s = getPerson(sp)
					var sg = new Graphic(s, sp)
					var sc = VPOffsets.getCenterOfSouthNode(g)

					sg.translate(sc)
					content.graphics[sp] = sg
					content.dirty = true
				}
			}
		}
	}
}

function getPerson(path)
{
	if (path in content.people)
		return content.people[path]
	else
	{
		g = path[path.length - 1] === '0' ? 'M' : 'F'
		return { empty: true, gender: g }
	}
}

destroyGraphics = function()
{
	var margin = GRAPHIC_WIDTH + GRAPHIC_HORIZ_OFFSET

	for (var i in content.graphics)
	{
		var g = content.graphics[i]

		if (g.center.x > canvas.width() + margin
			|| g.center.x < -margin
			|| g.center.y < -margin
			|| g.center.y > canvas.height() + margin)
		{
			destroyConnectionLines_child(content.graphics[i])
			destroyConnectionLine_parent(content.graphics[i])
			delete content.graphics[i]
		}
	}
}

function drawConnectionLines(child, parent)
{

}

function destroyConnectionLines_child(child)
{
	if (child)
	{

	}
}

function destroyConnectionLine_parent(parent)
{
	if (parent && parent.path && parent.path.length > 1)
	{
		var path = parent.path.substring(0, parent.path.length - 1)
		var g = content.graphics[path]
		if (g)
		{

		}
	}
}