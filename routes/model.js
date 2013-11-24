


function User(firstname, lastname, gender, email, data){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
    this.data = data
    this.empty = false
}


function Person(afn, givenname, surname, gender){
    this.afn = afn
    this.givenname = givenname
    this.surname= surname
    this.gender = gender
}


exports.User = User
exports.Person = Person
