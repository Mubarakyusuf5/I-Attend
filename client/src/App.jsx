import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './Pages/Auth/Login'
import { DisplayStudent } from './Pages/Lecturer/DisplayStudent'
import { LecturerPage } from './Pages/Lecturer/LecturerPage'
import { StudentPage } from './Pages/StudentPage'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './Components/Navbar'
import { GenerateTokenPage } from './Pages/Lecturer/GenerateTokenPage'
import axios from 'axios';
import { TodaysAttendance } from './Pages/Lecturer/TodaysAttendance'
import { Attendance } from './Pages/Lecturer/Attendance'
import { AuthProvider } from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
axios.defaults.baseURL = 'http://localhost:3500';
axios.defaults.withCredentials = true;

export const App = () => {
  const location = useLocation();

  const isSignInPage = location.pathname === "/";
  return (
    <>
    <AuthProvider>
    <Toaster position="top-center" duration={3000} />
    {/* <Navbar /> */}
    {!isSignInPage &&  <Navbar />}
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/lecturer/dashboard' element={<ProtectedRoute element={<LecturerPage />} allowedRoles={['Lecturer']} /> }/>
      <Route path='/lecturer/displayStudent' element={<ProtectedRoute element={<DisplayStudent />} allowedRoles={['Lecturer']} />} />
      <Route path='/lecturer/generateToken' element={<ProtectedRoute element={<GenerateTokenPage />}  allowedRoles={['Lecturer']} />}/> 
      <Route path='/lecturer/attendance' element={<ProtectedRoute element={<Attendance />} allowedRoles={['Lecturer']} />} />
      <Route path='/lecturer/attendance/today' element={<ProtectedRoute element={<TodaysAttendance />} allowedRoles={['Lecturer']} />} />

      <Route path='/student' element={<ProtectedRoute element={<StudentPage />} allowedRoles={['Student']} />} />

      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      <Route path='/unauthorized' element={<h1 className='font-bold text-3xl flex justify-center items-center h-[500px]'>Unauthorized Access</h1>} />
    </Routes>
    </AuthProvider>
    </>
  )
}
