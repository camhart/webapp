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
		// $('#sign-up-container').show('blind', { }, 250)
	}
	else if (this.id === 'user-signin')
	{
		$('#gedcom-form').hide()
		$('#signup-form').show()
		// $('#sign-in-container').show('blind', { }, 250)
	}
	else if (this.id === 'upload-gedcom')
	{
		$('#signup-form').hide()
		$('#gedcom-form').show()
		setUpUploader()
	}

	// $('#signup-btn').click(function(e)
	// {
	// 	$('#sign-in-container').hide('blind', { }, 250)
	// 	$('#sign-up-container').show('blind', { }, 250)
	// })

	// $('#signin-btn').click(function(e)
	// {
	// 	$('#sign-in-container').show('blind', { }, 250)
	// 	$('#sign-up-container').hide('blind', { }, 250)
	// })

	// $('#signingoogle-btn').click(function(e)
	// {
 //        window.location = '/auth/google'
	// })

	$('#signin-google-btn').click(function(e){
        window.location = '/auth/google'
	})
	$('#signin-facebook-btn').click(function(e){
        window.location = '/auth/facebook'
	})
	$('#signin-github-btn').click(function(e){
		alert('Not implemented')
        // window.location = '/auth/github'
	})
	$('#signin-familysearch-btn').click(function(e){
        window.location = '/auth/familysearch'
	})
	$('#signin-twitter-btn').click(function(e){
        window.location = '/auth/twitter'
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
		deleteUploadedFile()
		$overlay.remove()
	}, 250)
}

$(document).ready(function()
{
	$overlay = $('#overlay')
	$overlay.remove()

	$('#user-signin, #upload-gedcom').click(showOverlay)

	performSigninRoutine()
})

function performSigninRoutine()
{
	if (isSignedIn())
	{
		$('#user-signin').hide()
		$('#user-signout').show()
	}
	else
	{
		$('#user-signout').hide()
	}
}