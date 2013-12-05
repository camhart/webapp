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
		setUpUploader()
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
		deleteUploadedFile()
		$overlay.remove()
	}, 250)
}

$(document).ready(function()
{
	$overlay = $('#overlay')
	$overlay.remove()

	$('#user-login, #user-signup, #upload-gedcom').click(showOverlay)
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

function setUpUploader()
{
	$('#upload-file-btn').click(function(e)
	{
		$('#file-upload').click()
	})

	$('#file-upload').html5_upload({
		url: '/parse',
		autostart: true,
		sendBoundary: window.FormData || $.browser.mozilla,
		onStartOne: function(event, name, number, total)
		{
			$('#uploaded-file-container .delete-button').click()
			$('#uploaded-file-container').html('')

			var content = "<div class='uploaded-file' id='uploaded-file'>"
				+ "<div class='delete-button btn btn-default' onclick='deleteUploadedFile()'>&times;</div>"
				+ "<span>" + name + "</span>"
				+ "<div id='file-progressbar' class='progress'>"
				+ "<div class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>"
				+ "</div>"
				+ "<input type=hidden id='file-details' name='UploadedFiles'/>"
				+ "</div>"

			$('#uploaded-file-container').html(content)
			$('#upload-file-btn').hide()
			$('#gedcom-results').html("<img src='img/495.gif'/>")
			results.data = {}
			results.$apply()

			return true
		},
		setProgress: function(val)
		{
			var width = Math.floor(100 * val)
			if (width === 100 && $('#file-progressbar .progress-bar').attr('aria-valuenow') != width && !$('#upload-file-btn').is(':visible'))
			{
				$('#file-progressbar div').html("<span class='glyphicon glyphicon-arrow-up'></span> <span>Uploaded</span>")
				$('#gedcom-results').append("<h1>Parsing...</h1>")
			}
			$('#file-progressbar .progress-bar').css('width', width + '%')
			$('#file-progressbar .progress-bar').attr('aria-valuenow', width)
		},
		onFinishOne: function(event, response, name, number, total)
		{
			if ($('#upload-file-btn').is(':visible'))
				return

			$('#file-progressbar div').html("<span class='glyphicon glyphicon-ok'></span> <span>Complete</span>")
			response = JSON.parse(response)
			loadParsedFile(response)
		},
		onError: function(event, name, error)
		{
			$('#file-progressbar div').html("<span class='glyphicon glyphicon-ban-circle'></span> <span>Error</span>")
		}
	})
}

function deleteUploadedFile()
{
	$('#uploaded-file-container, #gedcom-results').html('')
	$('#upload-file-btn').show()
	delete results.data
	delete results.newpeople
	results.dataReady = false
	results.$apply()
}