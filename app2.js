var express = require('express')
var app = express()
fs = require('fs');
mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
})

connection.connect();

app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    console.log('read file');

    var qstr = 'select t0, time from sensors_new where u=501007  ';

    connection.query(qstr, function(err, rows, cols) {
      if (err) {
	throw err;
	res.send('query error: '+ qstr);
	return;
      }

      console.log("Got " + rows.length + "records");

      var html = "[null,null]"
      for (var i=0; i<rows.length; i++) {
	var ts = new Date(rows[i].time);
	var year = ts.getFullYear();
	var month = ts.getMonth();
	var date = ts.getDate();
	var hours = ts.getHours();
	var minutes = ts.getMinutes();
	var seconds = ts.getSeconds();
	datetime = 'new Date(' + year + ',' + month + ',' + date + ',' + hours + ',' + minutes + ',' + seconds + ')';
	html += ",[" + datetime + "," + rows[i].t0 + "]";
      }
      fs.readFile('./graph.html', 'utf8', function (err, data) {
	if (err) console.log("file error"+err);

	data = data.replace("<%DATADATA%>", html);
	res.send(data);
    });
  });
})



var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
