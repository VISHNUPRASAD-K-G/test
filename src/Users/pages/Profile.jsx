import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import Editprofile from '../components/Editprofile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookApi, allUserAddedBooksApi, allUserbroughtBooksApi, deleteABookApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'

function Profile() {
  const [sellStatus, setSellStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    publisher: "",
    language: "",
    noofpages: "",
    isbn: "",
    imageUrl: "",
    category: "",
    price: "",
    dprice: "",
    abstract: "",
    uploadImages: []
  })
  const [preview, setPreview] = useState("")
  const [allUploadedImage, setAllUploadedImage] = useState([])
  const [userAddedBooks, setuserAddedBooks] = useState([])
  const [userBroughtBooks, setuserBroughtBooks] = useState([])
  const [token, setToken] = useState("")
  const [deleteStatus, setdeleteStatus] = useState([])

  const [userDetails, setuserDetails] = useState({
    username: '',
    bio: '',
    profile: ''
  })
  // console.log(bookDetails);

  const handleUpload = (e) => {
    console.log(e.target.files);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })
    //  createObjectURL() - to convert a file into url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
    let images = allUploadedImage
    images.push(url)
    setAllUploadedImage(images)
    // console.log(preview);
    // console.log(allUploadedImage);

  }

  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "",
      publisher: "",
      language: "",
      noofpages: "",
      isbn: "",
      imageUrl: "",
      category: "",
      price: "",
      dprice: "",
      abstract: "",
      uploadImages: []
    })
    setPreview("")
    setAllUploadedImage([])
  }

  const handleSubmit = async () => {
    const {
      title, author, publisher, language, noofpages, isbn, imageUrl, category, price, dprice, abstract, uploadImages
    } = bookDetails

    if (!title || !author || !publisher || !language || !noofpages || !isbn || !imageUrl || !category || !price || !dprice || !abstract || uploadImages.length == 0) {
      toast.info('please complete the form completely')
    }
    else {
      // if there is uploaded content the data should be send as form data.
      // step - 1 - create an object for the form data class
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        }
        else {
          bookDetails.uploadImages.map((item) => {
            reqBody.append("uploadedImages", item)
          })
        }
      }

      // console.log(reqBody);

      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }


      const result = await addBookApi(reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success('Book added Successfully')
      }
      else if (result.status == 401) {
        toast.info(result.response.data)
      }
      else {
        toast.error(result.response.data)
      }
      // setBookDetails({
      //   title: "",
      //   author: "",
      //   publisher: "",
      //   language: "",
      //   noofpages: "",
      //   isbn: "",
      //   imageUrl: "",
      //   category: "",
      //   price: "",
      //   dprice: "",
      //   abstract: "",
      //   uploadImages: []
      // })
      // setPreview("")
      // setAllUploadedImage([])
      handleReset()

    }
  }

  // get all user added books

  const getAllUserAddedBooks = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    // console.log(token);

    const result = await allUserAddedBooksApi(reqHeader)
    // console.log(result);
    setuserAddedBooks(result.data)
  }

  const getAllUserBroughtBooks = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    // console.log(token);

    const result = await allUserbroughtBooksApi(reqHeader)
    setuserBroughtBooks(result.data);
  }

  // delete a book
  const handleDelete = async (id) => {
    const result = await deleteABookApi(id)
    // console.log(result);
    if (result.status == 200) {
      setdeleteStatus(result)
      toast.success('deletion')
    }
  }
  console.log(userDetails.profile);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const tok = sessionStorage.getItem("token")
      setToken(tok)
      if (bookStatus == true) {
        getAllUserAddedBooks(tok)
      }
      else if (purchaseStatus == true) {
        getAllUserBroughtBooks(tok)
      }
      else {
        console.log('something went wrong');

      }
    }


  }, [bookStatus, deleteStatus])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setuserDetails({
        ...userDetails,
        username: user.username, bio: user.bio, profile: user.profile
      })
    }
  }, [])


  return (
    <>
      <Header />
      {/* <button type='button' onClick={()=>toast.success('successful')} className=''>asdsad</button> */}
      <div className='bg-gray-800' style={{ height: '200px' }}></div>
      <div style={{ height: '230px', width: '230px', borderRadius: '50%', marginTop: '-130px', marginLeft: '70px' }} className='p-3 flex justify-center items-center bg-white'>
        <img src={userDetails.profile == '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwArgLa9LDBZSWua4jg4GqmlWAAEy19bacDA&s' : userDetails.profile.startsWith('https://lh3.googleusercontent.com') ? userDetails.profile : `${serverUrl}/imgUpload/${userDetails.profile}`} alt="user-img" style={{ height: '200px', width: '200px', borderRadius: '50%' }} referrerPolicy='no-referrer' />
      </div>

      <div className='flex justify-between my-5 md:px-20 px-10 w-full'>
        <div className='flex items-center justify-center'>
          <h1 className='text-3xl'>{userDetails?.username}</h1><FontAwesomeIcon icon={faCircleCheck} className='text-blue-500 mt-2 ms-3' />
        </div>
        <div><Editprofile /></div>
      </div>

      <p className='text-justify md:px-20 px-10 my-5 text-lg'>{userDetails?.bio == '' ? 'Hey i am using the bookstore app.' : userDetails?.bio}</p>


      <div className='md:px-40 px-5 md:pb-0 pb-7'>
        {/* tabs */}
        <div className='flex justify-center items-center text-xl my-10'>
          <p onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }} className={sellStatus ? 'px-4 py-3 text-blue-500 border-gray-300 border-l border-r border-t rounded cursor-pointer' : 'px-4 py-3 border-gray-300 border-b cursor-pointer'}>Sell Book</p>
          <p onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }} className={bookStatus ? 'px-4 py-3 text-blue-500 border-gray-300 border-l border-r border-t rounded cursor-pointer' : 'px-4 py-3 border-gray-300 border-b cursor-pointer'}>Book Status</p>
          <p onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'px-4 py-3 text-blue-500 border-gray-300 border-l border-r border-t rounded cursor-pointer' : 'px-4 py-3 border-gray-300 border-b cursor-pointer'}>Purchase History</p>
        </div>

        {/* sell books */}
        {sellStatus &&
          <div className='md:p-10'>
            <div className='bg-gray-200 p-5 rounded-md'>
              <h1 className='text-center text-3xl font-medium'>Book Details</h1>
              <div className='md:grid grid-cols-2 '>
                <div className='my-10 px-2'>
                  <div className="mb-3">
                    <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} type="text" placeholder='No of Pages' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" placeholder='Img Url' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} type="text" placeholder='Discount Price' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} type="text" placeholder='Abstract' className='w-full p-2 rounded bg-white' rows={'8'}></textarea>
                  </div>
                </div>
                <div className='my-10 px-2'>
                  <div className="mb-3">
                    <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='w-full p-2 rounded bg-white' />
                  </div>
                  <div className="mb-3">
                    <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='w-full p-2 rounded bg-white' />
                  </div>

                  <div className='flex items-center justify-center flex-col mt-10'>
                    {!preview ?
                      <label htmlFor="uploadImage">
                        <input onChange={(e) => handleUpload(e)} type="file" id='uploadImage' style={{ display: 'none' }} />
                        <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="upload-img" style={{ width: '200px', height: '200px' }} />
                      </label>
                      :
                      <img src={preview} alt="book-image" style={{ width: '200px', height: '200px' }} className='rounded-lg' />}

                    {preview && <div className='mt-10 flex items-center'>
                      {
                        allUploadedImage.map((item, index) => (
                          <img key={index} src={item} alt="book-img" style={{ width: '50px', height: '50px' }} className='mx-2' />
                        ))

                      }

                      {allUploadedImage.length < 3 && <label htmlFor="uploadImage">
                        <input onChange={(e) => handleUpload(e)} type="file" id='uploadImage' style={{ display: 'none' }} />
                        <FontAwesomeIcon icon={faPlus} className='p-2 shadow-lg bg-gray-200 border border-white ms-4 cursor-pointer hover:bg-gray-300' />
                      </label>}
                    </div>}
                  </div>
                </div>

                <div>

                </div>
              </div>

              <div className='flex justify-end'>
                <button type='button' onClick={handleReset} className='bg-amber-700 text-white px-4 py-3 rounded border hover:border-amber-700 hover:text-amber-700 hover:bg-white cursor-pointer'>Reset</button>
                <button type='button' onClick={handleSubmit} className='bg-green-700 text-white px-4 py-3 rounded border hover:border-green-700 hover:text-green-700 hover:bg-white cursor-pointer ms-5'>Submit</button>
              </div>

            </div>
          </div>
        }

        {/* Books status */}
        {bookStatus &&
          <div className='flex flex-col mb-10 md:px-8 md:py-10 shadow-md rounded gap-5'>
            {userAddedBooks?.length > 0 ?
              userAddedBooks?.map((item, index) => (
                <div key={index} className='md:grid grid-cols-[3fr_1fr] p-6 shadow-md rounded bg-gray-200'>
                  <div className='px-3 pt-1'>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <p>{item?.author}</p>
                    <p className='text-blue-400 font-semibold'>$ {item?.dprice}</p>
                    <p>{item?.abstract}</p>
                    <div className='flex gap-2.5 mt-3'>
                      {item?.status == 'pending' ? <img src="../public/pending.png" alt="no-image" style={{ width: '80px', height: '80px' }} /> : item?.status == 'sold-out' ?
                        <img src="https://pngimg.com/d/sold_out_PNG14.png" alt="no-image" style={{ width: '80px', height: '80px' }} /> :
                        <img src="https://img.pikbest.com/png-images/20250324/round-green-rubber-stamp-with-approved-_11624560.png!w700wp" alt="no-image" style={{ width: '80px', height: '80px' }} />
                      }

                    </div>
                  </div>
                  <div className='px-3 pt-1 md:mt-0 mt-5'>
                    <img src={item?.imageUrl} alt="no-image" className='w-full h-70' />
                    <div className='mt-5 flex justify-end'>
                      <button type='button' onClick={() => handleDelete(item?._id)} className='px-5 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-white hover:text-red-500 border hover:border-red-500'>Delete</button>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no books" className='w-56' />
              </div>}
          </div>
        }

        {/* Purchase History */}
        {purchaseStatus &&
          <div className='mb-10 md:px-8 md:py-10 shadow-md rounded gap-5'>
            {userBroughtBooks?.length > 0 ?
              userBroughtBooks?.map((item) => (
                <div className='md:grid grid-cols-[3fr_1fr] p-6 shadow-md rounded bg-gray-200'>
                  <div className='px-3 pt-1'>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <p>{item?.author}</p>
                    <p className='text-blue-400 font-semibold'>$ {item?.dprice}</p>
                    <p>{item?.abstract}</p>
                  </div>
                  <div className='px-3 pt-1 md:mt-0 mt-5'>
                    <img src={item?.imageUrl} alt="no-image" className='w-full h-70' />
                    <div className='mt-5 flex justify-end'>
                      <button className='px-5 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-white hover:text-red-500 border hover:border-red-500'>Delete</button>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no books" className='w-56' />
              </div>
            }
          </div>
        }

      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Profile