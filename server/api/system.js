var mongoose = require('mongoose');
var System = mongoose.model('System');

module.exports = function() {

	var system = {};

	system.load = function(req, res, next) {
		System.find(function (err, results) {
			if (err) throw err;
				res.json(results);
		    res.end();
    });
	};

  //polledItem.update = function (id, props) {
  //  var newModel = mongoose.model('PolledItem');
  //
  //  newModel.update({_id: id}, props, {}, function (err, response) {
  //    if (err) throw err;
  //
  //    console.log('updated');
  //  });
  //};
  //
  system.insert = function (req, res, next) {

    var reqItem = req.body.newItem;

    var newSystem = new System({
      name: reqItem.name
    });

    newSystem.save(function (err, system, numberAffected) {
      if (err) throw err;

      console.log('saved new system');

      res.end();
    });

  };

	return system;
};