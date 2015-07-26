var polledItem = require('../api/polledItem')();
var request = require('request');

module.exports = function (clients) {

  var stuff = {};

  stuff.onSchedulerTick = function () {
    polledItem.loadForCheck().then(function (res) {
      res.forEach(function (item) {
        console.log('found ' + item.pollingUrl);

        if (item.status === 'ok') {
          polledItem.update(item._id, {status: 'pending'});
        }

        stuff.checkPolledItems([item._id]);
      });
    });
  };

  stuff.checkPolledItems = function (polledItemIds) {
    clients.broadcast('info', 'checking status.');

    for (var index in polledItemIds) {
      polledItem.loadById(polledItemIds[index]).then(function (item) {
        helper(item);
      });
    }
  };

  var helper = function (polledItemObj) {
    request(polledItemObj.pollingUrl, function (error, response, body) {
      var status;
      if (!error && response.statusCode == 200) {
        status = 'ok';
      }
      else {
        status = 'error';
      }

      clients.watchingSystem(polledItemObj._system).emit('check', {polledItem: polledItemObj._id, status: status});

      var now = new Date();
      var nextCheck = new Date(now.getTime() + polledItemObj.pollingInterval * 60000);

      polledItem.update(polledItemObj._id, {status: status, lastCheckedAt: new Date(), nextCheck: nextCheck});
    });
  };

  return stuff;
};



