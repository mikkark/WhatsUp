module.exports = function(io) {

  var clients = {};
  var io = io;
  var clientColl = {};

  io.on('connection', function (socket) {
    clients.add(socket);

    socket.on('disconnect', function (message) {
      clients.remove(this);
    });
  });

  clients.add = function (socket) {
    clientColl[socket.id] = socket;
  };

  clients.remove = function (socket) {
    clientColl[socket.id] = null;
  };

  clients.getAll = function () {
    return clientColl;
  };

  clients.watchingSystem = function(systemId) {
    //at this point just send to all.
    return clients;
  };

  clients.emit = function (messageId, data) {
    for (var id in clientColl) {
      if (clientColl.hasOwnProperty(id)) {
        if (clientColl[id]) {
          clientColl[id].emit(messageId, data);
        }
      }
    }
  };

  clients.broadcast = function (messageId, data) {
    io.emit(messageId, data);
  };

  return clients;

};