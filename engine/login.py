import MySQLdb
import datetime
import sys

now = datetime.datetime.now()
now=str(now)

db = MySQLdb.connect("localhost","root","","face_recognition" )

cursor = db.cursor()

#email='admin@gmail.com'
#password='12'

s, email, password = sys.argv

sql = "SELECT * FROM admin WHERE email = '%s' && password = '%s' "  % (email,password)

try:
	cursor.execute(sql)
	results = cursor.fetchall()
	if results[0]:
		for row in results:
			print (True)
	else:
		print(False)
except:
	db.rollback()
	print(False)
db.close()