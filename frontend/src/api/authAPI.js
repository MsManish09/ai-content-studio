
import axiosInstance from './axiosInstance.js'

// function to call login api
export async function loginUser(data){
    
    const res = await axiosInstance.post('/auth/login', data) // data -> request body
    return res.data
}

// function to call logout api
export async function logoutUser(){
    const res = await axiosInstance.post('/auth/logout')
    return res.data
}

// call registration api
export async function registerUser(data){
    
    const res = await axiosInstance.post('/auth/register', data) // data -> request body
    console.log('auth api registerUser | respoonse: ', res)
    return res.data

}

// call get me api
export async function getCurrentUser(){
    const res = await axiosInstance.get('/auth/me')
    return res.data
}