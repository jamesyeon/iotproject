const express = require('express');
const app = express();
var fs = require('fs');
const mysql = require('mysql');
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
});

mc.connect();

app.get('/controlchart', function (req, res){
	console.log('Hi');

	var qstr = "SELECT * FROM public_dust limit 4000;"
	mc.query(qstr, function(err, rows, cols){
		if(err){
			throw err;
			res.send('query error: '+qstr);
			return;
		}

		console.log("Got "+rows.length+" records");
		var html = "['Time', 'PM10', 'PM25']";
		for(var i=0; i<rows.length; i++){
			var pm10 = "null";
			var pm25 = "null";
			pm10 = rows[i].pm10;
			pm25 = rows[i].pm25;
			
			html += ", ["+ i +","+ pm10 +","+ pm25 +"]";
		}

		fs.readFile("air_controlchart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%PUBLICDATA%>", html);
			res.send(data);
		});
	});
})

app.listen(80,function(){
	console.log('Example app listening on port 80!')
})