import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEye, faCamera, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { viewBookApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'

function Viewbook() {
  const [viewModal, setViewModal] = useState(false)
  const [viewBook, setviewBook] = useState({})
  const { id } = useParams()
  console.log(id);
  const navigate = useNavigate()

  const getViewBookDetails = async (id) => {
    const result = await viewBookApi(id)
    setviewBook(result.data)
  }

  console.log(viewBook);

  useEffect(() => {
    getViewBookDetails(id)
  }, [])

  return (
    <>
      <Header />
      <div className='md:px-10 px-3 pt-16 pb-10'>
        {viewBook?.length > 0 ?
          viewBook?.map((item) => (
            <div className="md:grid grid-cols-[1fr_3fr] border-1 border-gray-200 p-4 shadow-md">
              {/* Column 1 */}
              <div className='px-8 py-5 md:inline-block flex justify-center'>
                <img src={item?.imageUrl} alt="no-image" className='h-98' style={{ width: '100%' }} />
              </div>
              {/* column 2 */}
              <div className='py-5 relative'>
                {/* eye */}
                <div className='absolute top-0 right-0 '>
                  <button onClick={() => setViewModal(true)} className='text-gray-400 hover:text-gray-500 text-2xl cursor-pointer'><FontAwesomeIcon icon={faEye} /></button>
                </div>
                {/* Modal */}
                {viewModal &&
                  <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                          <div className="bg-white">
                            <div className='bg-gray-900 text-white p-4 flex justify-between items-center'>
                              <p className='text-xl'>Book Photos</p>
                              <span onClick={() => setViewModal(false)} className='bg-white rounded p-1 text-gray-900 hover:bg-gray-200 cursor-pointer'><FontAwesomeIcon icon={faXmark} className='fa-2x' /></span>
                            </div>
                            <div className='p-4'>
                              <h1 className='text-blue-500'> <FontAwesomeIcon icon={faCamera} className='me-3' /> Camera click of the book in the hand of seller</h1>

                              <div className='flex py-10'>
                                {item?.uploadImages.map((items)=>(
                                  <img src={`${serverUrl}/imgUpload/${items.filename}`} alt="no-image" style={{ height: '330px', width: '230px' }} className='mx-2' />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* title */}
                <div className='md:mt-0 mt-5'>
                  <h2 className='text-center text-sm md:text-4xl font-bold'>{item?.title}</h2>
                  <p className='text-blue-500 text-center mt-2 md:text-sm text-xs' >- {item.author}</p>
                </div>
                {/* publish details */}
                <div>
                  <div className='md:grid grid-cols-3 mt-10 font-bold leading-8 '>
                    <h6>Publisher: {item?.publisher}</h6>
                    <h6>Language: {item.language}</h6>
                    <h6>No. of pages: {item.noofpages}</h6>
                  </div>
                  <div className='md:grid grid-cols-3 font-bold md:mt-3 leading-8'>
                    <h6>Seller Mail: {item?.userMail}</h6>
                    <h6>Real Price: ${item?.price}</h6>
                    <h6>ISBN: {item?.isbn}</h6>
                  </div>
                </div>

                {/* book detail */}
                <div className='py-10'>
                  <p>{item?.abstract}</p>
                </div>
                {/* buttons */}
                <div className='md:flex w-full justify-end'>
                  <div className='flex justify-between'>
                    <button onClick={()=>navigate('/all-Books')} className='text-white bg-blue-500 rounded px-6 py-4 hover:bg-blue-600 cursor-pointer'><span className='me-2'><FontAwesomeIcon icon={faBackward} /></span>Back</button>
                    <button className='text-white bg-green-700 rounded px-6 py-4 md:ms-4 cursor-pointer hover:bg-green-800'>Buy $ {item.dprice}</button>
                  </div>
                </div>
                {/* <div className='md:grid grid-cols-3 w-full'>
                  <div></div>
                  <div></div>
                  <div className='flex w-full justify-between'>
                    <button className='text-white bg-blue-500 rounded px-6 py-3 hover:bg-blue-600 text-lg cursor-pointer'><span className='me-2'><FontAwesomeIcon icon={faBackward} /></span>Back</button>
                    <button className='text-white bg-green-700 rounded px-6 py-3 text-lg cursor-pointer hover:bg-green-800'>Buy $ 15</button>
                  </div>
                </div> */}
              </div>
            </div>
          ))
          :
          <p className='text-blue-700'>Loading...</p>
        }
      </div>



      {/* {viewModal && 
        <div className='w-full h-screen hidden md:flex justify-center items-center z-1 fixed top-0 left-0' style={{backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
            <div className='w-fit rounded shadow-md bg-white'>
              <header>
                <div className='w-full bg-blue-950 rounded p-3 flex justify-between'>
                  <h1 className='text-2xl text-white'>Book Photos</h1>
                  <button onClick={()=>setViewModal(!viewModal)} className='p-1 bg-white cursor-pointer hover:bg-gray-300'><FontAwesomeIcon icon={faXmark} className='fa-2x' /></button>
                </div>
              </header>
              <main>
                <div className='flex text-blue-500 items-center px-3 pt-6'>
                  <h3><FontAwesomeIcon icon={faCamera} className='me-3 fa-2x' /></h3>
                  <h3>Camera click of the book in the hand of seller</h3>
                </div>
                <div className='flex justify-center px-28 py-10 gap-10'>
                  <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg" alt="no-image" className='h-96' style={{ width:'100%'}} />
                  <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg" alt="no-image" className='h-96' style={{ width:'100%'}} />
                  <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg" alt="no-image" className='h-96' style={{ width:'100%'}} />
                </div>
              </main>
            </div>
        </div>
      } */}
      <Footer />
    </>
  )
}

export default Viewbook