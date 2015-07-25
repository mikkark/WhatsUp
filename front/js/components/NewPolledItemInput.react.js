var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var cx = require('react/lib/cx');

var PolledItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    onSave: ReactPropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      url: '',
      interval: ''
    };
  },

  /**
   * @return {object}
   */
  render: function () {
    var polledUrlInput = <input id="url" className="col-5-12" type="text" valueLink={this.linkState('url')} />;
    var pollingInterval = <input id="interval" className="col-1-12" type="text" valueLink={this.linkState('interval')} />;
    var saveButton = <input className="col-1-12" type="button" value="Save" onClick={this._save} />;

    return (
      <div className="col-1-1">
           {polledUrlInput}
           {pollingInterval}
           {saveButton}
      </div>
    );
  },

  _save: function () {
    this.props.onSave({pollingUrl: this.state.url, pollingInterval: this.state.interval});
    this.replaceState({
      url: '',
      interval: ''
    });
  }

});

module.exports = PolledItem;
