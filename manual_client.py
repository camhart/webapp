import requests
import socket
import re

port = raw_input('enter port: ')

if port == '' or port == 'd' or port == 'default':
	port = '8080'

def get_request():
	print 'enter the RAW request you would like to send:'
	lines = []
	while True:
		lines.append(raw_input('>> ')+'\r\n')
		if len(lines) >= 2 and len(lines[-2]) == 2 and len(lines[-1]) == 2:
			request = ''.join(lines)
			return request[:-2]

def send_request(socket, request):
	total = 0
	while total < len(request):
		sent = socket.send(request[total:])
		if sent == 0:
			print 'connection error! disconnected'
			return
		total += sent
		print 'sent %d of %d bytes for a total of %d sent' % (sent, len(request), total)

	print 'send success'

while True:
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	try:
		command = raw_input('>> ')
		if command == 'quit' or command == 'q':
			print 'quitting...'
			break
		elif command.startswith('send') or command.startswith('s'):
			try:
				addon = '/'
				if ' ' in command:
					addon += command.split(' ', 2)[1]
				print 'sending message to localhost:'+port+addon
				response = requests.get('http://localhost:'+port+addon)
				print 'Response: %d' % response.status_code
				for header in response.headers:
					print '%s: %s' % (header, response.headers[header])
				print response.content
			except Exception as e:
				print 'error sending message:',e
		elif command == 'connect' or command == 'c':
			req = get_request()
			print 'connecting socket...'
			try:
				s.connect(('localhost', int(port)))
				send_request(s, req)
				print 'receiving request...'
				response = s.recv(4096)
				if len(response):
					response = '\\r\\n\n'.join(response.split('\r\n'))
					print 'response received:'
					i = 0
					for line in response.split('\n'):
						print '[%2d] %s' % (i, line)
						i += 1
				else:
					print 'nothing received; socket closed'
			except socket.error, err:
				print 'error communicating to server!', err
				del s
				s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		elif command == 'print' or command =='p':
			print 'socket:', s
		elif command == '':
			pass
		else:
			print 'unknown command'
	except KeyboardInterrupt:
		print '\b\bcanceling operation'

	# message = []
	# while len(message) < 2 or message[-1] != '' or message[-2] != '':
	# 	message.append(raw_input('>>'))

	# if len(message) == 3 and message[0] == 'quit':
	# 	break

	# print 'sending message:'
	# i = 0
	# for line in message:
	# 	print '[%2d] %s' % (i, line)
	# 	i += 1
