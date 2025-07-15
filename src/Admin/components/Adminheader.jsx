import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Adminheader() {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <nav className='p-5 py-3 flex items-center'>
                <div className='flex items-center'>
                    <img src="https://openclipart.org/image/800px/275692" alt="no-image" className='w-13 h-13' />
                    <h1 className='text-3xl md:flex hidden font-bold ms-3'>BOOK STORE</h1>
                </div>
    
                <div className='ms-auto'>
                    <button onClick={handleLogout} className='border rounded px-4 py-3'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
                </div>
            </nav>

            <div className='bg-gray-900 py-3 w-full text-center text-white'>
                <p>Welcome, Admin!    You're all set to manage and monitor the system. Let's go to work</p>
            </div>
        </>
    )
}

export default Adminheader