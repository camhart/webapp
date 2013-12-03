

$(document).ready(function() {

});

$('#user-generate').click(function(){
    // multiplier = $('.user-content input[name=multiplyuser]').val()
    // if(multiplier) {
    //     arr = []
    //     for(var c = 0; c < multiplier; c++) {
    //         json = {}
    //         json.id = $('.user-content input[name=id]').val() + c
    //         json.firstname = $('.user-content input[name=firstname]').val()
    //         json.lastname = $('.user-content input[name=lastname]').val()
    //         json.gender = $('.user-content input[name=gender]').val()
    //         json.email = $('.user-content input[name=email]').val()
    //         arr[c] = json
    //     }
    //     $('#url').val('user/' + json.id)
    //     $('#body').val(JSON.stringify(arr, undefined, 2))        
    // }
    // else {
        json = {}
        json.id = $('.user-content input[name=id]').val()
        json.firstname = $('.user-content input[name=firstname]').val()
        json.lastname = $('.user-content input[name=lastname]').val()
        json.gender = $('.user-content input[name=gender]').val()
        json.email = $('.user-content input[name=email]').val()
        $('#url').val('user/' + json.id)
        $('#body').val(JSON.stringify(json, undefined, 2))        
    // }
})

$('#batch-generate').click(function(){
    listString = $('.batch-content input[name=list-string]').val()
    console.log(listString)
    json = listString.split(',')
    $('#url').val('person/')
    $('#body').val(JSON.stringify(json, undefined, 2))        
})

$('#person-generate').click(function(){
    multiplier = $('.person-content input[name=multiplyperson]').val()
    if(multiplier) {
        console.log('multiply person')
        arr = []
        for(var c = 0; c < multiplier; c++) {
            json = {}
            json.userid = $('.person-content input[name=userid]').val() + c
            json.afn = $('.person-content input[name=afn]').val() + c
            json.id = json.userid + '_' + json.afn
            json.surname = $('.person-content input[name=surname]').val()
            json.lastname = $('.person-content input[name=lastname]').val()
            json.gender = $('.person-content input[name=gender]').val()
            arr[c] = json
        }
        $('#url').val('person/')
        $('#body').val(JSON.stringify(arr, undefined, 2))          
    }
    else {
        json = {}
        json.userid = $('.person-content input[name=userid]').val() + 0
        json.afn = $('.person-content input[name=afn]').val()
        json.id = json.userid + '_' + json.afn
        json.surname = $('.person-content input[name=surname]').val()
        json.lastname = $('.person-content input[name=lastname]').val()
        json.gender = $('.person-content input[name=gender]').val()
        $('#url').val('person/' + json.id)
        $('#body').val(JSON.stringify(json, undefined, 2))
    }
})

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

$('#buttons button[value=delete]').click(function(){
    $.ajax({
        type : 'DELETE',
        contentType: 'application/json',
        url : $('#url').val().substring(0, $('#url').val().lastIndexOf('/')),
        headers: $('#headers').val(),
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

$('#buttons button[value=put]').click(function(){
    $.ajax({
        type : 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        url : $('#url').val().substring(0, $('#url').val().lastIndexOf('/')),
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
        msg = syntaxHighlight(result.responseJSON)
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


