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
	var chk=[];
	var show = []; 
	var r = 0; 
var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
  }
  var details = new PythonShell("details.py", options);
  details.on('message', function (message) {
	  chk.push(message);
	  //console.log(chk);
});

details.end(function(err, code, message) {
	//console.log(chk);
	var rows = chk[0];
var cols = 7;
  for( var i=r; i<rows; i++ ) {
  show.push( [] );
}
	k=1;
	l=1;
	for (var i = 0; i < rows; i++)
{
    for (var j =  show[i].length; j < cols; j++)
    {
		if(k%4==1){
			// console.log(k);
			show[i].push(l);
			j++;
			l++;
		}
        show[i].push(chk[k]);
		//console.log(j);
		if(j%4==0){
			show[i].push("<a style='color:white'><button class='btn btn-success details' data-id='"+chk[k-2]+"' type='button'>Details</button></a>");
			show[i].push("<a style='color:white'><button class='btn btn-danger delete' data-id='"+chk[k-2]+"' type='button'>Delete</button></a>");
			j++;
			j++;
		}
		k++;
    }
}
//console.log(show);
	$('#details').DataTable({
		responsive: true,
		data: show
	});
  });
//data=["ari", "jit", "dhar"];
//data.push("04");
//console.log(data);
//data.forEach(function(data){console.log(data)});
$(document).on("click", ".delete", function() {
	var id = $(this).data('id');
	//console.log(id);
	var msg=false;
	var options = {
    scriptPath : path.join('F:/Arijit/Attendance-syatem-using-face-recognition/engine/'),
    pythonPath : ('C:/Users/ANKIT DE/AppData/Local/Programs/Python/Python36/python.exe'),
	args : [id]
  }
  var details = new PythonShell("delete.py", options);
  details.on('message', function (message) {
	  msg=message;
});
details.end(function(err, code, message) {
	if(msg == "True"){
    swal("Details Deleted Succesfully", "", "success");
	setTimeout(function() { window.location.href = 'allrecords.html'; }, 50);
	  }
	  else{
		swal("Please Try Again!", "Some error occurred", "error");
	  }
});
});
$(document).on("click", ".details", function() {
	var id = $(this).data('id');
	//console.log(id);
	var qid = "?id=" + id;
	window.location.href = "details.html" + qid;
});
} );

