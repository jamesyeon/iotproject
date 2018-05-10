
var express =require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "sensor",
  password: "mypassword",
  database: 'data'
});
connection.connect();


app.get('/add', function (req, res) {
 r = req.query;
 
 // prepare values to insert
 arr = JSON.stringify(r.i).split(',')

 str = arr[0]
 strlen = str.length
 t0 = str.slice(3,-1)

 str = arr[1]
 strlen = str.length
 h0 = str.slice(2,strlen)

 str = arr[2]
 strlen = str.length
 c0 = str.slice(2,strlen)

 str = arr[3]
 strlen = str.length
 d0 = str.slice(2,strlen)

 str = arr[4]
 strlen = str.length
 d1 = str.slice(2,strlen-1)

 var sql = "insert into sensors_new(u, f, s, t0, h0, c0, d0, d1)  values ('"+r.u+"', '"+r.f+"', '"+r.s+"', '"+t0+"', '"+h0+"', '"+c0+"', '"+d0+"', '"+d1+"' )";
 console.log(sql)

  connection.query(sql, function(err, result) {
   if (err) throw err;
 //    console.log('done');
   });
  res.send('X-ACK');
 });

var server = app.listen(8080, function () {
 var host = server.address().address
 var port = server.address().port
 console.log("listening at http:// %s:%s",host,port)
});


