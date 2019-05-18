import MySQLdb
import datetime
import sys

now = datetime.datetime.now()
now=str(now)

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()

s, enid = sys.argv

sql = "DELETE FROM details WHERE en_id = '%s'" % (enid)
	   
try:
	cursor.execute(sql)
	db.commit()
	sql = "DELETE FROM attendance WHERE en_id = '%s'" % (enid)
	try:
		cursor.execute(sql)
		db.commit()
		print (True)
	except:
		db.rollback()
		print(False)
except:
	db.rollback()
	print(False)
db.close()