var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constants = require('./lib/constants')();

module.exports = function() {
  //var InterfaceItemLinkingSchema = new Schema({
  //  caller: {type: Schema.Types.ObjectId, ref: 'PolledItem'},
  //  callee: {type: Schema.Types.ObjectId, ref: 'PolledItem'}
  //});
  //mongoose.model('InterfaceItemLinking', InterfaceItemLinkingSchema);

  var PolledItemSchema = new Schema({
    pollingUrl: String,
    pollingInterval: Number,
    status: String,
    lastCheckedAt: Date,
    nextCheck: Date,
    itemType: { type: String, enum: constants.POLLINGITEMTYPES },
    caller: {type: Schema.Types.ObjectId, ref: 'PolledItem'},
    callee: {type: Schema.Types.ObjectId, ref: 'PolledItem'},
    _system: { type: Schema.Types.ObjectId, ref: 'System' }
  });
  mongoose.model('PolledItem', PolledItemSchema);

  var SystemSchema = new Schema({
    name: String,
    polledItems: [{type: Schema.Types.ObjectId, ref: 'PolledItem'}]
  });
  mongoose.model('System', SystemSchema);
};