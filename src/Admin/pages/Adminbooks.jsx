import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import Footer from '../../components/Footer'
import Adminsidebar from '../components/Adminsidebar'
import { allUserApi, approveBooksApi, getAllBookAdminApi } from '../../services/allApi'

function Adminbooks() {
  const [bookListStatus, setBookListStatus] = useState(true)
  const [usersStatus, setUsersStatus] = useState(false)
  const [allBooks, setallBooks] = useState([])
  const [itemSoldOut, setItemSoldOut] = useState(true)
  const [updateStatus, setupdateStatus] = useState({})
  const [allUsers, setallUsers] = useState([])
  const getAllBooks = async () => {
    const result = await getAllBookAdminApi()
    // console.log(result)
    setallBooks(result.data)
  }
  // console.log(allBooks)

  const approveBooks = async (id) => {
    // console.log(id);

    const result = await approveBooksApi(id)
    // console.log(result);
    if (result.status == 200) {
      setupdateStatus(result)
    }

  }

  const getAllUsers = async () => {
    const result = await allUserApi()
    console.log(result);
    setallUsers(result.data)

  }

  useEffect(() => {
    if (bookListStatus == true) {
      getAllBooks()
    }
    if (usersStatus == true) {
      getAllUsers()
    }

  }, [updateStatus, usersStatus])

  return (
    <>
      <Adminheader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div>
          <Adminsidebar />
        </div>
        <div className='md:p-4 pb-10'>
          <h1 className='text-3xl text-center font-semibold my-10'>All Books</h1>
          <div className='flex justify-center items-center'>
            <p onClick={() => { setBookListStatus(true), setUsersStatus(false) }} className={bookListStatus ? 'py-1 px-3 border-t-2 border-r-2 cursor-pointer text-blue-400 border-black' : 'py-1 px-3 border-t-2 border-r-2 cursor-pointer'}>Book List</p>
            <p onClick={() => { setBookListStatus(false), setUsersStatus(true) }} className={usersStatus ? 'py-1 px-3 border-b-2 cursor-pointer text-blue-400 border-black' : 'py-1 px-3 border-b-2 cursor-pointer'}>Users</p>
          </div>

          {bookListStatus &&
            <div className='md:grid grid-cols-4 p-4 mt-16'>
              {allBooks?.map((items, index) => (
                <div key={index} className='px-5'>
                  <div className={items?.status == 'sold'?'bg-white shadow-md opacity-45 select-none rounded p-3':'bg-white shadow-md rounded p-3'}>
                    <img src={items?.imageUrl} alt="no image" className='w-full h-64' />
                    <div className='text-center'>
                      <p className='text-blue-500'>{items?.author}</p>
                      <h5 className='text-xl'>{items?.title}</h5>
                      <p className='text-amber-500'>{items?.userMail}</p>
                    </div>
                    {items.status == 'pending' ?
                      <div className='px-3 mt-3'>
                        <button type='button' onClick={() => approveBooks(items._id)} className='w-full text-white rounded bg-green-600 border border-transparent hover:text-green-600 hover:bg-white hover:border-green-600 cursor-pointer py-1'>Approve</button>
                      </div>
                      :
                      <div className='px-3 mt-3 flex justify-end'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/017/197/461/small/green-check-mark-icon-on-transparent-background-free-png.png" alt="no-image" style={{ width: '40px', height: '35px' }} />
                      </div>
                    }
                  </div>
                  <div>

                  </div>
                </div>
              ))}

              
              {/* <div className='px-5 md:mt-0 mt-7'>
                <div className='bg-white shadow-md rounded p-3'>
                  <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720313229i/968.jpg" alt="no image" className='w-full h-64' />
                  <div className='text-center'>
                    <p className='text-blue-500'>Dan Brown</p>
                    <h5 className='text-xl'>The Da Vinci Code</h5>
                    <p className='text-amber-500'>maxwell@gmail.com</p>
                  </div>
                  <div className='px-3 mt-3 flex justify-end'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/017/197/461/small/green-check-mark-icon-on-transparent-background-free-png.png" alt="no-image" style={{ width: '40px', height: '35px' }} />
                  </div>
                </div>
                <div>

                </div>
              </div> */}
              

              {/* <div className='px-5 md:mt-0 mt-7'>
                <div className='bg-white shadow-md rounded p-3'>
                  <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720313229i/968.jpg" alt="no image" className='w-full h-64' />
                  <div className='text-center'>
                    <p className='text-blue-500'>Dan Brown</p>
                    <h5 className='text-xl'>The Da Vinci Code</h5>
                    <p className='text-amber-500'>maxwell@gmail.com</p>
                  </div>
                  <div className='px-3 mt-3 flex justify-end'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/017/197/461/small/green-check-mark-icon-on-transparent-background-free-png.png" alt="no-image" style={{width:'40px', height:'35px'}} />
                  </div>
                </div>
                <div>

                </div>
              </div> */}

              {/* <div className={`px-5 md:mt-0 mt-7 ${itemSoldOut && 'opacity-45 select-none'}`}>
                <div className='bg-white shadow-md rounded p-3'>
                  <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720313229i/968.jpg" alt="no image" className='w-full h-64' />
                  <div className='text-center'>
                    <p className='text-blue-500'>Dan Brown</p>
                    <h5 className='text-xl'>The Da Vinci Code</h5>
                    <p className='text-amber-500'>maxwell@gmail.com</p>
                  </div>
                  <div className='px-3 mt-3 flex justify-end'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/017/197/461/small/green-check-mark-icon-on-transparent-background-free-png.png" alt="no-image" style={{ width: '40px', height: '35px' }} />
                  </div>
                </div>
                <div>

                </div>
              </div> */}
            </div>
          }

          {usersStatus &&
            <div className='md:grid grid-cols-3 p-4 mt-16'>
              {/* column 1 */}
              {allUsers?.length > 0 ?
                allUsers?.map((item, index) => (
                  <div key={index} className='px-5'>
                    <div className='bg-gray-300 py-3 px-5 rounded'>
                      <p className='text-red-500'>ID: {item?._id}</p>
                      <div className='flex mt-2'>
                        <img src="https://openclipart.org/image/2000px/247319" alt="usr-profile" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                        <div className='ms-10'>
                          <h1 className='text-blue-500 text-2xl'>{item?.username}</h1>
                          <p className='text-sm mt-2'>{item?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p>
                  Loading...
                </p>}
            </div>
          }

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Adminbooks