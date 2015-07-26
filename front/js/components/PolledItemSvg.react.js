var React = require('react');
var ReactPropTypes = React.PropTypes;

var cx = require('react/lib/cx');

var colors = {
  ok: "#33FF0B",
    pending: "#6369FF",
    error: "#FF0000"
};

var PolledItemSvg = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    nTh: ReactPropTypes.number.isRequired
  },

  /**
   * @return {object}
   */
  render: function () {
    var item = this.props.item;
    var nTh = this.props.nTh;

    //var polledUrlInput = <input className="col-5-12" type="text" value={item.pollingUrl} />;
    var statusLabel = <text stroke="#000000" fill="#000000"
      x={35 + (nTh * 100)} y="30"
      text-anchor="middle" font-family="serif" font-size="20">{item.status}</text>

    //if (item.lastCheckedAt) {
    //  var asDate = new Date(item.lastCheckedAt);
    //  var lastCheck = <p className="col-2-12">{asDate.toLocaleDateString('fi-FI') + ' ' +
    //  asDate.toLocaleTimeString('fi-FI')}</p>;
    //}

    //var pollingInterval = <p className="col-1-12">{item.pollingInterval}s</p>;

    var statusColor = colors[item.status];

    return (
      <svg>
        <rect class="carMainRect" id="svg_1" height="32" width="70"
          y="0" x={0 + (nTh * 100)}
          stroke-width="5" stroke="#000000" fill={statusColor} />
        {statusLabel}
      </svg>
    );
  }

});

module.exports = PolledItemSvg;
