import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faLocationDot, faMailBulk, faMailReply, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  return (
    <>
      <Header />
      <div className='md:grid grid-cols-[1fr_5fr_1fr] py-10 md:px-0 px-5'>
        <div></div>
        <div>
          <div className=''>
            <h1 className='text-3xl text-center'>Contacts</h1>
            <p className='px-3 mt-4 md:text-center text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quidem totam veniam! Quasi, ullam? Quasi voluptatibus libero officia provident esse dolor optio sequi, fugiat quae dignissimos nemo eligendi adipisci rem.
            Excepturi explicabo quidem consectetur similique tenetur expedita, esse quibusdam quaerat consequatur, nemo iste dolores fuga.</p>
          </div>

          <div className='md:flex justify-between my-7 md:px-0 px-10'>
            <div className='flex items-center md:mt-0 mt-5'>
              <div className='bg-gray-200 flex items-center justify-center' style={{width:'50px', height:'50px', borderRadius:'50%', fontSize:'25px'}}>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <p className='ms-3' style={{fontSize:'15px'}}>123 Main Street, Apt 4b <br />Anytown, CA 91234</p>
            </div>

            <div className='flex items-center md:mt-0 mt-10'>
              <div className='bg-gray-200 flex items-center justify-center' style={{width:'50px', height:'50px', borderRadius:'50%', fontSize:'25px'}}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <p className='ms-3' style={{fontSize:'15px'}}>+91 1234567890</p>
            </div>

            <div className='flex items-center md:mt-0 my-10'>
              <div className='bg-gray-200 flex items-center justify-center' style={{width:'50px', height:'50px', borderRadius:'50%', fontSize:'25px'}}>
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
              </div>
              <p className='ms-3' style={{fontSize:'15px'}}>BookStore@gmail.com</p>
            </div>
          </div>

          <div className='md:grid grid-cols-2 my-7 '>
            <div className='w-full md:px-8'>
              <div className='bg-gray-200 w-full p-5 md:p-7 rounded'>
                <h5 className='font-bold text-center'>Send me Message</h5>
                <input type="text" placeholder='Name' className='p-2 bg-white border border-gray-200 w-full rounded mt-7 mb-3' />
                <input type="text" placeholder='Email ID' className='p-2 bg-white border border-gray-200 w-full rounded mb-3' />
                <textarea name="" id="" placeholder='message' rows={'6'} className='p-2 bg-white border border-gray-200 w-full rounded mb-3' ></textarea>
                <button className='w-full mt-3 p-2 bg-gray-800 text-white rounded border hover:border-gray-800 hover:bg-white hover:text-black cursor-pointer'>Send<FontAwesomeIcon icon={faPaperPlane} className='ms-2' /></button>
              </div>
            </div>
            <div className='md:mt-0 mt-10'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2342833.473856773!2d78.10708883090064!3d11.920338740993591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749620099674!5m2!1sen!2sin" height="450"  style={{border:'0'}} className='md:px-10 w-full' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  )
}

export default Contact