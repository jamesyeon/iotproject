const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
 
// 모든 값 출력 
app.get('/airdata', function (req, res) {
    try {
    var xml2js = require('xml2js');
    var request = require('request');

    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?sidoName=%EC%84%9C%EC%9A%B8&searchCondition=DAILY&pageNo=1&numOfRows=10&ServiceKey=LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D'; 
    var parser = new xml2js.Parser();
    request(url, function(error, response, body) {
        parser.parseString(body, function(err,result){

            console.log(result);
        });
    });
} catch (ex) {console.log(ex)}
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