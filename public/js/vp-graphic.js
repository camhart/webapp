var nextid = 0

function Graphic(givenname, surname, gender, path) {
	this.id = nextid
	nextid += 1
	this.displayname = givenname + ' ' + surname
	this.givenname = givenname
	this.surname = surname
	this.gender = gender
	this.path = path
}