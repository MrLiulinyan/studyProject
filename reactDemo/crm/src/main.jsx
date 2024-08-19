import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@/assets/css/common.scss';
import '@/assets/iconfont/iconfont.css';
import store, { persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
