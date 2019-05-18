import face_recognition as f
import cv2
import _pickle as c
import os
import MySQLdb
import datetime

faces = {}
attn=0
en_id="no"
for face in os.listdir("F:/Arijit/Attendance-syatem-using-face-recognition/gui/faces/"):
    if not face.startswith("."):
        with open("F:/Arijit/Attendance-syatem-using-face-recognition/gui/faces/" + face, 'rb') as fp:
            face_info = c.load(fp)
            print(face_info)
            print("end")
            faces[face] = {}
            faces[face]["info"] = face_info
            faces[face]["name"] = face