var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var PolledItem = require('./PolledItem.react');
var NewPolledItemInput = require('./NewPolledItemInput.react');
var PolledItemStore = require('../stores/PolledItemStore');

var PolledItemSection = React.createClass({

  componentDidMount: function() {
    PolledItemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PolledItemStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

    var allItems = this.state;
    var items = [];

    if (allItems && Object.keys(allItems).length > 0) {
      for (var key in allItems) {
        items.push(<PolledItem key={key} item={allItems[key]} onDelete={ this._onDelete } />);
      }
    }

    return (
      <section id="polledItems" className="col-7-12">
        <ul className="col-1-1" id="polleditem-list">{items}</ul>
        <div id="addNew">
          <NewPolledItemInput onSave={ this._onAdd } />
        </div>
      </section>
    );
  },

  _onChange: function() {
    var state = PolledItemStore.getAll();

    this.replaceState({});
    this.replaceState(state);
  },

  _onAdd: function (newPolledItem) {
    Actions.create(newPolledItem);
  },

  _onDelete: function (id) {
    Actions.deletePolledItem(id);
  }

});

module.exports = PolledItemSection;
