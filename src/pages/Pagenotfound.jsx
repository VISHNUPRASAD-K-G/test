import React from 'react'

function Pagenotfound() {
  return (
    <div className='w-full grid md:grid-cols-3 h-screen'>
      <div></div>
      <div className='flex justify-center items-center flex-col'>
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif" alt="no-name" className='w-full' />
        <div className='text-center'>
          <p>On No !</p>
          <h1 className='md:text-5xl text-3xl'>Looks Like You're Lost</h1>
          <p className='mt-2 md:text-xl'>The page you are looking for is not available</p>
        </div>
        <button className='mt-4 bg-blue-600 px-4 py-3 rounded text-white hover:bg-blue-700 cursor-pointer'>BACK HOME</button>
      </div>
      <div></div>
    </div>
  )
}

export default Pagenotfound