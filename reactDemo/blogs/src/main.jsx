import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'normalize.css';
import './assets/css/main.less'
dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App locale={zhCN} />
  </React.StrictMode>
)
