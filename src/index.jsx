import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './style/style.css';
import { App } from './components/App';



window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});