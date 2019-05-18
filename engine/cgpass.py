import MySQLdb
import datetime
import sys

now = datetime.datetime.now()
now=str(now)

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()

email='admin@gmail.com'

s, oldpass, password, repass = sys.argv

sql = "SELECT * FROM admin WHERE email = '%s' && password = '%s' "  % (email, oldpass)

try:
	cursor.execute(sql)
	results = cursor.fetchall()
	if results[0]:
		sql="UPDATE admin SET ad_id='%s', password='%s' WHERE email = '%s'" % (now, password, email)
		try:
			cursor.execute(sql)
			db.commit()
			print (True)
		except:
			db.rollback()
			print(False)
	else:
		print(False)
except:
	db.rollback()
	print(False)
db.close()