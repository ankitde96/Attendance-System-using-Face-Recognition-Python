function request(e){
  e.preventDefault();
  const {PythonShell} = require("python-shell")
  var path = require("path");
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var chk= false;
  if(email.length ==0 || pass.length==0){
	  event.stopPropagation();
  }
  //console.log(email,pass);
else{
    var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
    args : [email,pass]
  }
//console.log(options);
  var login = new PythonShell("login.py", options);
  //console.log(login);
  
  login.on('message', function (message) {
	  chk=message;
  //console.log(message);
});

  login.end(function(err, code, message) {
	  if(chk == "True"){
    swal("Login Succesfull", "You are logged in as Admin", "success");
	setTimeout(function() { window.location.href = 'adminview.html'; }, 2000);
	  }
	  else{
		swal("Incorrect Email or Password!", "Check your Email id or Password", "error");
	  }
  })
}
}