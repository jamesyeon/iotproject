var mysql = require('mysql');

// connection configurations
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
});
 
// connect to database
connection.connect();

for(var i = 0; i<24; i++){
	var sql = 'SELECT d0 FROM sensors_new WHERE u = 501005 AND minute(time) = 00 order by time desc limit 1 OFFSET '+i+';';
	connection.query(sql,function(err,res){
		console.log(res);
	});
}


connection.end();//접속끊김