import MySQLdb
import datetime
import sys

now = datetime.datetime.now()
now=str(now)

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()

data=[]

sql = "SELECT details_id, en_id, email, name FROM details"

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