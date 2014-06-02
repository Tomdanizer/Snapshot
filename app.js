var express = require('express'),
    db = require('./database.js');
var debug = require('debug')('snapshot');


//SSL
var https      = require("https");
var fs         = require("fs");
var key_file   = "snaps.pem";
var cert_file  = "snaps.crt";

var config     = {
  key: fs.readFileSync(key_file, 'utf8'),
 cert: fs.readFileSync(cert_file, 'utf8')
};

   







var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session')
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat'
}))
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);


//SERVERS
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
var httpsServer = https.createServer(config, app);
httpsServer.listen(8443);




module.exports = app;
