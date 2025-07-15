import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'


function Paymenterror() {
    return (
        <>
            <Header />
            <div className='grid md:grid-cols-2 p-40 justify-center items-center'>
                <div>
                    <h1 className='text-4xl text-red-600 font-semibold'>Sorry! Your Payment is Unsuccessful</h1>
                    <p className='mt-10 font-semibold'>We Apologize for the inconvience caused and appreciate your visit to Bookstore.</p>
                    <Link to={'/all-books'}><button className='px-4 py-2 mt-10 bg-blue-600 text-white border border-blue-600 cursor-pointer hover:bg-white hover:text-blue-600'>Exoplore more books</button></Link>
                </div>
                <div className='flex md:justify-center justify-center md:mt-0 mt-5'>
                    <img src="https://cdn.dribbble.com/userupload/23003310/file/original-6396208ee0571627a9e2e9987dcc1974.gif" alt="payment-success" className='w-3/4' />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Paymenterror