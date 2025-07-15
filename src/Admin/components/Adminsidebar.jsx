import { faBagShopping, faBars, faBook, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/Contextshare'

function Adminsidebar() {
    // const [sideBarContet, setSideBarContent] = useState(false)
    const navigate = useNavigate()
    const [homeStatus, setHomeStatus] = useState(false)
    const [booksStatus, setBooksStatus] = useState(false)
    const [careerStatus, setCareerStatus] = useState(false)
    const [settingStatus, setSettingStatus] = useState(false)
    const [details, setdetails] = useState({
        profile: '',
        username: ''
    })
    console.log(details);

    const {adminProfileUpdateStatus} = useContext(adminProfileUpdateStatusContext)

    const filter = (data) => {
        if (data == 'home') {
            navigate('/admin-home')
        }
        else if (data == 'books') {
            navigate('/admin-books')
        }
        else if (data == 'careers') {
            navigate('/admin-careers')
        }
        else if (data == 'settings') {
            navigate('/admin-settings')
        }
        else {
            navigate('*')
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            let user = JSON.parse(sessionStorage.getItem('existingUser'))
            setdetails({ profile: user.profile, username: user.username })
        }
    }, [adminProfileUpdateStatus])

    useEffect(() => {
        console.log();
        if (location.pathname == '/admin-home') {
            setHomeStatus(true)
        }
        else if (location.pathname == '/admin-books') {
            setBooksStatus(true)
        }
        else if (location.pathname == '/admin-careers') {
            setCareerStatus(true)
        }
        else if (location.pathname == '/admin-settings') {
            setSettingStatus(true)
        }

    }, [])
    return (
        <div className='bg-gray-200 w-full h-fit md:h-screen  flex items-center flex-col'>
            <div className='my-10'>
                <img src={details.profile ==''?"https://openclipart.org/image/2000px/247319":`${serverUrl}/imgUpload/${details.profile}`} alt="usr-profile" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />
            </div>

            <h1 className='text-2xl md:mb-10 mb-5'>{details.username}</h1>

            {/* <span onClick={()=>setSideBarContent(!sideBarContet)} className='md:hidden inline'><FontAwesomeIcon icon={faBars} className='mb-10 fa-2x' /></span> */}

            <div>
                <div className="mb-4" onClick={() => filter('home')}>
                    <input type="radio" id='home' className='me-3' name='path' readOnly checked={homeStatus} />
                    <label htmlFor="home"><FontAwesomeIcon icon={faBars} className='me-3' />Home</label>
                </div>
                <div className="mb-4" onClick={() => filter('books')}>
                    <input type="radio" id='books' className='me-3' name='path' readOnly checked={booksStatus} />
                    <label htmlFor="books"><FontAwesomeIcon icon={faBook} className='me-3' />Books</label>
                </div>
                <div className="mb-4" onClick={() => filter('careers')}>
                    <input type="radio" id='careers' className='me-3' name='path' readOnly checked={careerStatus} />
                    <label htmlFor="careers"><FontAwesomeIcon icon={faBagShopping} className='me-3' />Careers</label>
                </div>
                <div className="mb-4" onClick={() => filter('settings')}>
                    <input type="radio" id='settings' className='me-3' name='path' readOnly checked={settingStatus} />
                    <label htmlFor="settings"><FontAwesomeIcon icon={faGear} className='me-3' />Settings</label>
                </div>
            </div>

            {/* { sideBarContet &&
                <div className='md:hidden block pb-7'>
                    <div className="mb-4">
                        <input type="radio" id='home' className='me-3' name='path' />
                        <label htmlFor="home"><FontAwesomeIcon icon={faBars} className='me-3' />Home</label>
                    </div>
                    <div className="mb-4">
                        <input type="radio" id='books' className='me-3' name='path' />
                        <label htmlFor="books"><FontAwesomeIcon icon={faBook} className='me-3' />Books</label>
                    </div>
                    <div className="mb-4">
                        <input type="radio" id='careers' className='me-3' name='path' />
                        <label htmlFor="careers"><FontAwesomeIcon icon={faBagShopping} className='me-3' />Careers</label>
                    </div>
                    <div className="mb-4">
                        <input type="radio" id='settings' className='me-3' name='path' />
                        <label htmlFor="settings"><FontAwesomeIcon icon={faGear} className='me-3' />Settings</label>
                    </div>
                </div>
            } */}

        </div>
    )
}

export default Adminsidebar