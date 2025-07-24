import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-4'>

      <h1 className='text-2xl text-white'>masterAnything</h1>

      <div className='flex gap-5'>
          <p className='pt-1 border-2 border-zinc-400 rounded-full p-2 px-5 cursor-pointer text-white/90'>Billing</p>
          <p className='pt-1 border-2 border-zinc-400 rounded-full p-2 px-5 cursor-pointer text-white/90'>Courses</p>
          <img src={assets.profile_icon} alt="" width={40}/>
      </div>
    </div>
  )
}

export default Navbar
