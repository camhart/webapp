
function processGCData(data)
{
    var people = buildPeopleList(data.INDI)
    var families = buildFamiliyList(data.FAM)

    var result = linkFamilies(people, families)
    // console.log(JSON.stringify(result, null, 4))

    return result
}

function buildPeopleList(data)
{
    var people = {}

    for (var i in data)
    {
        var person = {}

        data[i].simplify()
        var pdata = data[i]

        var personid = parseID(pdata.id)
        var name = pdata.NAME
        if (name instanceof Array)
        {
            person.fullname = name[0].value
            if (typeof name[0].SURN === 'object')
                person.surname = name[0].SURN.value
            if (typeof name[0].GIVN === 'object')
                person.givenname = name[0].GIVN.value

            person.othernames = []

            for (var i = 1; i < name.length; i++)
            {
                var othername = {}
                othername.fullname = name[i].value
                if (typeof name[0].SURN === 'object')
                    othername.surname = name[0].SURN.value
                if (typeof name[0].GIVN === 'object')
                    othername.givenname = name[0].GIVN.value

                person.othernames.push(othername)
            }
        }
        else if (name instanceof Object)
        {
            person.fullname = name.value
            if (typeof name.SURN === 'object')
                person.surname = name.SURN.value

            if (typeof name.GIVN === 'object')
                person.givenname = name.GIVN.value
        }

        if (!person.fullname && (person.surname || person.givenname))
            person.fullname = person.surname + ' ' + person.givenname

        if (!person.fullname || person.fullname.length === 0)
        {
            console.log('did not find name for individual!')

            if (name)
                console.log(name)
            else
                console.log('individual did not have NAME tag')
        }

        var gender = pdata.SEX
        if (gender)
        {
            person.gender = gender.value
        }

        var birth = pdata.BIRT
        if (birth)
        {
            if (typeof birth.DATE === 'object')
            {
                person.birthdate = birth.DATE.value
                person.bdate_ms = Date.parse(birth.DATE.value)
            }

            if (typeof birth.PLAC === 'object')
                person.birthplace = birth.PLAC.value
        }

        var death = pdata.DEAT
        if (death)
        {
            if (typeof death.DATE === 'object')
            {
                person.deathdate = death.DATE.value
                person.ddate_ms = Date.parse(death.DATE.value)
            }

            if (typeof death.PLAC === 'object')
                person.deathplace = death.PLAC.value
        }

        var burial = pdata.BURI
        if (burial)
        {
            if (typeof burial.DATE === 'object')
                person.burialdate = burial.DATE.value

            if (typeof burial.PLAC === 'object')
                person.burialplace = burial.PLAC.value
        }

        var afn = pdata.AFN
        if (afn)
        {
            person.afn = afn.value
        }

        var ords = parseLDSOrdinances(pdata)

        if (!Object.isEmpty(ords))
            person.lds_ordinances = ords

        people[personid] = person
    }

    return people
}

function parseLDSOrdinances(pdata)
{
    var ordnames = {
        'BAPL': 'baptism',
        'CONL': 'confirmation',
        'ENDL': 'endowment',
        'SLGC': 'seealing_to_parents',
        'SLGS': 'sealing_to_spouse'
    }

    var ordinances = {}

    for (var name in ordnames)
    {
        var result = parseLDSOrdinance(name, pdata)
        if (result)
            ordinances[ordnames[name]] = result
    }

    return ordinances
}

function parseLDSOrdinance(ordinance, pdata)
{
    var ord = pdata[ordinance]
    if (ord)
    {
        var result = {}
        if (typeof ord.DATE === 'object')
            result.date = ord.DATE.value
        if (typeof ord.PLAC === 'object')
            result.place = ord.PLAC.value
        if (typeof ord.AGE === 'object')
            result.age = ord.AGE.value
        if (typeof ord.TEMP === 'object')
            result.temple = ord.TEMP.value
        if (typeof ord.FAMC === 'object')
            result.family = parseID(ord.FAMC.id)

        return result
    }
    else
        return null
}

function buildFamiliyList(data)
{
    var families = {}

    for (var key in data)
    {
        data[key].simplify()
        var fdata = data[key],
            family = {}

        var familyid = parseID(fdata.id)

        var husb = fdata.HUSB
        if (husb)
            family.husband = parseID(fdata.HUSB.id)

        var wife = fdata.WIFE
        if (wife)
            family.wife = parseID(fdata.WIFE.id)

        var marr = fdata.MARR
        if (marr)
        {
            family.marriage = {}
            if (typeof marr.DATE === 'object')
                family.marriage.date = marr.DATE.value
            if (typeof marr.PLAC === 'object')
                family.marriage.place = marr.PLAC.value
        }

        var chil = fdata.CHIL
        if (chil)
        {
            family.children = []
            if (chil instanceof Array)
            {
                for(var c in chil)
                {
                    var id = parseID(chil[c].id)
                    family.children.push(id)
                }
            }
            else
            {
                family.children.push(parseID(chil.id))
            }
        }

        var ords = parseLDSOrdinances(fdata)

        if (!Object.isEmpty(ords))
            family.lds_ordinances = ords

        families[familyid] = family
    }

    return families
}

function linkFamilies(people, families)
{
    for (var i in families)
    {
        var family = families[i]

        var husband = people[family.husband]
        var wife = people[family.wife]

        if (husband)
        {
            husband.children = family.children
        }

        if (wife)
        {
            wife.children = family.children
        }

        for (var i in family.children)
        {
            var child = people[family.children[i]]
            child.father = family.husband
            child.mother = family.wife
        }
    }

    return {
        people: people,
        families: families
    }
}

function parseID(id)
{
    return id.substring(1, id.length - 1)
}

Object.size = function(obj)
{
    var size = 0, key
    for (key in obj)
    {
        if (obj.hasOwnProperty(key))
            size++
    }
    return size
}

Object.isEmpty = function(obj)
{
    for (var key in obj)
    {
        if (obj.hasOwnProperty(key))
            return false
    }
    return true
}

exports.parse = processGCData