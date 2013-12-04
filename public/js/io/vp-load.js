function load()
{
	var filename = '/Users/ryan/Documents/Family History/MaxEsplin1.ged'
	Gedcom.parse(filename, loadCallback)
}

function loadCallback(element_top)
{
	console.log('loaded!', element_top)
}