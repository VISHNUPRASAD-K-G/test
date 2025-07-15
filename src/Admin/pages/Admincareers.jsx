import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import Footer from '../../components/Footer'
import Adminsidebar from '../components/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faLocationDot, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addJobApi, deleteAJobApi, getAllApplicationApi, getAllJobsApi } from '../../services/allApi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'

function Admincareers() {
  const [jobPostStatus, setJobPostStatus] = useState(true)
  const [viewAppStatus, setViewAppStatus] = useState(false)
  const [addJobModal, setaddJobModal] = useState(false)
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    qualification: '',
    experience: '',
    description: ''
  })

  const [addStatus, setaddStatus] = useState([])
  const [deletejobStatus, setdeletejobStatus] = useState([])

  const [allJobs, setAllJobs] = useState([])
  const [searchKey, setsearchKey] = useState('')
  // console.log(jobData);
  // console.log(addedJob);
  const [applications, setapplications] = useState([])


  const addJob = async () => {
    const { title, location, type, salary, qualification, experience, description } = jobData
    if (!title || !location || !type || !salary || !qualification || !experience || !description) {
      toast.info('Please fill the form completely')
    }
    else {
      const result = await addJobApi({ title, location, type, salary, qualification, experience, description })
      console.log(result);
      if (result.status == 200) {
        // setaddedJob(result.data)
        toast.success('Job Added Successfully')
        handleReset()
        setaddJobModal(false)
        setaddStatus(result)
      }
      else if (result == 401) {
        toast.warning(result.response.data)
        handleReset()
      }
      else {
        toast.error('something went wrong.')
        handleReset()
        setaddJobModal(false)
      }
    }
  }

  const handleReset = () => {
    setJobData({
      title: '',
      location: '',
      type: '',
      salary: '',
      qualification: '',
      experience: '',
      description: ''
    })
  }

  const getAllJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    // console.log(result);
    setAllJobs(result.data)
  }
  console.log(allJobs);


  const deleteAJob = async (id) => {
    const result = await deleteAJobApi(id)
    if (result.status == 200) {
      setdeletejobStatus(result)
    }
    else {
      toast.error('Something went wrong')
    }
  }

  const getAllApplications = async () => {
    const result = await getAllApplicationApi()
    console.log(result);
    
    if (result.status == 200) {
      setapplications(result.data)
    }

  }
  console.log(applications);


  useEffect(() => {
    getAllJobs(searchKey)
    if (viewAppStatus == true) {
      getAllApplications()
    }
  }, [addStatus, searchKey, deletejobStatus, viewAppStatus])

  return (
    <>
      <Adminheader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div>
          <Adminsidebar />
        </div>
        <div className='md:p-4 pb-10'>
          <h1 className='text-3xl text-center font-semibold my-10'>Careers</h1>
          <div className='flex justify-center items-center'>
            <p onClick={() => { setJobPostStatus(true); setViewAppStatus(false) }} className={jobPostStatus ? 'py-1 px-3 border-t-2 border-r-2 cursor-pointer text-blue-400 border-black' : 'py-1 px-3 border-t-2 border-r-2 cursor-pointer'}>Job Post</p>
            <p onClick={() => { setJobPostStatus(false); setViewAppStatus(true) }} className={viewAppStatus ? 'py-1 px-3 border-b-2 cursor-pointer text-blue-400 border-black' : 'py-1 px-3 border-b-2 cursor-pointer'}>View Applicant</p>
          </div>

          <div className='md:grid grid-cols-3 md:px-7 px-4'>
            <div>
              <div className='flex md:mt-3 mt-10'>
                {viewAppStatus && <input type="text" placeholder='Job Title' className='border-gray-300 border md:w-full p-1 md:p-2' />}
                {jobPostStatus && <input onChange={(e) => setsearchKey(e.target.value)} type="text" placeholder='Job Title' className='border-gray-300 border md:w-full p-1 md:p-2' />}
                <button className='bg-green-700 text-white border border-green-700 hover:text-green-700 cursor-pointer hover:bg-white md:py-2 py-1 px-4'>Search</button>
                {jobPostStatus &&
                  <button onClick={() => {
                    console.log('asdasda');
                    setaddJobModal(true)
                  }} className='md:hidden inline py-1 md:py-2 px-5 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer ms-2 text-sm'>Add Job</button>
                }
                {addJobModal == true &&
                  <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white">
                            <header>
                              <div className='bg-gray-900 p-3 flex justify-between'>
                                <h1 className='text-white text-xl'>Add Jobs</h1>
                                <button onClick={() => setaddJobModal(false)}><FontAwesomeIcon icon={faClose} /></button>
                              </div>
                            </header>
                            <main>
                              <div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                <form action="" className='space-y-3'>
                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Title</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, title: e.target.value }) }} value={jobData.title} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='job title' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Location</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, location: e.target.value }) }} value={jobData.location} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='location' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Type</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, type: e.target.value }) }} value={jobData.type} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='Type' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Salary</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, salary: e.target.value }) }} value={jobData.salary} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='Salary' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Qualification</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, qualification: e.target.value }) }} value={jobData.qualification} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='Qualification' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Experience</label> */}
                                    <input onChange={(e) => { setJobData({ ...jobData, experience: e.target.value }) }} value={jobData.experience} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='Experience' />
                                  </div>

                                  <div>
                                    {/* <label className='block font-semibold' htmlFor="">Job Description</label> */}
                                    <textarea name="" id="" onChange={(e) => { setJobData({ ...jobData, description: e.target.value }) }} value={jobData.description} type="text" className='w-full p-2 border border-gray-300 rounded mt-1' placeholder='Description'></textarea>
                                  </div>
                                </form>
                              </div>
                            </main>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={addJob}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 sm:ml-3 sm:w-auto cursor-pointer"
                            >
                              Add Job
                            </button>
                            <button onClick={handleReset}
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div></div>
            <div className='md:block hidden'>
              <div className='flex justify-end'>
                {jobPostStatus &&
                  <button onClick={() => setaddJobModal(true)} className='py-2 px-5 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer'>Add Job</button>}
              </div>
            </div>
          </div>

          {jobPostStatus &&
            <div className='md:px-7 px-4 md:mt-16 mb-7'>
              <div>
                {allJobs?.length > 0 ?
                  allJobs?.map((item, index) => (
                    <div key={index} className='mt-5 shadow-md border p-5 md:p-8 border-gray-200'>
                      <div className='grid grid-cols-[7fr_1fr]'>
                        <div>
                          <h1>{item?.title}</h1>
                          <div className='w-full border border-gray-400 mt-3'></div>
                        </div>

                        <div>
                          <button type='button' onClick={() => deleteAJob(item._id)} className='ms-5 py-2 px-3 cursor-pointer rounded text-white bg-red-600 border border-red-600 hover:text-red-600 hover:bg-white'>Delete <FontAwesomeIcon icon={faTrashCan} className='ms-2' /></button>
                        </div>

                      </div>

                      <div className='my-4'>
                        <h1 className='text-blue-700'><FontAwesomeIcon icon={faLocationDot} /> {item?.location}</h1>
                        <h1 className="mt-3">Job Type : {item?.type}</h1>
                        <h1 className="mt-3">Salary : {item?.salary}</h1>
                        <h1 className="mt-3">Qualification : {item?.qualification}</h1>
                        <h1 className="mt-3">Experience : {item?.experience}</h1>
                        <h1 className="mt-3 text-justify">{item?.description}</h1>
                      </div>
                    </div>
                  ))
                  :
                  <p>No Job Added Yet.</p>
                }
              </div>
            </div>
          }

          {viewAppStatus &&
            <div className='md:px-7 px-4 md:mt-16 mt-5'>
              {applications?.length > 0 ? <div className='overflow-x-auto'>
                <table className='table-auto w-full border rounded-md'>
                  <thead>
                    <tr className='bg-blue-600 text-white'>
                      <th className='px-4 py-2 border'>SL.NO</th>
                      <th className='px-4 py-2 border'>Job Title</th>
                      <th className='px-4 py-2 border'>Name</th>
                      <th className='px-4 py-2 border'>Qualification</th>
                      <th className='px-4 py-2 border'>Email</th>
                      <th className='px-4 py-2 border'>Phone</th>
                      <th className='px-4 py-2 border'>Cover Letter</th>
                      <th className='px-4 py-2 border'>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications?.map((items, index) => (
                      <tr key={index} className="bg-white">
                      <td className="border px-4 py-2 text-center">{index+1}.</td>
                      <td className="border px-4 py-2">{items?.jobTitle}</td>
                      <td className="border px-4 py-2">{items?.name}</td>
                      <td className="border px-4 py-2">{items?.qualification}</td>
                      <td className="border px-4 py-2">{items?.email}</td>
                      <td className="border px-4 py-2">{items?.phone}</td>
                      <td className="border px-4 py-2">{items?.coverLetter}</td>
                      <td className="border border-black px-4 py-2 text-blue-600">
                        <Link to={`${serverUrl}/pdfUpload/${items?.resume}`} target = '_blank' className='hover:underline'>resume</Link>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                :
                <p>No applications yet...</p>}
            </div>
          }

        </div>
      </div>
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  )
}

export default Admincareers