import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'primereact/resources/themes/saga-green/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import Routes from './Routes';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
  </>,
  document.getElementById('root')
);
