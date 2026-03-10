
import axiosInstance from './axiosInstance.js'

export async function loginUser(data){
    
    const res = await axiosInstance.post('/auth/login', data)
    return res.data
}