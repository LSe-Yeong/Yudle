import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import MainP from './page/MainP';
import GamePage from './page/GamePage';
import Cookies from 'js-cookie';
import { changeWord } from './api/GetApi';

function App() {
    return (
          <Routes>
              <Route path='/' element={<GamePage/>}></Route>
          </Routes>
    );
}

export default App;
