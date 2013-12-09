
$(document).ready(function(){
    json = {
        key: 'value',
        name: 'example_name',
        age: 'example_age'
    }

    $('#body').val(JSON.stringify(json, undefined, 2))
})

$('#buttons button[value=get]').click(function(event){
    var url = $('#url').val()
    if(url){
        $.ajax({
            type : 'GET',
            url : url,
            headers: $('#headers').val(),
            contentType: 'application/json',
            complete: ajaxComplete,
        })
    }
})

$('#buttons button[value=delete]').click(function(){
    $.ajax({
        type : 'DELETE',
        url : $('#url').val(),
        headers: $('#headers').val(),
        contentType: 'application/json',
        headers: $('#headers').val(),
        data: $('#body').val(),
        dataType: 'json',
        complete: ajaxComplete
    })
})

$('#buttons button[value=post]').click(function(){
    $.ajax({
        type : 'POST',
        contentType: 'application/json',
        headers: $('#headers').val(),
        url : $('#url').val(),
        data: $('#body').val(),
        dataType: 'json',
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

function ajaxComplete(result, status){
    var msg = ""
    if (result.status >= 500) {
      msg = 'Server Error (' + result.status + ')<br>[' + result.responseText + ']'
    } else if (result.status >= 400) {
      msg = 'Client Error (' + result.status + ')<br>[' + result.responseText + ']'
    } else {
        try {
            msg = syntaxHighlight(result.responseJSON)
        } catch(err) {
            console.log(err)
            msg = result.responseText
        }
    }
    $('#results').html('<span>' + msg + '</span>')
}

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


