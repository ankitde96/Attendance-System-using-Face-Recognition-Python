function cgpassrequest(e){
  e.preventDefault();
  const {PythonShell} = require("python-shell")
  var path = require("path");
  var oldpass = document.getElementById("oldpass").value;
  var newpass = document.getElementById("newpass").value;
  var repass = document.getElementById("repass").value;
  var chk= false;
  if(newpass.length ==0 || repass.length ==0 || oldpass.length==0){
	  event.stopPropagation();
  }
  //console.log(oldpass,newpass,repass);
else{
	if(newpass==repass)
	{
	    var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
    args : [oldpass,newpass,repass]
  }
//console.log(options);
  var cgpass = new PythonShell("cgpass.py", options);
  
  cgpass.on('message', function (message) {
	  chk=message;
  console.log(message);
});

  cgpass.end(function(err, code, message) {
	  if(chk == "True"){
    swal("Passsword Changed Succesfully", "", "success");
	setTimeout(function() { window.location.href = 'adminview.html'; }, 2000);
	  }
	  else{
		swal("Please Try Again!", "Current password does not match.", "error");
	  }
  })
}
else{
	event.stopPropagation();
	setTimeout(function() { swal("New Passsword Does not matched with Re-enter Password!", "Re-enter Your Passsword", "error");	}, 2000);
}
}
}