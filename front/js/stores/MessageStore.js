var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');
var messages = [];

var CHANGE_EVENT = 'change';

var cleanerTimer;

var cleanerFn = function () {
  var now = new Date();
  var removedCount = 0;

  for (var index in messages.reverse()) {
    var message = messages[index];

    if (message.createdAt < now - message.clearTimeout) {
      messages.splice(index, 1);
      removedCount++;
    }
  }

  if (removedCount > 0) {
    MessageStore.emitChange();
  }
};

var MessageStore = assign({}, EventEmitter.prototype, {

  init: function () {
    //set timer that periodically cleans the messages list.
    cleanerTimer = setInterval(cleanerFn, 1000);

    if (socket) {
      socket.on('info', function (infoMessage) {
        Actions.infoMessage({message: infoMessage});
      });
    }
    else {
      console.warn('socket not defined');
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAll: function () {
    return messages;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.INFO:
      action.infoMessage.clearTimeout = 5000;
      action.infoMessage.createdAt = new Date();

      messages.push(action.infoMessage);
      MessageStore.emitChange();
  }

});

MessageStore.init();

module.exports = MessageStore;