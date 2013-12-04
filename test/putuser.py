import requests

host = 'localhost'

response = requests.put(url='http://' + host + ':8000/user', allow_redirects=True, data='{"firstname":"cameron", "lastname":"hartmann", "gender":"male", "email":"camhart73@gmail.com"}')
print response