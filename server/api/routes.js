var apiRouter = require('express').Router();

module.exports = function(clients) {

  var library = require('../lib/checking')(clients);

  var routerObj = {};

  routerObj.apiRoutes = function (options) {
    var polledItem = require('./polledItem')();
    var system = require('./system')();

    apiRouter.get('/system/:systemId/polledItem', function (req, res, next) {
      polledItem.loadBySystemId(req, res, next);
    });

    apiRouter.get('/system', function (req, res, next) {
      system.load(req, res, next);
    });

    apiRouter.post('/system', function (req, res, next) {
      system.insert(req, res, next);
    });

    apiRouter.post('/polledItem', function (req, res, next) {
      polledItem.insert(req, res, next);
    });

    apiRouter.delete('/polledItem/:id', function (req, res, next) {
      polledItem.delete(req, res, next);
    });

    apiRouter.post('/checkNow', function (req, res, next) {
      var polledItemIds = req.body.ids;

      library.checkPolledItems(polledItemIds);

      res.end(JSON.stringify({message: 'POST to check now'}));
    });

    return apiRouter;
  };

  return routerObj;
};