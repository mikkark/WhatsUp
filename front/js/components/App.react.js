var PolledItemSection = require('./PolledItemSection.react');
var React = require('react');
var Actions = require('../actions/Actions');
var MessagesSection = require('./MessagesSection.react');
var SystemSection = require('./SystemSection.react');
var GraphicalView = require('./GraphicalView.react');

var App = React.createClass({

  //componentDidMount: function() {
  //  TodoStore.addChangeListener(this._onChange);
  //},
  //
  //componentWillUnmount: function() {
  //  TodoStore.removeChangeListener(this._onChange);
  //},

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div className="grid grid-pad">
        <GraphicalView />
        <PolledItemSection />
        <SystemSection />
        <input className="col-1-1" type="button" onClick={this._checkNow} value="Check now" />
        <MessagesSection />
      </div>
    );
  },

  _checkNow: function () {
    Actions.checkNow();
  }

});

module.exports = App;
