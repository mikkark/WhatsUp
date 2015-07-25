var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {

  bootstrap: function () {
    AppDispatcher.dispatch({
      actionType: Constants.BOOTSTRAP
    })
  },

  /**
   * @param  {string} text
   */
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

  //
  ///**
  // * @param  {string} id The ID of the ToDo item
  // * @param  {string} text
  // */
  //updateText: function(id, text) {
  //  AppDispatcher.dispatch({
  //    actionType: TodoConstants.TODO_UPDATE_TEXT,
  //    id: id,
  //    text: text
  //  });
  //},
  //
  ///**
  // * Toggle whether a single ToDo is complete
  // * @param  {object} todo
  // */
  //toggleComplete: function(todo) {
  //  var id = todo.id;
  //  var actionType = todo.complete ?
  //      TodoConstants.TODO_UNDO_COMPLETE :
  //      TodoConstants.TODO_COMPLETE;
  //
  //  AppDispatcher.dispatch({
  //    actionType: actionType,
  //    id: id
  //  });
  //},
  //
  ///**
  // * Mark all ToDos as complete
  // */
  //toggleCompleteAll: function() {
  //  AppDispatcher.dispatch({
  //    actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
  //  });
  //},
  //
  ///**
  // * @param  {string} id
  // */
  //destroy: function(id) {
  //  AppDispatcher.dispatch({
  //    actionType: TodoConstants.TODO_DESTROY,
  //    id: id
  //  });
  //},
  //
  ///**
  // * Delete all the completed ToDos
  // */
  //destroyCompleted: function() {
  //  AppDispatcher.dispatch({
  //    actionType: TodoConstants.TODO_DESTROY_COMPLETED
  //  });
  //}

};

module.exports = Actions;
