import React, { useState } from 'react'

const Chat = () => {
    const [input, setInput] = useState('')
    const [days, setDays] = useState(0)
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form action="" className='flex justify-center gap-10 w-screen'>
        <input onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Enter a topic (e.g., React, DSA, Python, Machine Learning)' className='text-xl p-5 rounded-full w-150 bg-zinc-700'/>
        <input onChange={(e)=>setDays(e.target.value)} type="number" name="" id="" placeholder='Number of days (e.g., 7, 30)' className='p-5 rounded-full w-50 bg-zinc-700 text-xl'/>
        
      <button className='bg-zinc-700 rounded-full p-5 cursor-pointer'>Generate Learning Plan</button>
      </form>
    </div>
  )
}

export default Chat
