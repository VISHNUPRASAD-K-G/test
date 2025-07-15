import { faFacebook, faInstagram, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'

function Header() {
  const [clickStatus, setClickStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token, setToken] = useState("")
  const [userProfile, setuserProfile] = useState('')
  console.log(userProfile);
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      setuserProfile(JSON.parse(sessionStorage.getItem('existingUser')).profile)
    }
  },[])

  return (
    <>
      <div className='flex justify-between items-center p-3'>
        <div className='flex md:ms-0 ms-5 items-center'>
          <img src="https://openclipart.org/image/800px/275692" alt="no-image" className='w-13 h-13' />
          <h1 className='text-xl md:hidden flex font-bold ms-3'>BOOK STORE</h1>
        </div>
        {/* style={{height:'60px', width:'60px'}} */}

        <div className='ms-30'>
          <h1 className='text-3xl hidden md:flex font-bold'>BOOK STORE</h1>
        </div>

        <div className='flex items-center'>
          <div className='md:flex hidden'>
            <FontAwesomeIcon icon={faInstagram} className='mx-2' />
            <FontAwesomeIcon icon={faXTwitter} className='mx-2' />
            <FontAwesomeIcon icon={faFacebook} className='mx-2' />
          </div>
          {/* <img src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740" alt="no-image" className='w-full h-10' /> */}
          <div className='md:flex hidden'>
            {!token
              ?
              <Link to={'/login'}><button className='px-4 ms-5 py-3 border border-black rounded hover:bg-black hover:text-white cursor-pointer'><FontAwesomeIcon icon={faUser} className='me-2' /> Login</button></Link>
              :
            <div className="relative inline-block text-left">
              <div className='overflow-hidden w-10 h-10' style={{borderRadius:"50%"}}>
                {/* if any error set button to -> px-3 py-2 -> remove className='overflow-hidden w-10 h-10' style={{borderRadius:"50%"}} from above div */}
                <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 h-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  <img src={userProfile == '' ? "https://openclipart.org/image/2000px/247319":userProfile.startsWith('https://lh3.googleusercontent.com')?userProfile:`${serverUrl}/imgUpload/${userProfile}`} alt="user-img" className='w-10 h-10 cursor-pointer' referrerPolicy='no-referrer' />
                </button>
              </div>

              {dropDownStatus &&
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div className="py-1" role="none">
                   <Link to={'/profile'}> <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Profile</a></Link>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</a>
                  </div>
                </div>}
            </div>
            }

          </div>
        </div>
      </div>

      <nav className='bg-gray-800 p-3'>
        <div className='flex md:hidden justify-between items-center px-3'>
          <span onClick={() => setClickStatus(!clickStatus)} className='text-white text-2xl'><FontAwesomeIcon icon={faBars} /></span>

          {!token?
            <Link to={'/login'}><button className='px-4 ms-5 py-3 border border-white text-white rounded cursor-pointer'><FontAwesomeIcon icon={faUser} className='me-2' /> Login</button></Link>
            :
            <div className="relative inline-block text-left">
            <div className='overflow-hidden w-10 h-10' style={{borderRadius:"50%"}}>
              <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent text-sm font-semibold text-gray-900 cursor-pointer" id="menu-button " aria-expanded="true" aria-haspopup="true">
                <img src={userProfile == '' ? "https://openclipart.org/image/2000px/247319":userProfile.startsWith('https://lh3.googleusercontent.com')?userProfile:`${serverUrl}/imgUpload/${userProfile}`} alt="user-img" className='' />
                {/* <img src={userProfile == '' ? "https://openclipart.org/image/2000px/247319":userProfile.startsWith('https://lh3.googleusercontent.com')?userProfile:`${serverUrl}/imgUpload/${userProfile}`} alt="user-img" className='md:w-9 md:h-9 w-20 h-13' /> */}
              </button>
            </div>

            {dropDownStatus &&
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                  <Link to={'/profile'}><a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Profile</a></Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</a>
                </div>
              </div>}
          </div>}
        </div>

        <ul className={clickStatus ? 'md:flex text-white justify-center' : 'text-white md:flex hidden justify-center md:mt-0 mt-5'}>
          <Link to={'/'}><li className='mx-3 md:mb-0 mb-3'>Home</li></Link>
          <Link to={'/all-Books'}><li className='mx-3 md:mb-0 mb-3'>Books</li></Link>
          <Link to={'/careers'}><li className='mx-3 md:mb-0 mb-3'>Careers</li></Link>
          <Link to={'/contact'}><li className='mx-3 md:mb-0 mb-3'>Contact</li></Link>
        </ul>
      </nav>
    </>
  )
}

export default Header