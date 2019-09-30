const express = require('express');
const app = express();
var fs = require('fs');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
var doc = root.document || document;
const mysql = require('mysql');
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
});

mc.connect();
app.use(express.bodyParser());

app.get('/swurent_info', function (req, res){
	console.log('Hi');
	var qstr = "select p.time as p_time, s.time as s_time, p.pm10 as p_pm10, s.d0 as s_pm10, s.u from public_dust as p join sensors_new as s on p.c_num=s.c_num and s.u=501005 order by p_time desc limit 24;"
	mc.query(qstr, function(err, rows, cols){
		if(err){
			throw err;
			res.send('query error: '+qstr);
			return;
		}

		console.log("Got "+rows.length+" records");
		var html = "['Time', 'public_pm10', 'sensor_pm10']";
		for(var i=0; i<rows.length; i++){
			var ts = new Date(rows[i].p_time);
			var year = ts.getFullYear();
			var month = ts.getMonth();
			var date = ts.getDate();
			var hours = ts.getHours();
			var minutes = ts.getMinutes();
			var seconds = ts.getSeconds();
			var datetime = 'new Date(' + year + ',' + month + ',' + date + ',' + hours + ',' + minutes + ',' + seconds + ')';
			var public_pm10 = "null";
			var sensor_pm10 = "null";
			public_pm10 = rows[i].p_pm10;
			sensor_pm10 = rows[i].s_pm10;
			
			html += ", ["+ datetime +","+ public_pm10 +","+ sensor_pm10 +"]";
		}

		fs.readFile("swurent_chart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%SWURENTDATA%>", html);
			res.send(data);
		});
	});
})

app.get('/swurent_compare', function (req, res){
	console.log('Hi');
	var qstr = "select F.time as sen1_time, T.time as sen2_time, F.d0 as sen1_pm10, T.d0 as sen2_pm10, F.u, T.u from sensors_new F, sensors_new T where minute(F.time)=00 and F.c_num = T.c_num and F.u=501004 and T.u=501005 order by F.time desc limit 24;"
	mc.query(qstr, function(err, rows, cols){
		if(err){
			throw err;
			res.send('query error: '+qstr);
			return;
		}

		console.log("Got "+rows.length+" records");
		var html = "['Time', 'sen1_pm10', 'sen2_pm10']";
		for(var i=0; i<rows.length; i++){
			var ts = new Date(rows[i].sen1_time);
			var year = ts.getFullYear();
			var month = ts.getMonth();
			var date = ts.getDate();
			var hours = ts.getHours();
			var minutes = ts.getMinutes();
			var seconds = ts.getSeconds();
			var datetime = 'new Date(' + year + ',' + month + ',' + date + ',' + hours + ',' + minutes + ',' + seconds + ')';
			var public_pm10 = "null";
			var sensor_pm10 = "null";
			sen1_pm10 = rows[i].sen1_pm10;
			sen2_pm10 = rows[i].sen2_pm10;
			
			html += ", ["+ datetime +","+ sen1_pm10 +","+ sen2_pm10 +"]";
		}

		fs.readFile("swurent_chart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%SWURENTDATA%>", html);
			res.send(data);
		});
	});
})

app.listen(80,function(){
	console.log('Example app listening on port 80!')
})