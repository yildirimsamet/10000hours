import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import WithUser from './components/HOC/WithUser';


ReactDOM.render(
  <React.StrictMode>
   <WithUser>
    <App />
   </WithUser>
  </React.StrictMode>,
  document.getElementById('root')
);

