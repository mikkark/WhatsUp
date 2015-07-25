var fs    = require('fs'),
  nconf = require('nconf');

nconf.argv()
  .env()
  .file({ file: './config.json' });

nconf.set('mongo:host', '');

nconf.set('auth:openid:tokenuri', '');
nconf.set('auth:openid:authuri', '');
nconf.set('auth:openid:callbackuri', '');

//openid secret should come as env var/command line var

//
// Save the configuration object to disk
//
nconf.save(function (err) {
  fs.readFile('./config.json', function (err, data) {
    console.dir(JSON.parse(data.toString()))
  });
});