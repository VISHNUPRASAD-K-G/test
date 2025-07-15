import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <>
      <div className='bg-gray-800 text-white md:p-10 p-5 py-10 md:grid grid-cols-3'>
        <div>
          <h3 className='text-2xl'>ABOUT US</h3>
          <p className='mt-3 text-justify' style={{fontSize:'13px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nesciunt consequatur quidem magnam explicabo veritatis natus optio facere temporibus voluptatum libero exercitationem vero itaque tempore, laborum aperiam! Cumque, ab odit.</p>
        </div>

        <div className='md:flex justify-center md:mt-0 mt-10'>
          <div>
            <h3 className='text-2xl'>NEWSLETTER</h3>
            <p className='mt-3' style={{fontSize:'13px'}}>Stay updates with our latest trends</p>
            <div>
              <input type="text" placeholder='EmailID' className='bg-white p-2 mt-3 placeholder:text-gray-500 text-gray-500' />
              <button className='bg-amber-300 py-2 px-4 text-black hover:bg-amber-500 cursor-pointer '><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
          </div>
        </div>

        <div className='md:flex justify-center md:mt-0 mt-10'>
          <div>
             <h3 className='text-2xl'>FOLLOW US</h3>
             <p className='mt-3' style={{fontSize:'13px'}}>Let us be social</p>
             <div className='text-xl mt-3'>
              <FontAwesomeIcon icon={faInstagram} className='me-2' />
              <FontAwesomeIcon icon={faXTwitter} className='mx-2' />
              <FontAwesomeIcon icon={faFacebook} className='mx-2' />
              <FontAwesomeIcon icon={faLinkedin} className='mx-2' />
             </div>
          </div>
        </div>
      </div>
      <div className='bg-black p-5 text-white'>
        <p className='text-center' style={{fontSize:'13px'}}>Copyright © 2025 All rights reserved | This website is made by <span><FontAwesomeIcon icon={faHeart} className='text-amber-300' /></span> Vishnuprasad K G</p>
      </div>
    </>
  )
}

export default Footer