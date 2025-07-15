import React, { createContext, useState } from 'react'

// create
export const adminProfileUpdateStatusContext = createContext({})

function Contextshare({children}) {

    // data to be shared
    const [adminProfileUpdateStatus, setadminProfileUpdateStatus] = useState({})
  return (
    <adminProfileUpdateStatusContext.Provider value = {{adminProfileUpdateStatus, setadminProfileUpdateStatus}}>
        {children}
    </adminProfileUpdateStatusContext.Provider>
  )
}

export default Contextshare