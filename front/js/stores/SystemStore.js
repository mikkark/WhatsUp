var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');
var Q = require('q');

var CHANGE_EVENT = 'change';

var _systems = {};
var _selectedSystemIdDeferred = Q.defer();
var _selectedSystemIdPromise = _selectedSystemIdDeferred.promise;

var reload = function () {
  $.ajax({
    url: '/system'
  })
    .done(function (data) {

      _systems = data.reduce(function (o, v, i) {
        o[v._id] = v;
        return o;
      }, {});

      var selectedSystemId = Object.keys(_systems).length > 0 ? Object.keys(_systems)[0] : null;

      _selectedSystemIdDeferred.resolve({id: selectedSystemId});

      SystemStore.emitChange();
    });
};

var SystemStore = assign({}, EventEmitter.prototype, {
  getInitial: function () {
    reload();
  },

  getAll: function () {
    return _systems;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getSelectedSystemId: function () {
      return Q.when(_selectedSystemIdPromise);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

SystemStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case Constants.CHECK_NOW:

      SystemStore.getSelectedSystemId().then(function (val) {
        _systems[val.id].status = 'pending';

        SystemStore.emitChange();
      });

      break;

    case Constants.STATUS_UPDATE:

      var status = action.statusUpdate.status;

      if (status !== 'ok') {
        //we only receive updates for the currently selected system, so we know that one has errors.
        SystemStore.getSelectedSystemId().then(system => {
          _systems[system.id].status = 'error';

          SystemStore.emitChange();
        });
      }

      break;

    case Constants.CREATE_SYSTEM:
      var newItem = action.newItem;

      _systems['xyz' + newItem.name] = {name: newItem.name};

      $.post('/system', {newItem}, function (data) {
        console.log('onnistui');
      }).done(function (res) {
        SystemStore.emitChange();
      });

      break;

    case Constants.SYSTEMITEM_CLICKED:
      _selectedSystemIdPromise = Q.fcall(function () {
        return {id: action.id };
      });

      SystemStore.emitChange();

      break;

    case Constants.BOOTSTRAP:
      SystemStore.getInitial();

      break;

    default:
    // no op
  }
});

module.exports = SystemStore;