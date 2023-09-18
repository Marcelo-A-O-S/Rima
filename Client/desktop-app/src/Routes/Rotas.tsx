import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import { ThemeProvider } from '../Context/ThemeContext'
import Home from '../Pages/Main/Home'
import { AuthSigned } from '../Context/AuthSigned'
import Header from '../Components/Header'
import Dashboard from '../Pages/Signed/Dashboard'
import { AuthProvider } from '../Context/AuthContext'
import About from '../Pages/Signed/About'

export default function Rotas() {
  return (
    <Router>
      <ThemeProvider >
        <AuthProvider>
          <Routes>
              <Route path="/" element={<Home />}>
                  <Route index element={<Login />} />
                  <Route path='' element={<Login />} />
                  <Route path="Login" element={<Login />} />
                  <Route path="*" element={<Login />} />
              </Route>
              <Route path="/Signed" element={<>
              <Header/>
              <AuthSigned/></>}>
                <Route index element={<Dashboard/>}/>
                <Route path='' element={<Dashboard/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path= 'about' element={<About/>}/>
                <Route path='*' element={<Dashboard/>}/>
              </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}
