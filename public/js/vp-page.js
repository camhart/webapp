// window.onbeforeunload = function()
// {
// 	return "Are you sure? You may lose data"
// }

$('#show-sidebar').click(function(e)
{
	var sidebar = $('#vp-sidebar')
	var left = sidebar.css('left')
	left = Number(left.substring(0, left.length - 2))
	var target = left == 0 ? -sidebar.outerWidth() : 0

	sidebar.animate({
		left: target + 'px'
	}, {
		duration: 400,
		easing: 'easeOutExpo'
	})
});

$('#ui-block').click(function(e)
{
	$.blockUI({ message: '<h1>Click here to close</h1>' })

	$('.blockMsg').click(function(e)
	{
		$.unblockUI()
	})
});

$.extend($.blockUI.defaults.css, {
	padding: '10px 0',
    color: '#333',
    border: 'none',
    'border-radius': '6px',
})

function showOverlay(e, divid)
{
	$('body').append($overlay)

	setTimeout(function()
	{
		$overlay.addClass('overlay-visible')
	}, 50)

	$('.overlay-content').click(function(e)
	{
		e.stopPropagation()
	})

	$overlay.click(closeOverlay)
	$('#overlay-close').click(closeOverlay)

	if (this.id === 'user-signup')
	{
		$('#gedcom-form').hide()
		$('#signup-form').show()
		$('#sign-up-container').show('blind', { }, 250)
	}
	else if (this.id === 'user-login')
	{
		$('#gedcom-form').hide()
		$('#signup-form').show()
		$('#sign-in-container').show('blind', { }, 250)
	}
	else if (this.id === 'upload-gedcom')
	{
		$('#signup-form').hide()
		$('#gedcom-form').show()
	}

	$('#signup-btn').click(function(e)
	{
		$('#sign-in-container').hide('blind', { }, 250)
		$('#sign-up-container').show('blind', { }, 250)
	})

	$('#signin-btn').click(function(e)
	{
		$('#sign-in-container').show('blind', { }, 250)
		$('#sign-up-container').hide('blind', { }, 250)
	})

	$('#sign-in-container button.submit').click(signIn)
	$('#sign-up-container button.submit').click(signUp)
}

function closeOverlay(e)
{
	$overlay.removeClass('overlay-visible')
	setTimeout(function()
	{
		$('#sign-in-container, #sign-up-container').hide()
		$overlay.remove()
	}, 250)
}

$(document).ready(function()
{
	$overlay = $('#overlay')
	$overlay.remove()

	$('#user-login, #user-signup, #upload-gedcom').click(showOverlay)
	$('#gedcom-file').fileupload({
		url: '/parse'
	})
})

function signIn(clickEvent)
{
	alert('Sign-in functionality has not yet been implemented!')
	return false
}

function signUp(clickEvent)
{
	alert('Sign-up functionality has not yet been implemented!')
	return false
}

function uploadFiles(e)
{
	// var file = $('#gedcom-file').files[0]
	// console.log(file)

	// $.ajax({
	// 	url: '/parse',
	// 	type: 'post',
	// 	success: function(response)
	// 	{
	// 		alert('received ' + response.length + ' bytes of data')
	// 		// console.log(response)
	// 	}
	// })
	return false
}