"use strict";

var express = require('express');
var morgan = require('morgan');
var path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/study', async function (req, res) {
	res.status = 200;
	res.send("hello");
});


/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Speech Detection' });
  });
  

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


//process.env.PORT || 8000
var listener = app.listen(8000, async function () {
	console.log('Server is listening on port ' + listener.address().port);
	console.log('http://localhost:' + listener.address().port + "/");

});