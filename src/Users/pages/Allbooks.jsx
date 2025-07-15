import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { allBooksUserApi, allUserAddedBooksApi } from '../../services/allApi'

function Allbooks() {
  const [token, setToken] = useState("")
  const [allBooks, setallBooks] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [tempArray, settempArray] = useState([])

  
  const getAllBooks = async (token, searchKey) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await allBooksUserApi(reqHeader, searchKey)
    // console.log(result);
    setallBooks(result.data)
    settempArray(result.data)
  }

  //  filter books
  const filter = (data) => {
    if (data == 'No filter') {
      setallBooks(tempArray)
    }
    else {
      setallBooks(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
    }
  }

  

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const tok = sessionStorage.getItem("token")
      setToken(tok)
      getAllBooks(tok, searchKey)
    }
  }, [searchKey])
  return (
    <>
      <Header />
      {token ?
        <div className='my-10'>
          <h1 className='my-10 text-center text-3xl'>Collections</h1>
          <div className='md:grid grid-cols-3 mb-10 px-5'>
            <div></div>
            <div className='w-full flex'>
              <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='border p-2 w-full bg-white border-gray-300' />
              <button className='bg-blue-800 text-white px-5 py-3 hover:bg-blue-900 cursor-pointer'>Search</button>
            </div>
            <div></div>
          </div>

          <div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5'>
            {/* column 1 */}
            <div>
              <h1 className='text-2xl font-medium my-4'>Filter</h1>
              <div onClick={() => filter('Literary Fiction')} className='my-2 flex'>
                <input name='filter' type="radio" id="Literary Fiction" />
                <label htmlFor="Literary Fiction" className='ms-3'>Literary Fiction</label>
              </div>

              <div onClick={() => filter('Philosophy')} className='my-2 flex'>
                <input name='filter' type="radio" id="Philosophy" />
                <label htmlFor="Philosophy" className='ms-3'>Philosophy</label>
              </div>

              <div onClick={() => filter('Romance')} className='my-2 flex'>
                <input name='filter' type="radio" id="Romance" />
                <label htmlFor="Romance" className='ms-3'>Romance</label>
              </div>

              <div onClick={() => filter('Mystery/Thriller')} className='my-2 flex'>
                <input name='filter' type="radio" id="Mystery/Thriller" />
                <label htmlFor="Mystery/Thriller" className='ms-3'>Mystery/Thriller</label>
              </div>

              <div onClick={() => filter('Horror')} className='my-2 flex'>
                <input name='filter' type="radio" id="Horror" />
                <label htmlFor="Horror" className='ms-3'>Horror</label>
              </div>

              <div onClick={() => filter('Auto/Biography')} className='my-2 flex'>
                <input name='filter' type="radio" id="Auto/Biography" />
                <label htmlFor="Auto/Biography" className='ms-3'>Auto/Biography</label>
              </div>

              <div onClick={() => filter('Self-Help')} className='my-2 flex'>
                <input name='filter' type="radio" id="Self-Help" />
                <label htmlFor="Self-Help" className='ms-3'>Self-Help</label>
              </div>

              <div onClick={() => filter('Politics')} className='my-2 flex'>
                <input name='filter' type="radio" id="Politics" />
                <label htmlFor="Politics" className='ms-3'>Politics</label>
              </div>

              <div onClick={() => filter('No filter')} className='my-2 flex'>
                <input name='filter' type="radio" id="No filter" />
                <label htmlFor="No filter" className='ms-3'>No filter</label>
              </div>
            </div>
            {/* column 2 */}
            <div className='md:grid grid-cols-4'>
              {allBooks?.length > 0 ?
                allBooks?.map((item, index) => (
                  <div key={index} className="p-3" hidden={item?.status == 'pending' || item?.status=='sold'}>
                    <div className="p-3 shadow-md">
                      <img src={item.imageUrl} alt="no-image" style={{ width: '100%', height: '300px' }} />
                      <div className='flex justify-center items-center flex-col mt-3'>
                        <p className='text-blue-700'>{item.author}</p>
                        <h3>{item?.title.slice(0, 20)}</h3>
                        <Link to={`/view-book/${item?._id}`} className='w-full'><button className='w-full p-2 bg-blue-800 text-white mt-3 hover:bg-blue-900 cursor-pointer'>View Book</button></Link>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p>loading...</p>}
            </div>
          </div>
        </div>
        :
        <div className='md:grid grid-cols-3 md:px-10 px-5 my-10'>
          <div></div>
          <div>
            <img src="https://assets-v2.lottiefiles.com/a/e9ab46c6-1170-11ee-9713-736757efcf90/IUlXEoKCzt.gif" alt="lock image" style={{ width: '100%', height: "400px" }} />
            <h1 className='text-center md:text-2xl text-blue-700'>Please <Link to={'/login'} className='underline cursor-pointer font-bold hover:text-violet-700'>login</Link> to explore more</h1>
          </div>
          <div></div>
        </div>
      }
      <Footer />
    </>
  )
}

export default Allbooks