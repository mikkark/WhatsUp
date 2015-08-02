var React = require('react');
var ReactPropTypes = React.PropTypes;

var colors = {
  ok: "#33FF0B",
  pending: "#6369FF",
  error: "#FF0000"
};

var PolledItemSvg = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    nTh: ReactPropTypes.number.isRequired,
    saveCenter: ReactPropTypes.func.isRequired
  },

  render: function () {
    var item = this.props.item;
    var nTh = this.props.nTh;

    var statusLabel = <text stroke="#000000" fill="#000000"
      x={35 + (nTh * 100)} y="30"
      text-anchor="middle" font-family="serif" font-size="20">{item.status}</text>;

    var statusColor = colors[item.status];

    var xCoord = (nTh * 100);

    var appearance = <rect id="svg_1" height="32" width="70"
      y="0" x={xCoord}
      stroke-width="5" stroke="#000000" fill={statusColor} />;

    this.props.saveCenter({key: item._id, x: (xCoord + (70 / 2)), y: (32 / 2)});

    return (
      <svg>
        {appearance}
        {statusLabel}
      </svg>
    );
  }

});

module.exports = PolledItemSvg;
