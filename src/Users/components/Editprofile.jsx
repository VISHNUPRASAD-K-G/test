import { faPen, faPenToSquare, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { editProfileApi } from '../../services/allApi'

function Editprofile() {
  const [offCanvas, setOffCanvas] = useState(false)
  const [token, settoken] = useState('')
  const [existingProfile, setexistingProfile] = useState('')
  const [preview, setpreview] = useState('')
  const [userDetails, setuserDetails] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profile: ''
  })

  const handleFileUpload = (e) => {
    setuserDetails({ ...userDetails, profile: e.target.files[0] })
    let url = URL.createObjectURL(e.target.files[0])
    console.log(url);

    setpreview(url)
  }

  const handleReset = () => {
    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setuserDetails({
        ...userDetails,
        username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio
      })
      setexistingProfile(user.profile)
    }
    setpreview('')
  }

  const handleSubmit = async () => {
    const { username, password, confirmPassword, bio } = userDetails
    if (!username || !password || !confirmPassword || !bio) {
      toast.info('please fill the details completely')
    }
    else {
      if (password != confirmPassword) {
        toast.warning('password must watch')
      }
      else {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let keys in userDetails) {
            if (keys != 'confirmPassword') {
              reqBody.append(keys, userDetails[keys])
            }
          }
          const result = await editProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profie updated success.')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
          }
          else {
            toast.error('Something went wrong.')
          }
        }
        else {
          const result = await editProfileApi({ username, password, profile: existingProfile, bio }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profie updated successfully.')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
          }
          else {
            toast.error('Something went wrong.')
          }
        }
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      settoken(sessionStorage.getItem('token'))
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setuserDetails({
        ...userDetails,
        username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio
      })
      setexistingProfile(user.profile)
    }
  }, [])

  return (
    <>
      {offCanvas &&
        <div className="relative z-10" aria-labelledby="drawer-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className='bg-white h-full w-96 z-50 fixed top-0 left-0'>
            <div className='flex bg-gray-900 text-white justify-between p-4'>
              <h1 className='text-2xl'>Edit User Profile</h1>
              <FontAwesomeIcon icon={faXmark} className='fa-2x hover:text-gray-300 cursor-pointer' onClick={() => setOffCanvas(false)} />
            </div>


            <div className='my-7 md:my-10 flex justify-center items-center'>
              <label htmlFor="editUserProfile">
                <input onChange={(e) => handleFileUpload(e)} type="file" style={{ display: 'none' }} id='editUserProfile' />
                {existingProfile == '' ?
                  <img src={preview ? preview : "https://openclipart.org/image/2000px/247319"} alt="usr-profile" style={{ width: '180px', height: '180px', borderRadius: '50%' }} />

                  :

                  existingProfile.startsWith('https') ?
                    <img src={preview ? preview : existingProfile} alt="usr-profile" style={{ width: '180px', height: '180px', borderRadius: '50%' }} />

                    :

                    <img src={preview ? preview : `${serverUrl}/imgUpload/${existingProfile}`} alt="usr-profile" style={{ width: '180px', height: '180px', borderRadius: '50%' }} />
                }
                <div style={{ marginLeft: '130px', marginTop: '-40px' }}>
                  <FontAwesomeIcon icon={faPen} className='p-3 rounded bg-yellow-500 text-white' />
                </div>
              </label>
            </div>

            <div className='px-4'>
              <div className='mb-3'>
                <input onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} type="text" placeholder='Username' className='p-2 w-full bg-white border border-gray-200 rounded' />
              </div>
              {userDetails.password !== 'googlePswd' &&
                <div onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} className='mb-3'>
                  <input value={userDetails.password} type="text" placeholder='Password' className='p-2 w-full bg-white border border-gray-200 rounded' />
                </div>
              }
              {userDetails.password !== 'googlePswd' &&
                <div className='mb-3'>
                  <input onChange={(e) => setuserDetails({ ...userDetails, confirmPassword: e.target.value })} value={userDetails.confirmPassword} type="text" placeholder='Confirm Password' className='p-2 w-full bg-white border border-gray-200 rounded' />
                </div>
              }
              <div className='mb-3'>
                <textarea onChange={(e) => setuserDetails({ ...userDetails, bio: e.target.value })} value={userDetails.bio} placeholder='Bio' rows={'4'} className='p-2 w-full bg-white border border-gray-200 rounded'></textarea>
              </div>
              <div className='my-4 flex justify-end'>
                <button type='button' onClick={handleReset} className='bg-amber-700 text-white px-5 py-2 rounded border hover:border-amber-700 hover:text-amber-700 hover:bg-white cursor-pointer'>Reset</button>
                <button type='button' onClick={handleSubmit} className='bg-green-700 text-white px-5 py-2 rounded border hover:border-green-700 hover:text-green-700 hover:bg-white cursor-pointer ms-5'>Update</button>
              </div>
            </div>

          </div>
        </div>}

      <div className='flex justify-end max-w-full'>
        <button onClick={() => setOffCanvas(true)} className='px-3 py-2 border border-blue-500 rounded hover:bg-blue-600 hover:text-white text-blue-500 cursor-pointer'><FontAwesomeIcon icon={faPenToSquare} className='md:me-2' /><span className='md:inline hidden'>Edit</span></button>
      </div>

      {/* <ToastContainer theme='colored' position='top-center' autoClose={2000} /> */}

    </>
  )
}

export default Editprofile