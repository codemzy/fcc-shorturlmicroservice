var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// force use of nodes native query parser module querystring
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});


app.get('/new/:url', function(request, response){
    var url = request.params.url;
    if (url.match(/[\s]/i) || !(url.match(/[\.]/g))) {
        response.status(404).json({ error: "URL invalid"});
    }
    else { 
        if (!(url.match(/(http:\/\/)/i)) || !(url.match(/(https:\/\/)/i))) {
            url = "http://" + url;
        }
        response.json({ original_url: url });
    }
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});