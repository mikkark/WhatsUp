var React = require('react');
var ReactPropTypes = React.PropTypes;

var colors = {
  ok: "#33FF0B",
  pending: "#6369FF",
  error: "#FF0000"
};

var PolledInterfaceItemSvg = React.createClass({

  propTypes: {
    item: ReactPropTypes.object.isRequired,
    centers: ReactPropTypes.object.isRequired
  },

  render: function () {
    var item = this.props.item;
    var centers = this.props.centers;

    //var polledUrlInput = <input className="col-5-12" type="text" value={item.pollingUrl} />;
    var statusLabel = <text stroke="#000000" fill="#000000"
      x="35" y="30"
      text-anchor="middle" font-family="serif" font-size="20">{item.status}</text>;

    var statusColor = colors[item.status];
    var callerCenter = centers.get(item.caller);
    var calleeCenter = centers.get(item.callee);

    var appearance = <line strokeWidth="3" markerEnd="url(#endMarker)" x1={callerCenter.x} x2={calleeCenter.x}
                           y1={callerCenter.y} y2={calleeCenter.y} stroke="#000000" fill={statusColor} />;

    return (
      <svg>
        <defs>
          <marker id = "endMarker" viewBox = "0 -5 10 10" refX = "0" refY = "0" markerUnits = "strokeWidth" markerWidth = "3"
            markerHeight = "3" stroke = "black" stroke-width = "2" fill = "none" orient = "auto">
            <path d = "M 0 -5 L 5 0 M 0 5 L 5 0"/>
          </marker>
        </defs>
        {appearance}
        {statusLabel}
      </svg>
    );
  }

});

module.exports = PolledInterfaceItemSvg;
