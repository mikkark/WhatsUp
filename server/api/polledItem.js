var mongoose = require('mongoose');
var PolledItem = mongoose.model('PolledItem');
var constants = require('../lib/constants')();

module.exports = function() {

	var polledItem = {};

	polledItem.loadBySystemId = function(req, res, next) {
    var systemId = req.params.systemId;

    console.log('-'+systemId+'-');
    if (systemId !== null && systemId !== 'null') {
      PolledItem.find({ _system: systemId }, function (err, results) {
        if (err) throw err;
        res.json(results);
        res.end();
      });
    }
    else {
      res.end();
    }
	};

  polledItem.loadForCheck = function () {
    var newModel = mongoose.model('PolledItem');

    var now = new Date();

    return newModel.find({ nextCheck: { $lt: now }, status: 'ok' });
  };

  polledItem.loadById = function(id) {
    return PolledItem.findById(id);
  };

  polledItem.update = function (id, props) {
    var newModel = mongoose.model('PolledItem');

    newModel.update({_id: id}, props, {}, function (err, response) {
      if (err) throw err;

      console.log('updated');
    });
  };

  polledItem.delete = function (req, res, next) {
    var id = req.params.id;

    var newModel = mongoose.model('PolledItem');

    newModel.remove({_id: id}, function (err) {
      if (err) throw err;

      console.log('deleted');

      res.end();
    });
  };

  polledItem.insert = function (req, res, next) {

    var reqItem = req.body.newItem;

    var newPolledItem = new PolledItem({
      pollingUrl: reqItem.pollingUrl,
      pollingInterval: reqItem.pollingInterval,
      status: 'ok',
      lastCheckedAt: null,
      itemType: reqItem.itemType,
      _system: reqItem._system
    });

    if (reqItem.itemType === constants.POLLINGITEMTYPES[1]) {
      newPolledItem.caller = reqItem.caller;
      newPolledItem.callee = reqItem.callee;
    }

    newPolledItem.save(function (err, polledItem, numberAffected) {
      if (err) throw err;

      console.log('saved new polled item');

      res.end();
    });

  };

	return polledItem;
};