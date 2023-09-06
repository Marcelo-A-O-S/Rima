import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import { ThemeProvider } from '../Context/ThemeContext'
import Home from '../Pages/Main/Home'
export default function Rotas() {
  return (
    <Router>
      <ThemeProvider >
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Login />} />
                <Route path='' element={<Login />} />
                <Route path="Login" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}
