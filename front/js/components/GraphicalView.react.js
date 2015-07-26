var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var PolledItemStore = require('../stores/PolledItemStore');
var PolledItemSvg = require('./PolledItemSvg.react');

var GraphicalView = React.createClass({

  componentDidMount: function () {
    PolledItemStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    PolledItemStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {

    var items = [];

    if (this.state && this.state.items && Object.keys(this.state.items).length) {
      var i = 0;
      for (var key in this.state.items) {
        items.push(<PolledItemSvg key={key} item={this.state.items[key]} nTh={i}/>);
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

  _onChange: function () {
    this.setState({items: PolledItemStore.getAll()});
  }

});

module.exports = GraphicalView;
