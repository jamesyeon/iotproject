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
    r = req.query;
    console.log("GET",r);

    // get deviceid
    console.log("query u",r.u);
    console.log("query t",r.type);
    type = r.type;

    console.log('got app.get(graph)');

    var qstr = "select time, t0, h0, c0, d0, d1 from sensors_new where u='"+r.u+"'";
    console.log(qstr);

    connection.query(qstr, function(err, rows, cols) {
      if (err) {
	throw err;
	res.send('query error: '+ qstr);
	return;
      }

      console.log("Got " + rows.length + "records");

      var html = "[null,null]"
      if (type == 'all') {
	file = 'graph_all.html';
      	html = "[null,null,null,null,null,null]"
      } else {
      	html = "[null,null]"
	file = 'graph.html';
      }
      for (var i=0; i<rows.length; i++) {
	ts = new Date(rows[i].time);
	year = ts.getFullYear();
	month = ts.getMonth();
	date = ts.getDate();
	hours = ts.getHours();
	minutes = ts.getMinutes();
	seconds = ts.getSeconds();
	datetime = 'new Date(' + year + ',' + month + ',' + date + ',' + hours + ',' + minutes + ',' + seconds + ')';
	switch(type) {
	   case 't':
		html += ",[" + datetime + "," + rows[i].t0 + "]";
	   break;
	   case 'h':
		html += ",[" + datetime + "," + rows[i].h0 + "]";
	   break;
	   case 'c':
		html += ",[" + datetime + "," + rows[i].c0 + "]";
	   break;
	   case 'd0':
		html += ",[" + datetime + "," + rows[i].d0 + "]";
	   break;
	   case 'd1':
		html += ",[" + datetime + "," + rows[i].d1 + "]";
	   break;
	   case 'all':
		html += ",[" + datetime + "," + rows[i].t0 + ","+ rows[i].h0 + ","+  rows[i].c0 + ","+  rows[i].d0 + ","+  rows[i].d1 + "]";
	   break;
	}
      }
      fs.readFile(file, 'utf8', function (err, data) {
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
