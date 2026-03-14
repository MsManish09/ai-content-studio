
import axiosInstance from "./axiosInstance.js";


// funciton to call history api
export async function getHistory(){

    const res = await axiosInstance.get('/history')
    return res.data

}