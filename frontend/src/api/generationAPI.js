
import axiosInstance from "./axiosInstance.js";


// funciton to call history api
export async function getHistory(){

    const res = await axiosInstance.get('/history')
    return res.data

}

// function to call content generation api
export async function generateContent(data){
    const res = await axiosInstance.post('/generate', data)
    return res.data
}

// function to delete individual generation histoy
export async function deleteIndividualHistory(id){
    const res = await axiosInstance.delete(`/history/${id}`)
    return res.data
}