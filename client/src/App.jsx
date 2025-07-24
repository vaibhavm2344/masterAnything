import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Home from './pages/Home'


function App() {
  return (
    <div className='px-6 min-h-screen bg-zinc-800'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/courses' element={<Chat/>}/>
      </Routes>
    </div>
  )
}

export default App
