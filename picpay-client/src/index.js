import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import Routes from './routes';
import './index.css';
import 'react-toastify/dist/ReactToastify.min.css'; 

ReactDOM.render(  
  <Provider store={store}>
    <Router>
      <App>
        <ToastContainer autoClose={2000} />
        <Routes />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);