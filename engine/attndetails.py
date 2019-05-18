import MySQLdb
import datetime
import sys

now = datetime.datetime.now()
now=str(now)

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()

data=[]

s, enid = sys.argv

sql = "SELECT en_id, name, date, time FROM attendance where en_id = '%s'" % (enid)

try:
	cursor.execute(sql)
	results = cursor.fetchall()
	rc = cursor.rowcount
	print(rc)
	for row in results:
		for i in row:
			print(i)
		tdata=[]
		tdata.append(row[0])
		tdata.append(row[1])
		tdata.append(row[2])
		tdata.append(row[3])
		data.append(tdata)
except:
	db.rollback()
	print(False)
db.close()
#print(data)