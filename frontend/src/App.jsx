import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'


function App() {

  return (
    <div className='App'>
      <Navbar/>
      <div className="max-w-[1200px] px-5 m-auto  text-slate-800">
      <Routes>
          <Route 
          path='/'
          element={<Home/>}
          />
          <Route path='/landing-page' element={<LandingPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
