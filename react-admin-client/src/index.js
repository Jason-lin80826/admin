import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storgeUtils from './utils/storageUtils'

const user = storgeUtils.get()
memoryUtils.user = user
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

