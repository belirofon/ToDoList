import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as App from './components/App'
import './style'

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});