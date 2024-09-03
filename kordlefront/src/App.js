import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import MainP from './page/MainP';
import GamePage from './page/GamePage';
import Cookies from 'js-cookie';
import { changeWord } from './api/GetApi';

function App() {
 
    useEffect(() => {
        const checkTime = () => {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
          console.log(hours,minutes,seconds)
          // 특정 시간(예: 12시)에 도달하면 실행
          if (hours === 12 && minutes === 0 && seconds === 0) {
            changeWord()
            Cookies.remove('userAnswer');
            console.log('매일 12시에 초기화');
            // 원하는 함수 호출
          }
        };
    
        // 1초마다 현재 시간 확인
        const interval = setInterval(checkTime, 1000);
    
        // 클린업: 컴포넌트 언마운트 시 interval 정리
        return () => clearInterval(interval);
      }, []);

    // useEffect(() => {
    //     // 쿠키를 설정합니다.
    //     // 특정 시간(예: 5초) 후에 쿠키를 삭제합니다.
    //     const timer = setTimeout(() => {
    //     changeWord()
    //     Cookies.remove('userAnswer');
    //     console.log('쿠키가 삭제되었습니다.');
    //     }, 1000*60*2); // 5000ms = 5초
    
    //     // 클린업 함수: 컴포넌트가 언마운트되면 타이머를 정리합니다.
    //     return () => clearTimeout(timer);
    // }, []);

    return (
          <Routes>
              <Route path="/" element={<MainP/>}></Route>
              <Route path='/play' element={<GamePage/>}></Route>
          </Routes>
    );
}

export default App;
