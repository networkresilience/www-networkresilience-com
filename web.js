var express = require('express');
var fs = require('fs');

var app = express();

app.use("/css", express.static(__dirname + '/css'));
app.use("/font-awesome", express.static(__dirname + '/font-awesome'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/less", express.static(__dirname + '/less'));
app.use("/overlays", express.static(__dirname + '/overlays'));

app.get('/', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/favicon.ico', function(request, response) { var htmlBuffer = fs.readFileSync('favicon.ico', 'utf-8'); response.send(htmlBuffer); });

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
