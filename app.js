var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

// homepage
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

// require our new route modules
var newUrl = require('./routes/new');

// all requests are dispatched to the new routers
app.use('/new', newUrl);


// listen for client connections
app.listen(app.get('port'), function() {
    console.log('Express server listening on port', app.get('port'));
});