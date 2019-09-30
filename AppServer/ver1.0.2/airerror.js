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
    var sql = 'SELECT d0 FROM sensors_new WHERE u = 501005 AND minute(time) = 00 order by time desc limit 12;';
    mc.query(sql, function (error, results, fields) {
        // 센서3 오늘 데이터만 불러와서 pm10 pm25 time 데이터 출력
        if (error) throw error;
        return console.log(((results[0].d0+results[1].d0+results[2].d0+results[3].d0+results[4].d0+results[5].d0+results[6].d0+results[7].d0+results[8].d0+results[9].d0+results[10].d0+results[11].d0)
        	+(((results[0].d0+results[1].d0+results[2].d0+results[3].d0)/4)*12))/24);

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