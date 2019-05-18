import face_recognition as f
import cv2
import _pickle as c
import os
import MySQLdb
import datetime

now = datetime.datetime.now()
time=now.strftime('%H:%M')
now=str(now)
time=str(time)

date=datetime.date.today()
date=date.strftime('%m/%d/%Y')

db = MySQLdb.connect("localhost","root","","face_recognition")

cursor = db.cursor()


def display(loc, dpname):
	top, right, bottom, left = loc
	cv2.rectangle(frame, (left * 4, top * 4), (right * 4, bottom * 4), (0, 0, 255), 2)
	cv2.rectangle(frame, (left * 4, bottom * 4 - 35),(right * 4, bottom * 4), (0, 0, 255), cv2.FILLED)
	font = cv2.FONT_HERSHEY_DUPLEX
	cv2.putText(frame, dpname, (left * 4 + 6, bottom * 4 - 6), font, 1.0, (255, 255, 255), 1)

def convertTuple(tup): 
	str =  ''.join(tup)
	return str
	
print ("loading face database")
faces = {}
attn=0
en_id="no"
for face in os.listdir("F:/Arijit/Attendance-syatem-using-face-recognition/gui/faces/"):
	if not face.startswith("."):
		with open("F:/Arijit/Attendance-syatem-using-face-recognition/gui/faces/" + face, 'rb') as fp:
			face_info = c.load(fp)
			faces[face] = {}
			faces[face]["info"] = face_info
			faces[face]["name"] = face

cam = cv2.VideoCapture(0)
while True:
	_, frame = cam.read()
	sframe = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	sframe = sframe[:, :, ::-1]
	face_locations = f.face_locations(sframe)
	for loc in face_locations:
		dpname = "Unknown"
		face_enc = f.face_encodings(sframe, [loc])[0]
		for face in faces:
			match = f.compare_faces([faces[face]["info"]], face_enc, tolerance=0.5)
			if match[0]:
				en_id=faces[face]["name"]
				dpname = faces[face]["name"]
				sql = "SELECT name FROM details where en_id = '%s'" % (dpname)
				try:
					cursor.execute(sql)
					results = cursor.fetchall()
					dpname=results[0]
					dpname=convertTuple(dpname)
				except:
					db.rollback()
				attn=attn+1
				break
		display(loc, dpname)
	cv2.imshow('Press q to exit', frame)
	k = cv2.waitKey(10)
	if k == ord('q'):
		break
	if(attn==15):
		break
cam.release()
cv2.destroyAllWindows()
if(en_id!="no"):
	sql = "INSERT INTO attendance(att_id, en_id, name, date, time ) \
       VALUES ('%s', '%s', '%s', '%s', '%s')" % (now, en_id, dpname, date, time)
	try:
		cursor.execute(sql)
		db.commit()
		print (True)
	except:
		db.rollback()
		print(False)
else:
	print(False)
db.close()
