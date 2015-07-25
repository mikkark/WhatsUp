var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');

function getStateFromStore() {
  return {
    messages: MessageStore.getAll()
  };
}

var MessagesSection = React.createClass({

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    if (!this.state || !this.state.messages) {
      return null;
    }

    var items = [];

    for (var index in this.state.messages) {
      var messageObject = this.state.messages[index];

      items.push(<li key={index}><p>{messageObject.message}</p></li>);
    }

    return (
      <section id="messages" className="col-1-1">
        <ul id="message-list">{items}</ul>
      </section>
    );
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStore());
  }

});

module.exports = MessagesSection;
