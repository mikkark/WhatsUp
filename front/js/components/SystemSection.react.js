var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var SystemStore = require('../stores/SystemStore');
var NewSystemInput = require('./NewSystemInput.react');
var SystemItem = require('./System.react');

var SystemSection = React.createClass({

  componentDidMount: function () {
    SystemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SystemStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {

    var allItems;
    var selectedSystemID;
    var items = [];

    if (this.state) {
      allItems = this.state.items;
      selectedSystemID = this.state.selectedSystemId;
    }

    if (allItems && Object.keys(allItems).length > 0) {
      for (var key in allItems) {
        items.push(<SystemItem key={key} item={allItems[key]} selectedSystemId={selectedSystemID} />);
      }
    }

    return (
      <section id="systems" className="col-7-12">
        <ul className="col-1-1" id="systemitem-list">{items}</ul>
        <div id="addNewSystem">
          <NewSystemInput onSave={ this._onAdd }/>
        </div>
      </section>
    );
  },

  _onChange: function () {
    var self = this;

    SystemStore.getSelectedSystemId().then(function (selectedSystemId) {
      self.setState({
          items: SystemStore.getAll(),
          selectedSystemId: selectedSystemId.id
        }
      );
    });
  },

  _onAdd: function (newSystem) {
    Actions.createSystem(newSystem);
  }

});

module.exports = SystemSection;
