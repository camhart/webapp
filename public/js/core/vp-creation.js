createGraphics = function()
{
	for (var i in content.graphics)
	{
		var g = content.graphics[i]

		if (g.center.x < canvas.width() + GRAPHIC_WIDTH
			&& g.center.x > -GRAPHIC_WIDTH
			&& g.center.y > canvas.offset().top - GRAPHIC_WIDTH
			&& g.center.y < canvas.offset().top + canvas.height() + GRAPHIC_WIDTH)
		{
			// get parents
			var fp = g.path + '0'
			var mp = g.path + '1'

			if (!g.empty && !(fp in content.graphics))
			{
				var f;
				if (fp in content.people)
					f = content.people[fp]
				else
					f = { empty: true, gender: 'm' }

				var fg = new Graphic(f, fp)
				var fc = VPOffsets.getCenterOfNorthChild(g)
				fg.translate(fc)
				content.graphics[fp] = fg
				content.dirty = true
			}

			if (!g.empty && !(mp in content.graphics))
			{
				var m
				if (mp in content.people)
					m = content.people[mp]
				else
					m = { empty: true, gender: 'f' }

				var mg = new Graphic(m, mp)
				var mc = VPOffsets.getCenterOfSouthChild(g)
				mg.translate(mc)
				content.graphics[mp] = mg
				content.dirty = true
			}
		}
	}
}

destroyGraphics = function()
{

}