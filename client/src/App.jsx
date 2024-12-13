import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Auth/Login'
import { Signup } from './Pages/Auth/Signup'
import { DisplayStudent } from './Pages/Lecturer/DisplayStudent'
import { LecturerPage } from './Pages/Lecturer/LecturerPage'
import { StudentPage } from './Pages/StudentPage'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './Components/Navbar'
import { GenerateTokenPage } from './Pages/Lecturer/GenerateTokenPage'
import { AddStudentModal } from './Components/Modal/AddStudentModal'
import { DeleteModal } from './Components/Modal/DeleteModal'
import { ViewModal } from './Components/Modal/ViewModal'
import axios from 'axios';
import { Attendance } from './Pages/Lecturer/Attendance'
axios.defaults.baseURL = 'http://localhost:3500';
axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <>
    <Toaster position="top-center" duration={3000} />
    <Navbar />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Signup />} />

      <Route path='/lecturer' element={<LecturerPage />} />
      <Route path='/lecturer/displayStudent' element={<DisplayStudent />} />
      <Route path='/lecturer/generateToken' element={<GenerateTokenPage />} /> 
      <Route path='/lecturer/attendance' element={<Attendance />} />
      {/* <Route path='/addmodal' element={<AddStudentModal />} /> */}

      <Route path='/student' element={<StudentPage />} />

      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
    </>
  )
}
