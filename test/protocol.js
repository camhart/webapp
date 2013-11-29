

$(document).ready(function() {

});

$('#buttons button[value=get]').click(function(){
    $.ajax({
        type : 'GET',
        contentType: 'application/json',
        url : $('#url').val(),
        headers: $('#headers').val(),
        dataType: 'json',
        complete: ajaxComplete
    })
})

$('#buttons button[value=post]').click(function(){
    $.ajax({
        type : 'POST',
        contentType: 'application/json',
        dataType: 'json',
        url : $('#url').val(),
        headers: $('#headers').val(),
        data: $('#body').val(),
        complete: ajaxComplete
    })
})

$('#buttons button[value=delete]').click(function(){
    $.ajax({
        type : 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        url : $('#url').val(),
        headers: $('#headers').val(),
        data: $('#body').val(),
        complete: ajaxComplete
    })
})

$('#buttons button[value=put]').click(function(){
    $.ajax({
        type : 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        url : $('#url').val(),
        headers: $('#headers').val(),
        data: $('#body').val(),
        complete: ajaxComplete
    })
})

function ajaxComplete(result, status, xhr){
    try {
        var json = JSON.stringify(result.responseJSON, undefined, 2)
        var text = syntaxHighlight(json)
        $('#results').html('<span>' + text + '</span>')
    } catch(e) {
        console.log(e)
        var msg = "RESULT: " + result.responseJSON + " (see console)"
        var err = "ERROR: " + e
        $('#results').html("<span>" + msg + "<br>" + err + "</span>")
        throw e
    }
}

$('#user-generate').click(function(){
    json = {}
    json.firstname = $('.user-content input[name=firstname]').val()
    json.lastname = $('.user-content input[name=lastname]').val()
    json.gender = $('.user-content input[name=gender]').val()
    json.email = $('.user-content input[name=email]').val()
    $('#url').val('user/' + json.email)
    $('#body').val(JSON.stringify(json, undefined, 2))
})

$('#person-generate').click(function(){
    json = {}
    json.surname = $('.person-content input[name=surname]').val()
    json.lastname = $('.person-content input[name=lastname]').val()
    json.gender = $('.person-content input[name=gender]').val()
    json.key = $('.person-content input[name=key]').val()
    $('#url').val('person/' + json.key)
    $('#body').val(JSON.stringify(json, undefined, 2))
})

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


