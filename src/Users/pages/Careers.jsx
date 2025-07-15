import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faCamera, faLocationDot, faSquareUpRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addApplicationApi, getAllJobsApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Careers() {
  const [viewModal, setViewModal] = useState(false)
  const [allJobs, setallJobs] = useState([])
  const [searchKey, setsearchKey] = useState('')
  const [applicationDetails, setapplicationDetails] = useState({
    jobTitle: '',
    fullName: '',
    qualification: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: ''
  })

  // const [openModal, setopenModal] = useState(second)

  const [token, settoken] = useState('')
  const navigate = useNavigate()
  // const [first, setfirst] = useState()
  // console.log(applicationDetails);

  const handleRest = () => {
    setapplicationDetails({
      fullName: '',
      qualification: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: ''
    })
    document.getElementById('fileInput').value = ''
  }

  const getallJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    // console.log(result);
    setallJobs(result.data)

  }

  const openModal = (title) => {
    setViewModal(true);
    setapplicationDetails({ ...applicationDetails, jobTitle: title })
  }

  // console.log(allJobs);

  const handleAdd = async () => {
    const { fullName, qualification, email, phone, coverLetter, resume } = applicationDetails
    if (!token) {
      toast.info('please login to continue.')
      navigate('/login')
    }
    else if (!fullName || !qualification || !email || !phone || !coverLetter || !resume) {
      toast.info('Please fill the form completely.')
    }
    else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const reqBody = new FormData()

      for (let key in applicationDetails) {
        reqBody.append(key, applicationDetails[key])
      }

      const result = await addApplicationApi(reqBody, reqHeader)
      if (result.status == 200) {
        toast.success('Application submitted successfully')
      }
      else if (result.status == 406) {
        toast.info('Application already exists')
      }
      else {
        toast.error('something went wrong')
      }
      setViewModal(false)
      handleRest()
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      settoken(sessionStorage.getItem('token'))
    }
  })

  useEffect(() => {
    getallJobs(searchKey)
  }, [searchKey])
  return (
    <>
      <Header />
      <div className='md:grid grid-cols-[1fr_4fr_1fr] my-10'>
        <div></div>
        <div className='p-5'>
          <h1 className='text-3xl text-center'>Careers</h1>
          <p className='md:text-center text-justify mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium tenetur ipsum inventore quis molestias ut aspernatur sapiente at earum unde libero, porro natus odio, illo tempore laboriosam pariatur laudantium ab.
            Facere tempora eum aspernatur temporibus nemo dignissimos magnam dolore rem numquam explicabo veniam!</p>
        </div>
        <div></div>
      </div>

      <h1 className='text-2xl md:ms-20 ms-5 my-10'>Current Openings</h1>

      <div className='md:grid grid-cols-3 my-10 md:px-0 px-5'>
        <div></div>
        <div className='w-full flex'>
          <input onClick={(e) => setsearchKey(e.target.value)} type="text" placeholder='Search by Title' className='border p-2 w-full bg-white border-gray-300' />
          <button className='bg-green-700 text-white px-5 py-3 hover:bg-green-800 cursor-pointer'>Search</button>
        </div>
        <div></div>
      </div>

      {allJobs?.length > 0 ?
        allJobs?.map((item, index) => (
          <div key={index} className='md:grid grid-cols-[1fr_4fr_1fr] my-10 px-5'>
            <div></div>
            <div className='p-5 shadow-md rounded'>
              <div className="grid grid-cols-[7fr_1fr]">
                <div>
                  <h1>{item?.title}</h1>
                  <hr className='border-gray-300 mt-3' />
                </div>
                <div>
                  <button onClick={() => openModal(item?.title)} className='bg-blue-700 px-4 py-3 rounded text-white ms-4 hover:bg-blue-800 cursor-pointer'>Apply <FontAwesomeIcon icon={faSquareUpRight} className='ms-1' /></button>
                </div>
              </div>

              <div className='my-4'>
                <h1 className='text-blue-700'><FontAwesomeIcon icon={faLocationDot} /> {item?.location}</h1>
                <h1 className="mt-3">Job Type : {item?.type}</h1>
                <h1 className="mt-3">Salary :{item?.salary}</h1>
                <h1 className="mt-3">Qualification :{item?.qualification}</h1>
                <h1 className="mt-3">Experience :{item?.experience}</h1>
                <h1 className="mt-3 text-justify">{item?.description}</h1>
              </div>
            </div>
            <div></div>
          </div>))
        :
        <p>No openings yet.</p>
      }

      {viewModal &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white">
                  {/* Modal Head */}
                  <div className='bg-gray-900 text-white p-4 flex justify-between items-center'>
                    <p className='text-xl'>Application form</p>
                    <span onClick={() => setViewModal(false)} className='bg-white rounded px-3 py-1 text-gray-900 hover:bg-gray-200 cursor-pointer'><FontAwesomeIcon icon={faXmark} className='' /></span>
                  </div>
                  {/* Modal Body */}
                  <div className='p-4'>
                    <div className="md:grid
                    grid-cols-2">
                      {/* Column - 1 */}
                      <div className='px-2'>
                        <div className="mb-3">
                          <input onChange={(e) => setapplicationDetails({ ...applicationDetails, fullName: e.target.value })} value={applicationDetails.fullName} type="text" placeholder='Full name' className='px-2 py-1 border border-gray-200 w-full rounded' />
                        </div>
                        <div className="mb-3">
                          <input onChange={(e) => setapplicationDetails({ ...applicationDetails, email: e.target.value })} value={applicationDetails.email} type="text" placeholder='Email ID' className='px-2 py-1 border border-gray-200 w-full rounded' />
                        </div>
                      </div>
                      {/* Column - 2 */}
                      <div className='px-2'>
                        <div className="mb-3">
                          <input onChange={(e) => setapplicationDetails({ ...applicationDetails, qualification: e.target.value })} value={applicationDetails.qualification} type="text" placeholder='Qualification' className='px-2 py-1 border border-gray-200 w-full rounded' />
                        </div>
                        <div className="mb-3">
                          <input onChange={(e) => setapplicationDetails({ ...applicationDetails, phone: e.target.value })} value={applicationDetails.phone} type="text" placeholder='Phone' className='px-2 py-1 border border-gray-200 w-full rounded' />
                        </div>
                      </div>
                    </div>
                    {/* Text Area */}
                    <div className='px-2 my-7'>
                      <textarea onChange={(e) => setapplicationDetails({ ...applicationDetails, coverLetter: e.target.value })} value={applicationDetails.coverLetter} name="" placeholder='Cover Letter' className='w-full border border-gray-200 p-2 rounded' id=""></textarea>
                    </div>
                    {/* Upload file */}
                    <div className='px-2'>
                      <label htmlFor="fileInput" className='mb-2 block'>Upload resume</label>
                      <input id='fileInput' onChange={(e) => setapplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} type="file" className='border border-gray-200  w-full rounded file:bg-gray-300 md:file:px-10 file:px-3 file:py-1' />
                    </div>
                  </div>
                  {/* Modal Footer */}
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={handleAdd} type="button" class="inline-flex w-full justify-center  bg-green-700 md:px-10 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-800 sm:ml-3 sm:w-auto cursor-pointer">Submit</button>
                    <button onClick={handleRest} type="button" class="mt-3 inline-flex w-full justify-center  bg-orange-400 px-3 md:px-10 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-orange-500 cursor-pointer sm:mt-0 sm:w-auto">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  )
}

export default Careers