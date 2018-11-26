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
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
 
// 모든 값 출력 
app.get('/airdata', function (req, res) {
    mc.query('SELECT pm10, pm25, time FROM public_dust', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Air Data.' });
    });
});
 
// 오늘 데이터만 출력
app.get('/airdata/today', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT pm10, pm25, time FROM public_dust WHERE DATE(time) = CURDATE();", function (error, results, fields) {
        // 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Today Air Data.' });
    });
});

// 센서1 데이터 출력
app.get('/airdata/sensor1', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT d0, d1, time FROM sensors_new WHERE u = 501004 AND DATE(time) = CURDATE();", function (error, results, fields) {
        // 센서1 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Sensor1 Air Data.' });
    });
});

// 센서2 데이터 출력
app.get('/airdata/sensor2', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT d0, d1, time FROM sensors_new WHERE u = 501005 AND DATE(time) = CURDATE();", function (error, results, fields) {
        // 센서2 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Sensor2 Air Data.' });
    });
});

// 센서2 정각 데이터 출력
app.get('/airdata/sensor2/00', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT d0,d1, time FROM sensors_new WHERE u = 501005 AND minute(time) = 00 order by time desc;", function (error, results, fields) {
        // 센서2 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Sensor2 Air Data.' });
    });
});

// 센서3 데이터 출력
app.get('/airdata/sensor3', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT d0, d1, time FROM sensors_new WHERE u = 501007 AND DATE(time) = CURDATE();", function (error, results, fields) {
        // 센서3 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Sensor3 Air Data.' });
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