var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  console.log(req.baseUrl);
  console.log(req.body);
  console.log(req.hostname);
  console.log(req.ip);
  //console.log(req.query.name);
  //console.log(req.query.money);
  console.log(req.query);
  console.log(typeof req.query); 
  console.log(typeof JSON.stringify(req.query));
  var date = new Date();
  var current_hour = date.getHours();
  fs.appendFile("LOG.TXT", JSON.stringify(req.query)+","+req.ip+","+  +"\n", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  }); 
  res.send('Hello World! nice to meet you hehehehe');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

