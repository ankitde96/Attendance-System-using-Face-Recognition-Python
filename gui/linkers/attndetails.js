var $ = require( 'jquery' );
var Array = require('node-array');
const {PythonShell} = require("python-shell")
var path = require("path");
require( 'datatables.net-bs4' )( $ );
var dt      = require( 'datatables.net' )();
var buttons = require( 'datatables.net-buttons' )();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

$(document).ready(function() {
	var qstr = decodeURIComponent(window.location.search);
qstr = qstr.substring(1);
var qstr = qstr.split("=");
//console.log(qstr[1]);

var chk=[];
	var show = []; 
	var r = 0; 
var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
	args : [qstr[1]]
  }
  var details = new PythonShell("attndetails.py", options);
  details.on('message', function (message) {
	  chk.push(message);
	  //console.log(chk);
});

details.end(function(err, code, message) {
	//console.log(chk);
	var rows = chk[0];
var cols = 5;
  for( var i=r; i<rows; i++ ) {
  show.push( [] );
}
	k=1;
	for (var i = 0; i < rows; i++)
{
    for (var j =  show[i].length; j < cols; j++)
    {
		if(k%4==1){
			show[i].push(k);
			j++;
		}
        show[i].push(chk[k]);
		//console.log(j);
		k++;
    }
}
//console.log(show);
	$('#details').DataTable({
		responsive: true,
		data: show
	});
  });
  
});