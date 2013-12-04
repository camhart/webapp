

var user = require('../routes/user.js')
var person = require('../routes/person.js')

var d_user_id  = 0
var d_person_id  = 0

function getDummyUser(afns){
    d_user_id += 1
    data = {}
    for(i = 0; i < afns.length; i++)
        data[(afns[i])] = getDummyPerson(afns[i])
    user = new user.User(
        'firstname' + d_user_id, 
        'lastname' + d_user_id, 
        'm',
        'email' + d_user_id,
        data)
    return user
}

function getDummyPerson(afn){
    d_person_id += 1
    p = new person.Person(
        afn,
        'firstname' + d_person_id, 
        'lastname' + d_person_id, 
        20 + d_person_id, 
        'email' + d_person_id)
    return p
}


exports.getDummyUser = getDummyUser

