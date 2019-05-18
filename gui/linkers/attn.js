var $ = require( 'jquery' );
var Array = require('node-array');
const {PythonShell} = require("python-shell")
var path = require("path");
require( 'datatables.net-bs4' )( $ );
var dt      = require( 'datatables.net' )();
var buttons = require( 'datatables.net-buttons' )();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

$(document).on("click", ".attn", function() {
	var msg=false;
	var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe')
  }
  var details = new PythonShell("attn.py", options);
  details.on('message', function (message) {
		msg=message;
		// console.log(msg);
});
details.end(function(err, code, message) {
	if(msg == "True"){
    swal("Attendance Given", "", "success");
	setTimeout(function() { window.location.href = 'index.html'; }, 2000);
	  }
	  else{
		swal("Please Try Again!", "Face Not Detected", "error");
	  }
});
});