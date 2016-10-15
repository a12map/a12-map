import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'; // TODO merge with purchases
import PurchasesMap from './components/PurchasesMap';
import './index.css';

ReactDOM.render(
  <PurchasesMap/>,
  document.getElementById('root')
);
