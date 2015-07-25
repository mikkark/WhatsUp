var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var cx = require('react/lib/cx');

var NewSystem = React.createClass({
  propTypes: {
    onSave: ReactPropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      name: ''
    };
  },

  /**
   * @return {object}
   */
  render: function () {
    var name = <input id="name" className="col-1-12" type="text" defaultValue={this.state.name} onChange={this._onChange} />;
    var saveButton = <input className="col-1-12" type="button" value="Save" onClick={this._save} />;

    return (
      <div className="col-1-1">
           {name}
           {saveButton}
      </div>
    );
  },

  _onChange: function (event) {
    this.setState({
      name: event.target.value
    });
  },

  _save: function () {
    var origNewName = this.state.name;

    this.setState({
      name: ''
    });

    this.props.onSave({name: origNewName});
  }

});

module.exports = NewSystem;