import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import MainP from './page/MainP';
import GamePage from './page/GamePage';

function App() {
 
    return (
          <Routes>
              <Route path="/" element={<MainP/>}></Route>
              <Route path='/play' element={<GamePage/>}></Route>
          </Routes>
    );
}

export default App;
