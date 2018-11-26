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

// 센서1 최근 12시간 데이터 출력
app.get('/airdata/sensor2_recent12', function (req, res) {
    let keyword = req.params.keyword;
    var sql = "SELECT d0, d1, date_format(time, '%H') FROM sensors_new WHERE u = 501005 AND minute(time) = 00 order by time desc limit 12;";
    mc.query(sql, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});

        var eventArray = ""; //Json Array를 String으로 저장하기 위한 변수 선언
        try {
        eventArray = loadHtml(); //loadHtml()는 Json Array를 파싱해서 String으로 가져오는 함수라 가정
    	} catch (ex) {
    	console.log(ex);
    	}
    	console.log("결과물 : " + eventArray);
		try {
		var JSONArray = new Array(eventArray); //JSONArray형식으로 파싱하기 위해 새로 선언해주며 eventArray를 집어 넣어준다.
    	list_cnt = JSONArray.length(); //Json 배열 내 JSON 데이터 개수를 가져옴
 
    //key의 value를 가져와 저장하기 위한 배열을 생성한다
    var getd0 = new Array(list_cnt);

    for (var i = 0; i < list_cnt; i++) { //JSONArray 내 json 개수만큼 for문 동작
 
        var JSONObject = Array.getJSONObject(i); //i번째 Json데이터를 가져옴
        getd0[i] = jsonObject.getString("d0");
        console.log("JSON Object", jsonObject + "");
        console.log("JsonParsing", getd0);
    }
} catch (ex) {
    	console.log(ex);
    	}

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