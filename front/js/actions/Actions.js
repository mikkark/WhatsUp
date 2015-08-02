var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {

  bootstrap: function () {
    AppDispatcher.dispatch({
      actionType: Constants.BOOTSTRAP
    })
  },

  create: function(newPolledItem) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE,
      newItem: newPolledItem
    });
  },

  createSystem: function(newSystem) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_SYSTEM,
      newItem: newSystem
    });
  },

  infoMessage: function(infoMessage) {
    AppDispatcher.dispatch({
      actionType: Constants.INFO,
      infoMessage: infoMessage
    });
  },

  checkNow: function() {
    AppDispatcher.dispatch({
      actionType: Constants.CHECK_NOW
    });
  },

  statusUpdate: function(statusUpdate) {
    AppDispatcher.dispatch({
      actionType: Constants.STATUS_UPDATE,
      statusUpdate: statusUpdate
    });
  },

  deletePolledItem: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_POLLEDITEM,
      id: id
    });
  },

  systemItemClicked: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.SYSTEMITEM_CLICKED,
      id: id
    });
  }
};

module.exports = Actions;
