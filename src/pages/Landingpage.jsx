import React, { useEffect, useState } from 'react'
import Header from '../Users/components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { homeBookApi } from '../services/allApi'

function Landingpage() {
  const [allHomeBook, setAllHomeBook] = useState([])

  const getAllHomeBook = async () => {
    const result = await homeBookApi()
    setAllHomeBook(result.data)
    console.log(result)
  }
  // console.log(allHomeBook);

  useEffect(() => {
    getAllHomeBook()
  }, [])
  return (
    <>
      <Header />
      <header>
        <div className='bg-[url(https://innovationinpolitics.eu/wp-content/uploads/2020/03/jaredd-craig-HH4WBGNyltc-unsplash-1024x1536.jpg)] w-full bg-cover bg-center bg-no-repeat bg-fixed'>
          <div className='w-full grid md:grid-cols-3 min-h-[490px]' style={{ backgroundColor: 'rgba(0,0,0, 0.4)' }}>
            <div></div>
            <div className='text-white flex flex-col justify-center items-center p-5 w-full'>
              <h1 className='text-5xl'>Wonderful Gifts</h1>
              <p>Give your family and friends a book</p>
              <div className='w-full flex mt-10 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white rounded-3xl overflow-hidden'>
                <input type="text" placeholder='Search books' className='w-full py-2 focus:outline-none px-4 bg-white placeholder:text-gray-400 text-black' />
                <button type='button' className='text-center py-2 px-4 bg-white text-blue-800 cursor-pointer hover:bg-amber-100'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>
      {/* NEW ARRIVALS */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>NEW ARRIVALS</h2>
        <h4 className='text-2xl'>Explore Our Latest Collection</h4>
        {allHomeBook?.length > 0 ?
          <div className='md:grid grid-cols-4 w-full mt-5'>
            {allHomeBook?.map((item, index) => (
              <div key={index} className="p-3">
                <div className="p-3 shadow-md">
                  <img src={item.imageUrl} alt="no-image" style={{ width: '100%', height: '300px' }} />
                  <div className='flex justify-center items-center flex-col mt-3'>
                    <p className='text-blue-700'>{item.title}</p>
                    <h3>{item.author}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="p-3">
            <div className="p-3 shadow-md">
              <img src="https://m.media-amazon.com/images/I/81KGjsBXQ7L.jpg" alt="no-image" style={{width:'100%', height:'300px'}} />
              <div className='flex justify-center items-center flex-col mt-3'>
                <p className='text-blue-700'>Michelle Obama</p>
                <h3>Becoming</h3>
                <p>$23</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="p-3 shadow-md">
              <img src="https://m.media-amazon.com/images/I/81MArWaiw1L._AC_UF1000,1000_QL80_.jpg" alt="no-image" style={{width:'100%', height:'300px'}} />
              <div className='flex justify-center items-center flex-col mt-3'>
                <p className='text-blue-700'>Rhonda Byrne</p>
                <h3>The Secret</h3>
                <p>$28</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="p-3 shadow-md">
              <img src="https://m.media-amazon.com/images/I/81Dky+tD+pL.jpg" alt="no-image" style={{width:'100%', height:'300px'}} />
              <div className='flex justify-center items-center flex-col mt-3'>
                <p className='text-blue-700'>Morgan Housel</p>
                <h3>The Psychology...</h3>
                <p>$23</p>
              </div>
            </div>
          </div> */}

          </div>
          :
          <p className='text-blue-950 animate-pulse my-10 text-center'>Loading...</p>
        }
        <Link to={'/all-Books'}><button className='bg-blue-900 py-2 px-3 border border-blue-900 hover:bg-white hover:text-black cursor-pointer text-white mt-4'>Explore More</button></Link>
      </section>
      {/* Author section */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2 w-full'>
          <div>
            <div className='flex items-center justify-center flex-col'>
              <h4>FEATURED AUTHORS</h4>
              <h3 className='text-2xl'>Captivates with every word</h3>
            </div>
            <p className='mt-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque alias hic quisquam repellat, explicabo et blanditiis minima id illum voluptatem? Odit consectetur repellat rerum quidem vero earum! Vero, quo reiciendis?
              Et, nam accusamus deserunt ea aspernatur labore dolores illum maiores facilis quam! Magnam voluptates, illo aspernatur reiciendis, alias modi corrupti aliquid natus, harum dicta accusamus laudantium dolorem? Est, illo unde.</p>
            <p className='mt-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque alias hic quisquam repellat, explicabo et blanditiis minima id illum voluptatem? Odit consectetur repellat rerum quidem vero earum! Vero, quo reiciendis?
              Et, nam accusamus deserunt ea aspernatur labore dolores illum maiores facilis quam! Magnam voluptates, illo aspernatur reiciendis, alias modi corrupti aliquid natus, harum dicta accusamus laudantium dolorem? Est, illo unde.</p>
          </div>

          <div className='px-10'>
            <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" alt="no-image" className='mt-8 w-full' />
          </div>
        </div>
      </section>
      {/* Testimonial */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='flex flex-col justify-center items-center'>
          <h3>TESTIMONIALS</h3>
          <h4 className='text-2xl'>See What Others Are Saying</h4>
          <img src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="no-image" className='mt-6' style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          <h5 className='mt-3'>Treesa Joseph</h5>
          <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem reiciendis pariatur eligendi expedita explicabo laborum necessitatibus veritatis, molestiae quam, qui quae rerum consectetur eum velit nulla dicta aut quis perspiciatis!
            Cum veniam placeat aliquid laboriosam blanditiis impedit molestias quasi, fugiat ipsum numquam, id in omnis quas. Ipsa illum laborum nostrum. Provident aut modi autem culpa earum, quae pariatur ullam cumque!</p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Landingpage