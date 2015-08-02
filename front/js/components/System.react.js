var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../Actions/Actions');

var cx = require('classnames');

var System = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    selectedSystemId: ReactPropTypes.string
  },

  getInitialState: function () {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function () {
    var item = this.props.item;

    return (
      <li className={cx({
        'col-1-1': true,
        'selected': item._id === this.props.selectedSystemId
      })}
        key={item._id}
        onClick={this._onClick}>
        <p className="col-4-12">Name: {item.name}</p>
        <p className="col-4-12">Status: {item.status}</p>
      </li>
    );
  },

  _onClick: function () {
    Actions.systemItemClicked(this.props.item._id);
  }

});

module.exports = System;
