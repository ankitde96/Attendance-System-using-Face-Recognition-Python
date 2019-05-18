import MySQLdb
import datetime
import sys
import face_recognition as f
import cv2
import sys
import _pickle as c

now = datetime.datetime.now()
now=str(now)

face_detector = cv2.CascadeClassifier("F:/Arijit/Attendance-syatem-using-face-recognition/engine/haarcascade_frontalface_default.xml")

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()

s, enid, email, name = sys.argv

# enid="120"
# email="arijit@gmail.com"
# name="arijit"

sql = "SELECT * FROM details where en_id = '%s'" % (enid)

try:
	cursor.execute(sql)
	results = cursor.fetchall()
	rc = cursor.rowcount
except:
	db.rollback()
	print(False)

if(rc>=1):
	print("Id is Already Registered")
else:   
	sql = "INSERT INTO details(details_id, en_id, email, name ) \
       VALUES ('%s', '%s', '%s', '%s')" % (now, enid, email, name)
	try:
		cursor.execute(sql)
		db.commit()
	
	#print (True)
	except:
		db.rollback()
		print(False)
	db.close()

	cam = cv2.VideoCapture(0)
	while True:
		_, img_array = cam.read()
		faces = face_detector.detectMultiScale(img_array, 1.3, 5)
		for (x,y,w,h) in faces:
			cv2.rectangle(img_array, (x,y), (x+w,y+h), (0,255,0), 3)
			cv2.imshow("Press 'a' to add your face", img_array)
		k = cv2.waitKey(10)
		if k == ord('a'):
			face_enc = f.face_encodings(img_array)[0]
			with open("F:/Arijit/Attendance-syatem-using-face-recognition/gui/faces/" + enid, 'wb') as fp:
				c.dump(face_enc, fp)
			break
	cam.release()
	cv2.destroyAllWindows()

	print (True)