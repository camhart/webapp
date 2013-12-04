
$(document).ready(function() {

});

$('#user-generate').click(function(){
    json = {}
    json.id = $('.user-content input[name=id]').val()
    json.firstname = $('.user-content input[name=firstname]').val()
    json.lastname = $('.user-content input[name=lastname]').val()
    json.gender = $('.user-content input[name=gender]').val()
    json.email = $('.user-content input[name=email]').val()
    $('#url').val('user/' + json.id)
    $('#body').val(JSON.stringify(json, undefined, 2))        
})

$('#batch-generate').click(function(){
    listString = $('.batch-content input[name=list-string]').val()
    console.log(listString)
    json = listString.replace(/\s+/g, '').split(',')
    $('#url').val('person/')
    $('#body').val(JSON.stringify(json, undefined, 2))        
})

$('#person-generate').click(function(){
    multiplier = $('.person-content input[name=multiplyperson]').val()
    if(!multiplier) {
        multiplier = 1
    }
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
    $('#url').val('person')
    $('#body').val(JSON.stringify(arr, undefined, 2))          
})

$('#buttons button[value=get]').click(function(event){
    // var ids = {}
    // if($('#url').val().indexOf("person") == 0) {
    //     slashPos = $('#url').val().lastIndexOf('/')
    //     if(slashPos != -1)
    //         $('#url').val($('#url').val().substring(0, slashPos));
    //     //if person and get, put body from batch in?        
    //     ids = $('#body').val()
    // }
    //event.preventDefault();
    $.ajax({
        type : 'GET',
        url : $('#url').val(),
        headers: $('#headers').val(),
        contentType: 'application/json',
        dataType: 'json',
        params: {'data': $('#body').val()},
        complete: ajaxComplete,
    })
})

$('#buttons button[value=delete]').click(function(){
    if($('#url').val().indexOf("person") == 0) {
        slashPos = $('#url').val().lastIndexOf('/')
        if(slashPos != -1)
            $('#url').val($('#url').val().substring(0, slashPos));
    }
    $.ajax({
        type : 'DELETE',
        contentType: 'application/json',
        url : $('#url').val(),
        headers: $('#headers').val(),
        complete: ajaxComplete
    })
})

$('#buttons button[value=post]').click(function(){
    //if($('#url').val().indexOf("user") == 0) {
    slashPos = $('#url').val().lastIndexOf('/')
    if(slashPos != -1)
        $('#url').val($('#url').val().substring(0, slashPos));
    // }
    $.ajax({
        type : 'POST',
        contentType: 'application/json',
        dataType: 'json',
        //url : ($('#url').val().indexOf("user") == 0) ? $('#url').val().substring(0, $('#url').val().lastIndexOf('/')) : $('#url').val(),
        url : $('#url').val(),
        headers: $('#headers').val(),
        data: $('#body').val(),
        complete: ajaxComplete
    })
})

$('#buttons button[value=put]').click(function(){
    // if($('#url').val().indexOf("user") == 0) {
        slashPos = $('#url').val().lastIndexOf('/')
        if(slashPos != -1)
            $('#url').val($('#url').val().substring(0, slashPos));
    // }    
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

$('#buttons button[value=usertable]').click(function(){
    console.log('did ajax');
    $.ajax({
        type : 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url : 'usertable',
        headers: $('#headers').val(),
        complete: ajaxComplete
    })
})


$('#buttons button[value=persontable]').click(function(){
    console.log('did ajax');
    $.ajax({
        type : 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url : 'persontable',
        headers: $('#headers').val(),
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


