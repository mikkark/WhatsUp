var nconf = require('nconf');

nconf.argv()
  .env()
  .file({ file: './config.json' });

var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');
var schemas = require('./schemas')();
var later = require('later');
var timer = null;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = require('./lib/clients')(io);

var routes = require('./api/routes')(clients);
var library = require('./lib/checking')(clients);
var auth = require('./lib/auth')().init();

auth.flow(app);

app.use(serveStatic('../front'));
app.use(routes.apiRoutes());

mongoose.connect(nconf.get('mongo').host, function (err) {
  if (err) throw err;

  console.log('mongodb connection made, starting scheduling');

  var text = 'every 1 mins';
  var schedule = later.parse.text(text);

  timer = later.setInterval(library.onSchedulerTick, schedule);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });

  timer.clear();
});

var port = process.env.PORT || 1337;

http.listen(port);