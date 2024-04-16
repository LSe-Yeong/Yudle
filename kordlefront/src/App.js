import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import MainP from './MainP';

function App() {
 
    return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainP/>}></Route>
            </Routes>
      </BrowserRouter>
    );
}

export default App;
