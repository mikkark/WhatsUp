var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var PolledItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    machineItems: ReactPropTypes.array.isRequired
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
    var typeM = <input id="typeM" className="col-1-12" type="radio" name="type" value="machine" defaultChecked="true" onChange={this._typeChanged} />;
    var typeI = <input id="typeI" className="col-1-12" type="radio" name="type" value="interface" onChange={this._typeChanged}/>;
    var saveButton = <input className="col-1-12" type="button" value="Save" onClick={this._save} />;

    var machineItemOptions = [];

    for (var i = 0; i < this.props.machineItems.length; i++)
    {
      var item = this.props.machineItems[i];

      machineItemOptions.push(<option value={item._id}>{item.pollingUrl}</option>);
    }

    return (
      <div className="col-1-1">
           {polledUrlInput}
           {pollingInterval}
        <div className="col-1-1">choose type</div>
         {typeM}
          {typeI}
        <select id="caller" onChange={this._callerChange}>
        {machineItemOptions}
        </select>
        <select id="callee" onChange={this._calleeChange}>
        {machineItemOptions}
        </select>
           {saveButton}
      </div>
    );
  },

  _typeChanged: function (event) {
    var elem = event.target;
    var isChecked = event.target.checked;

    if (elem.id === "typeM" && isChecked) {
      this.setState({
        itemType: 'machine'
      });
    } else if (elem.id=== "typeI" && isChecked) {
      this.setState({
        itemType: 'interface'
      });
    }
  },

  _callerChange: function (event) {
    this.setState({
      caller: event.target.value
    })
  },

  _calleeChange: function (event) {
    this.setState({
      callee: event.target.value
    })
  },

  _save: function () {
    this.props.onSave({pollingUrl: this.state.url, pollingInterval: this.state.interval,
      itemType: this.state.itemType, caller: this.state.caller, callee: this.state.callee});
    this.replaceState({
      url: '',
      interval: '',
      itemType: 'machine',
      caller: null,
      callee: null
    });
  }

});

module.exports = PolledItem;
