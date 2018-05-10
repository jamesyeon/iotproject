
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
 console.log("GET",r);
 
 // prepare values to insert
 console.log("query u",r.u);
 console.log("query f",r.f);
 console.log("query s",r.s);
 console.log("query i",r.i);
 console.log(JSON.stringify(r.i).split(','))
 arr = JSON.stringify(r.i).split(',')

 str = arr[0]
 strlen = str.length
 console.log(str.slice(1,3))
 t0 = str.slice(3,-1)
 console.log(t0)

 str = arr[1]
 strlen = str.length
 console.log(str.slice(0,2))
 h0 = str.slice(2,strlen)
 console.log(h0)

 str = arr[2]
 strlen = str.length
 console.log(str.slice(0,2))
 c0 = str.slice(2,strlen)
 console.log(c0)

 str = arr[3]
 strlen = str.length
 console.log(str.slice(0,2))
 d0 = str.slice(2,strlen)
 console.log(d0)

 str = arr[4]
 strlen = str.length
 console.log(str.slice(0,2))
 d1 = str.slice(2,strlen-1)
 console.log(d1)

 //var query = connection.query('insert into sensors set ?', r, function(err, rows, cols) {
 var sql = "insert into sensors_new(u, f, s, t0, h0, c0, d0, d1)  values ('"+r.u+"', '"+r.f+"', '"+r.s+"', '"+t0+"', '"+h0+"', '"+c0+"', '"+d0+"', '"+d1+"' )";
// var sql = "insert into sensors_new(u, f, s, t0, h0, c0, d0, d1)  values (511004, 3, 1, 25, 25, 25, 25, 25 )";
 console.log(sql)

  connection.query(sql, function(err, result) {
   if (err) throw err;
     console.log('done');
   });
  res.send('X-ACK');
 });

var server = app.listen(8080, function () {
 var host = server.address().address
 var port = server.address().port
 console.log("listening at http:// %s:%s",host,port)
});


