// This file bootstraps the entire application.

var App = require('./components/App.react');
var PolledItemStore = require('./stores/PolledItemStore');
var Actions = require('./actions/Actions');
var SystemStore = require('./stores/SystemStore');
var React = require('react');
window.React = React;

//PolledItemStore.getInitial();
//SystemStore.getInitial();

React.render(
<App />,
  document.getElementById('app')
);

Actions.bootstrap();