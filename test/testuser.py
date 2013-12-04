

import requests as req
import json
import urllib

USER = {
    'firstname' : 'jason',
    'lastname' : 'rasmussen',
    'email' : 'email1',
    'gender' : 'm'
}

MSG_NO_USR = '{ "results" : "no user found"}'

BASE = 'http://localhost:8000/'
HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}

passed = 0
failed = 0

def asserts(expected, actual, res):
    if (expected == actual):
        # print 'PASS'
        global passed
        passed += 1
    else:
        print 'FAIL\n  Expected %s, Actual: %s [%s]' % (expected, actual, urllib.unquote(res.url))
        print "  >>>ERROR: " , res.text
        global failed 
        failed += 1

def userTests():
    # reset dataBASE
    res = req.get(BASE + 'resetdb', headers=HEADERS)
    asserts(200, res.status_code, res)

    # test userAdd (PUT)
    res = req.put(BASE + 'user/', data=json.dumps(USER), headers=HEADERS)
    asserts(200, res.status_code, res)
    asserts(0, json.loads(res.text)['unchanged'], res)
    asserts(0, json.loads(res.text)['skipped'], res)
    asserts(0, json.loads(res.text)['replaced'], res)
    asserts(1, json.loads(res.text)['inserted'], res)
    asserts(0, json.loads(res.text)['errors'], res)
    asserts(0, json.loads(res.text)['deleted'], res)
    USER['id'] = json.loads(res.text)['generated_keys'][0]

    # test userGet (GET)
    res = req.get(BASE + 'user/' + USER['id'], headers=HEADERS)
    asserts(200, res.status_code, res)
    asserts(USER, json.loads(res.text), res)

    # test userUpdate (POST)
    USER['lastname'] = 'newlastname'
    res = req.post(BASE + 'user/', data=json.dumps(USER), headers=HEADERS)
    asserts(200, res.status_code, res)
    asserts(0, json.loads(res.text)['unchanged'], res)
    asserts(0, json.loads(res.text)['skipped'], res)
    asserts(1, json.loads(res.text)['replaced'], res)
    asserts(0, json.loads(res.text)['inserted'], res)
    asserts(0, json.loads(res.text)['errors'], res)
    asserts(0, json.loads(res.text)['deleted'], res)

    # test userDelete (DELETE)
    res = req.delete(BASE + 'user/' + USER['id'], headers=HEADERS)
    asserts(200, res.status_code, res)
    asserts(0, json.loads(res.text)['unchanged'], res)
    asserts(0, json.loads(res.text)['skipped'], res)
    asserts(0, json.loads(res.text)['replaced'], res)
    asserts(0, json.loads(res.text)['inserted'], res)
    asserts(0, json.loads(res.text)['errors'], res)
    asserts(1, json.loads(res.text)['deleted'], res)

    res = req.get(BASE + 'user/' + USER['id'], headers=HEADERS)
    asserts(200, res.status_code, res)
    asserts(json.loads(MSG_NO_USR), json.loads(res.text), res)

    # test other cases

    # user get without id specified
    res = req.get(BASE + 'user', headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot GET /user", res.text, res)
    res = req.get(BASE + 'user/', headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot GET /user/", res.text, res)

    # user delete without id specified
    res = req.delete(BASE + 'user', headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot DELETE /user", res.text, res)
    res = req.delete(BASE + 'user/', headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot DELETE /user/", res.text, res)

    # user update with id specified
    res = req.post(BASE + 'user/' + USER['id'], headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot POST /user/" + USER['id'], res.text, res)
    
    # user add with id specified
    res = req.put(BASE + 'user/' + USER['id'], headers=HEADERS)
    asserts(404, res.status_code, res)
    asserts("Cannot PUT /user/" + USER['id'], res.text, res)

userTests()



print 'Passed: %s\nFailed: %s' % (passed, failed)
