const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var xml2js = require('xml2js');
var request = require('request');

app.get('/airdata/24', function (req, res) {
    try {
    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=RWADbF8UAZUScOA20fIS6zboE8O84njtpyzdkEN9Zg4kzfLLbVnXNQH1jcoUM0TttI4ToVrrcKa8wiqY0bSHaw%3D%3D&numOfRows=1&pageSize=1&pageNo=1&startPage=1&stationName=%ED%99%94%EB%9E%91%EB%A1%9C&dataTerm=DAILY&ver=1.3'; 
    var parser = new xml2js.Parser();
    request(url, function(error, response, body) {
        parser.parseString(body, function(err,result){
            

            return res.send(result);
        });
    });
} catch (ex) {console.log(ex)}
});
app.listen(80, function () {
    console.log('Node app is running on port 80');
});
module.exports = app;