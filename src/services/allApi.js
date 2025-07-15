// register api

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async(reqBody)=>{
    return commonApi('POST', `${serverUrl}/register`, reqBody)
}

export const loginApi = async(reqBody) =>{
    return commonApi('POST', `${serverUrl}/login`, reqBody)
}

export const googleLoginApi = async(reqBody) =>{
    return commonApi('POST', `${serverUrl}/google-login`, reqBody)
}

// ---------------------------------------------------------
//                          Users

export const addBookApi = async(reqBody, reqHeader)=>{
    return commonApi('POST', `${serverUrl}/add-book`, reqBody, reqHeader)
}


// api to home books
export const homeBookApi = async()=>{
    return commonApi('GET', `${serverUrl}/home-books` )
}

// api to get all books to user
export const allBooksUserApi = async(reqHeader, searchKey)=>{
    return commonApi('GET', `${serverUrl}/all-books-user?search=${searchKey}`, "", reqHeader)
}

// api to view a book
export const viewBookApi = async(id)=>{
    return commonApi('GET', `${serverUrl}/view-book/${id}` )
}

// api to get all user added book
export const allUserAddedBooksApi = async(reqHeader)=>{
    return commonApi('GET', `${serverUrl}/all-user-added-books`, "", reqHeader)
}


// api to get all brought added book
export const allUserbroughtBooksApi = async(reqHeader)=>{
    return commonApi('GET', `${serverUrl}/all-user-brought-books`, "", reqHeader)
}

// api to delete a particular book
export const deleteABookApi = async(id)=>{
    return commonApi('DELETE', `${serverUrl}/delete-book/${id}`)
}

// view jobs
export const getAllJobsApi = async(searchKey)=>{
    return commonApi('GET', `${serverUrl}/all-jobs?search=${searchKey}`)
}

// api to add application
export const addApplicationApi = async(reqBody, reqHeader)=>{
    return commonApi('POST', `${serverUrl}/add-application`, reqBody, reqHeader)
}

// api to edit profile
export const editProfileApi = async(reqBody, reqHeader)=>{
    return await commonApi('PUT', `${serverUrl}/edit-profile`, reqBody, reqHeader)
}

// ---------------------------------------------------------
//                          Admin


// api to view books

export const getAllBookAdminApi = ()=>{
    return commonApi('GET',  `${serverUrl}/all-books-admin`)
}



// api to approve books
export const approveBooksApi = async(id)=>{
    return commonApi('PUT',  `${serverUrl}/approve-books/${id}`)
}

export const allUserApi = async()=>{
    return commonApi('GET',`${serverUrl}/all-users` )
}

//  add job admin
export const addJobApi = async(reqBody)=>{
    return commonApi('POST', `${serverUrl}/add-job`, reqBody)
}

// delete a job
export const deleteAJobApi = async(id)=>{
    return commonApi('DELETE',`${serverUrl}/delete-job/${id}`)
}

// get all applications
export const getAllApplicationApi = async()=>{
    return await commonApi('GET', `${serverUrl}/all-applications`)
}