import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landingpage from './pages/Landingpage'
import Auth from './pages/Auth'
import Allbooks from './Users/pages/Allbooks'
import Careers from './Users/pages/Careers'
import Contact from './Users/pages/Contact'
import Viewbook from './Users/pages/Viewbook'
import Profile from './Users/pages/Profile'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import Adminhome from './Admin/pages/Adminhome'
import Adminbooks from './Admin/pages/Adminbooks'
import Admincareers from './Admin/pages/Admincareers'
import Adminsettings from './Admin/pages/Adminsettings'
import Paymentsuccess from './Users/pages/Paymentsuccess'
import Paymenterror from './Users/pages/Paymenterror'
// import { ToastContainer } from 'react-toastify'

function App() {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 5000)
  }, [])

  return (
    <>
      <Routes>
        {/* path for users */}
        <Route path='/' element={isLoading ? <Landingpage /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />

        <Route path='/all-Books' element={<Allbooks />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/view-book/:id' element={<Viewbook />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment-success' element={<Paymentsuccess />} />
        <Route path='/payment-error' element={<Paymenterror />} />


        {/* path for admin */}
        <Route path='/admin-home' element={<Adminhome />} />
        <Route path='/admin-books' element={<Adminbooks />} />
        <Route path='/admin-careers' element={<Admincareers />} />
        <Route path='/admin-settings' element={<Adminsettings />} />




        <Route path='*' element={<Pagenotfound />} />
      </Routes>
      {/* <ToastContainer position='top-center' theme='colored' autoClose={2000} /> */}

    </>
  )
}

export default App
