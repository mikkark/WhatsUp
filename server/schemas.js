var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var PolledItemSchema = new Schema({
    pollingUrl: String,
    pollingInterval: Number,
    status: String,
    lastCheckedAt: Date,
    nextCheck: Date,
    _system: { type: Schema.Types.ObjectId, ref: 'System' }
  });
  mongoose.model('PolledItem', PolledItemSchema);

  var SystemSchema = new Schema({
    name: String,
    polledItems: [{type: Schema.Types.ObjectId, ref: 'PolledItem'}]
  });
  mongoose.model('System', SystemSchema);
};