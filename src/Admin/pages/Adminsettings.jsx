import React, { useContext, useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import Footer from '../../components/Footer'
import Adminsidebar from '../components/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { serverUrl } from '../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { editProfileApi } from '../../services/allApi'
import { adminProfileUpdateStatusContext } from '../../context/Contextshare'

function Adminsettings() {

  const [token, settoken] = useState('')

  const [adminDetails, setadminDetails] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profile: ''
  })

  const [existingProfile, setexistingProfile] = useState("")
  // console.log(adminDetails);

  const [preview, setpreview] = useState('')

  const { setadminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)

  const handleFileUpload = (e) => {
    setadminDetails({ ...adminDetails, profile: e.target.files[0] })
    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setpreview(url)
    }

  }
  console.log(preview);

  const handleRest = () => {
    if (sessionStorage.getItem('token')) {
      // const tok = sessionStorage.getItem('token')
      // settoken(tok)
      let user = JSON.parse(sessionStorage.getItem('existingUser'))
      setadminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setexistingProfile(user.profile)
    }
    setpreview('')
  }

  const handleSubmit = async () => {
    const { username, password, confirmPassword } = adminDetails

    if (!username || !password || !confirmPassword) {
      toast.info('please fill the form completely')
    }
    else {
      if (password != confirmPassword) {
        toast.warning('password must match')
      }
      else {

        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let key in adminDetails) {
            if (key != 'confirmPassword') {
              reqBody.append(key, adminDetails[key])
            }
          }
          reqBody.append('bio', '')
          const result = await editProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profie updated success.')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setadminProfileUpdateStatus(result)
          }
          else {
            toast.error('Something went wrong.')
          }

        }
        else {
          const result = await editProfileApi({ username, password, profile: existingProfile, bio: '' }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profie updated successfully.')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setadminProfileUpdateStatus(result)
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
      const tok = sessionStorage.getItem('token')
      settoken(tok)
      let user = JSON.parse(sessionStorage.getItem('existingUser'))
      setadminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setexistingProfile(user.profile)
    }
  }, [])

  return (
    <>
      <Adminheader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div>
          <Adminsidebar />
        </div>
        <div>
          <div className='md:p-4 pb-10'>
            <h1 className="text-3xl text-center font-semibold my-10">Settings</h1>
            <div className='md:grid grid-cols-2'>
              <div className='md:px-20 px-5'>
                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, totam aliquam? Minus soluta vel doloremque impedit tempora commodi consequuntur obcaecati amet! Porro dolore omnis itaque temporibus, accusamus iure fugiat sit.Architecto sapiente quibusdam maxime doloribus non quidem expedita inventore assumenda.</p>

                <p className='mt-10 text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error eveniet expedita quidem ab inventore omnis eaque iusto distinctio fugiat? Culpa aliquid natus eum consequatur dolore labore autem odio ratione repellat!Natus totam quo veniam delectus veritatis fugiat at et, exercitationem excepturi odit minus! Blanditiis mollitia amet, rem ea, eius harum reprehenderit nesciunt cumque reiciendis hic, vel vero asperiores ut repellendus.Odio quidem optio modi incidunt. </p>
              </div>
              <div className='md:px-10 px-5 mt-5 md:mt-0'>
                <form className='bg-blue-200 rounded md:px-10 p-5'>
                  <div className='my-10 flex justify-center items-center'>
                    <label htmlFor="editUserProfile">
                      <input onChange={(e) => handleFileUpload(e)} type="file" style={{ display: 'none' }} id='editUserProfile' />
                      {existingProfile == '' ?
                        <img src={preview ? preview : "https://openclipart.org/image/2000px/247319"} alt="usr-profile" style={{ width: '110px', height: '110px', borderRadius: '50%' }} />
                        :
                        <img src={preview? preview :`${serverUrl}/imgUpload/${existingProfile}`} alt="usr-profile" style={{ width: '110px', height: '110px', borderRadius: '50%' }} />
                      }

                      <div style={{ marginLeft: '80px', marginTop: '-25px' }}>
                        <FontAwesomeIcon icon={faPen} className='p-1 rounded bg-yellow-500 text-white' />
                      </div>
                    </label>
                  </div>
                  <div className='mb-3'>
                    <input onChange={(e) => setadminDetails({ ...adminDetails, username: e.target.value })} value={adminDetails?.username} type="text" placeholder='Username' className='bg-white rounded p-2 w-full' />
                  </div>
                  <div className='mb-3'>
                    <input onChange={(e) => setadminDetails({ ...adminDetails, password: e.target.value })} value={adminDetails?.password
                    } type="text" placeholder='Password' className='bg-white rounded p-2 w-full' />
                  </div>
                  <div className='mb-3'>
                    <input onChange={(e) => setadminDetails({ ...adminDetails, confirmPassword: e.target.value })} value={adminDetails.confirmPassword} type="text" placeholder='Confirm Password' className='bg-white rounded p-2 w-full' />
                  </div>
                  <div className='flex justify-between my-6'>
                    <button type='button' onClick={handleRest} className='py-2 w-1/2 rounded border border-transparent bg-amber-400 text-white hover:bg-white hover:border-amber-400 hover:text-amber-400 cursor-pointer'>Reset</button>
                    <button type='button' onClick={handleSubmit} className='py-2 w-1/2 rounded border border-transparent bg-green-600 ms-3 text-white hover:bg-white hover:border-green-600 hover:text-green-600 cursor-pointer'>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Adminsettings