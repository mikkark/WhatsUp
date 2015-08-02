var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var PolledItemStore = require('../stores/PolledItemStore');
var PolledItemSvg = require('./PolledItemSvg.react');
var PolledInterfaceItemSvg = require('./PolledInterfaceItemSvg.react');
var centers;

var GraphicalView = React.createClass({

  componentDidMount: function () {
    PolledItemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    PolledItemStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var items = [];
    centers = new Map();

    if (this.state && this.state.items && Object.keys(this.state.items).length) {
      var i = 0;
      for (var key in this.state.items) {
        if (!this.state.items[key].itemType || this.state.items[key].itemType === 'machine') {
          items.push(<PolledItemSvg key={key} item={this.state.items[key]} nTh={i} saveCenter={this._saveCenter}/>);
        }
        i++;
      }

      i = 0;
      for (var key in this.state.items) {
        if (this.state.items[key].itemType === 'interface') {
          items.push(<PolledInterfaceItemSvg key={key} item={this.state.items[key]} centers={centers} />);
        }
        i++;
      }
    }

    return (
      <svg id="systems" className="col-5-12" height="400px">
        <g>
          {items}
        </g>
      </svg>
    );
  },

  _saveCenter: function (item) {
    centers.set(item.key, item);
  },

  _onChange: function () {
    this.setState({items: PolledItemStore.getAll()});
  }

});

module.exports = GraphicalView;
