import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginApi, loginApi, registerApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

function Auth({ register }) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log(userDetails);
  const handleRegister = async () => {
    const { username, password, email } = userDetails
    if (!username || !password || !email) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await (registerApi({ username, password, email }));
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration successful')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 406) {
        toast.warn(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong.')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('please fill all the details.')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('login successful')
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
          setTimeout(() => {
            navigate('/admin-home')
          }, 2002)
        }
        else {
          setTimeout(() => {
            navigate('/')
          }, 2002)
        }
      }
      else if (result.status == 403 || result.status == 406) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlePswd', photo: details.picture })
    console.log(result);
    if (result.status == 200) {
      toast.success('login successful')
      sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
      setTimeout(() => {
        navigate('/')
      }, 2002)
    }
    else{
      toast.error('Something went wrong')
    }

  }

  return (
    <>
      <div id='login-page' className='flex items-center justify-center flex-col p-5'>
        <h1 className='text-4xl font-bold'>BOOK STORE</h1>

        <div className='grid md:grid-cols-3 w-full mt-10'>
          <div></div>
          <div>
            <form className='bg-gray-900 p-10 rounded flex justify-center items-center flex-col'>
              <div className='flex justify-center items-center text-white' style={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px solid white' }}>
                <FontAwesomeIcon icon={faUser} className='fa-2x' />
              </div>
              {register ?
                <h1 className='mt-5 mb-8 text-3xl text-white'>Register</h1>
                :
                <h1 className='mt-5 mb-8 text-3xl text-white'>Login</h1>}
              {register &&
                <div className='w-full mb-5'>
                  <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='placeholder:text-gray-400 text-black bg-white rounded w-full p-2' />
                </div>}
              <div className='w-full'>
                <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email Id' className='placeholder:text-gray-400 text-black bg-white rounded w-full p-2' />
              </div>
              <div className='w-full mt-5'>
                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='password' className='placeholder:text-gray-400 text-black bg-white rounded w-full p-2' />
                <div className='flex justify-between mt-2 w-full'>
                  <p className='text-amber-300' style={{ fontSize: '10px' }}>*Never share your password with others</p>
                  {!register &&
                    <p className='underline text-white ' style={{ fontSize: '10px' }}>Forget Password</p>}
                </div>
              </div>
              <div className='mt-5 w-full'>
                {register ?
                  <button type='button' onClick={handleRegister} className='w-full bg-green-700 text-white px-2 py-3 rounded hover:bg-green-800 cursor-pointer'>Register</button>
                  :
                  <button onClick={handleLogin} type='button' className='w-full bg-green-700 text-white px-2 py-3 rounded hover:bg-green-800 cursor-pointer'>Login</button>}
              </div>
              {!register &&
                <p className='text-white mt-2'>------------------ or ---------------</p>}
              {!register &&
                <div className='my-3'>
                  <GoogleLogin width={'300px'}
                    onSuccess={credentialResponse => {
                      // console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      toast.error('Login failed')
                    }}
                  />;
                </div>}
              <div className='text-white'>
                {register ?
                  <p className='mt-5'>Are you a New User ? <Link to={'/login'} className='text-blue-600 underline'>Login</Link></p>
                  :
                  <p>Are you a Already a user? <Link to={'/register'} className='text-blue-600 underline'>Register</Link></p>}
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Auth