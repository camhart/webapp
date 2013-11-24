function load()
{
	$.ajax({
		url: 'something?name=me&hello=hi',
		success: function(response)
		{
			content.people[n] = response
		}
	})
}