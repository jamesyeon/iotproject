const express = require('express');
const app = express();
var fs = require('fs');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;
const mysql = require('mysql');
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
});

mc.connect();

app.get('/public_chart', function (req, res){
	console.log('Hi');

	var qstr = "select time, pm10, pm25 from public_dust where date_format(time,'%i')=30 and date_format(time,'%y%m%d')>180529 limit 3000;"
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

		fs.readFile("air_chart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%DATADATA%>", html);
			res.send(data);
		});
	});
})

app.get('/sensor_chart', function (req, res){
	console.log('Hi');

	var qstr = "select time, d0, d1 from sensors_new where u=501005 and date_format(time,'%i')=30 and date_format(time,'%y%m%d')>180529 limit 3000;"
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
			pm10 = rows[i].d0;
			pm25 = rows[i].d1;
			
			html += ", ["+ i +","+ pm10 +","+ pm25 +"]";
		}

		fs.readFile("air_chart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%DATADATA%>", html);
			res.send(data);
		});
	});
})

app.get('/compare_chart', function (req, res){
	console.log('Hi');
	var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
	var sensor_val = $('#sensor_type').val();
	var qstr = "select p.time as p_time, s.time as s_time, p.pm10 as p_pm10, s.d0 as s_pm10, s.u from public_dust as p join sensors_new as s on p.c_num=s.c_num and s.u="+sensor_val+";"
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

		fs.readFile("air_chart.html", 'utf8', function(err, data){
			if(err) console.log("file error"+err);

			data = data.replace("<%DATADATA%>", html);
			res.send(data);
		});
	});
})

app.listen(80,function(){
	console.log('Example app listening on port 80!')
})