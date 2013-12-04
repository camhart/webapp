function loadParsedFile(data)
{
	var content = "<table>"
		+ "<thead><tr><th colspan=2>Results</th></tr></thead><tbody>"
		+ "<tr>"
		+ "<td>Number of people found</td>"
		+ "<td>" + Object.size(data.people) + "</td>"
		+ "</tr><tr>"
		+ "<td>Number of families found</td>"
		+ "<td>" + Object.size(data.families) + "</td>"
		+ "</tr>"
		+ "</tbody></table>"

	$('#gedcom-results').html(content)

	// TODO parse
}

Object.size = function(obj)
{
    var size = 0, key
    for (key in obj)
    {
        if (obj.hasOwnProperty(key))
            size++
    }
    return size
}