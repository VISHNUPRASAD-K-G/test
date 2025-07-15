import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function Paymentsuccess() {
    return (
        <>
            <Header />
            <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
                <div>
                    <h1 className='text-4xl text-blue-600 font-semibold'>Congratulations</h1>
                    <p className='mt-10 font-semibold'>Thankyou for shopping with Bookstore. Hope you have a goog time.</p>
                    <Link to={'/all-books'}><button className='px-4 py-2 mt-10 bg-blue-600 text-white border border-blue-600 cursor-pointer hover:bg-white hover:text-blue-600'>Exoplore more books</button></Link>
                </div>
                <div>
                    <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="payment-success" className='w-3/4' />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Paymentsuccess