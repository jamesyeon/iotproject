const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
});
 
// connect to database
mc.connect();

// 센서2 데이터 1시간 평균 데이터 출력
app.get('/airdata/24/sensor2', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT d0,d1,time FROM sensors_new WHERE u = 501005 AND minute(time) = 00 order by time desc limit 24;", function (error, results, fields) {
        // 센서3 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send(results);
    });
});

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(80, function () {
    console.log('Node app is running on port 80');
});
 
// allows "grunt dev" to create a development server with livereload
module.exports = app;