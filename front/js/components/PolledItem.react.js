var React = require('react');
var ReactPropTypes = React.PropTypes;

var PolledItem = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    onDelete: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;

    var polledUrlInput = <input className="col-5-12" type="text" value={item.pollingUrl} />;
    var statusLabel = <p className="col-1-12">{item.status}</p>;

    if (item.lastCheckedAt) {
      var asDate = new Date(item.lastCheckedAt);
      var lastCheck = <p className="col-2-12">{asDate.toLocaleDateString('fi-FI') + ' ' +
      asDate.toLocaleTimeString('fi-FI')}</p>;
    }

    var pollingInterval = <p className="col-1-12">{item.pollingInterval}s</p>;
    var deleteLink = <a href="" onClick={ this._delete }>x</a>;

    return (
      <li className="col-1-1"
        key={item._id}>
        {polledUrlInput}
        {statusLabel}
        {lastCheck}
        {pollingInterval}
        {deleteLink}
      </li>
    );
  },

  _delete: function (event) {
    event.preventDefault();

    this.props.onDelete(this.props.item._id);
  }

});

module.exports = PolledItem;
