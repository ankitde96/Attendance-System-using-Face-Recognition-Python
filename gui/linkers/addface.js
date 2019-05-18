function addfacerequest(e){
  e.preventDefault();
  const {PythonShell} = require("python-shell")
  var path = require("path");
  var enid = document.getElementById("enid").value;
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var chk= false;
  if(email.length ==0 || name.length ==0 || enid.length==0){
	  event.stopPropagation();
  }
  //console.log(enid,email,name);
else{
	var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
    args : [enid,email,name]
  }
//console.log(options);
  var login = new PythonShell("addface.py", options);
  //console.log(login);
  
  login.on('message', function (message) {
	  chk=message;
  //console.log(message);
});

  login.end(function(err, code, message) {
	  if(chk == "True"){
    swal("Face added Succesfully", "Now we can recognize your face", "success");
	setTimeout(function() { window.location.href = 'adminview.html'; }, 2000);
	  }
	  if(chk=="False"){
		  swal("Please Try Again!", "Some error occurred", "error");
	  }
	  else{
		swal(chk, "Please Enter a Unique Id", "error");
	  }
  });
}
}