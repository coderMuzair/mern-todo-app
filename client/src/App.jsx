import { useState, useEffect } from 'react'
import './App.css'
import Textbox from '../components/textbox'
import Btn from '../components/button'
import { Edit, Delete, Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Login from '../pages/Login';  
import SignUp from '../pages/SignUp';
import Button from '@mui/material/Button';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';


function App() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App
