import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import Store from './Store';

var store = new Store();
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
