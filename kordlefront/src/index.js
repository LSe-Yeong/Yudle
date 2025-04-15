import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './store/store';

alert("2025.4.01 ~ 현재 AWS 프리티어 종료로 인해 정답 단어와 랭킹을 불러올 수 없습니다.")
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
