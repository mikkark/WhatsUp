var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');
var SystemStore = require('./SystemStore');

var CHANGE_EVENT = 'change';

var _polledItems = {};

function markAllPending() {
  for (var index in _polledItems) {
    var item = _polledItems[index];

    item.status = 'pending';
  }
}

function getPolledItemsForSystem(systemId) {
  $.ajax({
    url: '/system/' + systemId + '/polledItem'
  })
    .done(function (data) {

      _polledItems = data.reduce(function (o, v, i) {
        o[v._id] = v;
        return o;
      }, {});

      PolledItemStore.emitChange();
    });
}

var PolledItemStore = assign({}, EventEmitter.prototype, {
  init: function () {
    if (socket) {
      socket.on('check', function (statusUpdate) {
        Actions.statusUpdate(statusUpdate);
      });
    }
    else {
      console.warn('socket not defined');
    }
  },

  getAll: function () {
    return _polledItems;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case Constants.BOOTSTRAP:
      AppDispatcher.waitFor([
        SystemStore.dispatchToken
      ]);

      SystemStore.getSelectedSystemId().then(function (systemId) {
        getPolledItemsForSystem(systemId.id);
      });

      break;

    case Constants.SYSTEMITEM_CLICKED:
      getPolledItemsForSystem(action.id);

      break;

    case Constants.CHECK_NOW:
      markAllPending();

      var ids = Object.keys(_polledItems).map(function (key) {
        return _polledItems[key]._id;
      });

      $.post('/checkNow', {ids}, function (res) {
      });

      PolledItemStore.emitChange();

      break;

    case Constants.STATUS_UPDATE:
      var id = action.statusUpdate.polledItem;

      _polledItems[id].status = action.statusUpdate.status;
      _polledItems[id].lastCheckedAt = new Date();
      PolledItemStore.emitChange();

      break;

    case Constants.CREATE:
      var newItem = action.newItem;

      SystemStore.getSelectedSystemId().then(function (system) {
        newItem._system = system.id;

        $.post('/polledItem', {newItem}, function (res) {
          console.log('onnistui');

          getPolledItemsForSystem(system.id);
        });
      });

      break;

    case Constants.DELETE_POLLEDITEM:
      var id = action.id;

      $.ajax({
        url: '/polledItem/' + id,
        type: 'DELETE',
        success: function (res) {
          delete _polledItems[id];

          PolledItemStore.emitChange();
        }
      });

      break;

    default:
    // no op
  }
});

PolledItemStore.init();

module.exports = PolledItemStore;
