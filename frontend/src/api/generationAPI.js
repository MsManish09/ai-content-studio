
import axiosInstance from "./axiosInstance.js";


// funciton to call history api -> page default value = 1
export async function getHistory({ page=1, template= "all"}){

    const res = await axiosInstance.get(`/history?page=${page}&limit=20&template=${template}` )
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

// function to get individual generation details
export async function individualGenerationDetails(id){
    const res = await axiosInstance.get(`/history/${id}`)
    return res.data
}