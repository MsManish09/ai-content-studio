import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteIndividualHistory, generateContent, getHistory } from "../api/generationAPI.js"


// initial state
const initialState = {
    generations: {
        data: [],
        page: 1,
        totalPages: 1
    },
    isGenerating:false,
    isLoadingHistory:false,
    isDeleting:false,
    isLoadingMore:false,
    error:null,
    currentResponse: null
}

// get generation history Thunk
export const historyThunk = createAsyncThunk(
    'generation/history',
    async(page = 1, thunkAPI)=>{

        try {
            const res = await getHistory(page)
            
            return res 
        } catch (error) {
            
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'History data unavailable'
            )

        }

    }
)

// generate content Thunnk
export const generateThunk = createAsyncThunk(
    'generation/generate',
    async(data, thunkAPI)=>{

        try {
            const res = await generateContent(data)
            console.log('Generation thunk | response: ', res)
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Content generation failed, try again'
            )
        }

    }

)

export const deleteIndividualHistoryThunk = createAsyncThunk(
    'generation/delete',
    async(id, thunkAPI)=>{

        try {
            
            const res = await deleteIndividualHistory(id)
            return { _id: id }   // return id to filter it out of the genration array

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'deletion failed'
            )
        }

    }
)


const generationSlice = createSlice({
    name: 'generation',
    initialState,
    reducers :{
        // on user logout
        clearGenerationState: (state)=>{
            state.generations = {
                data: [],
                page: 1,
                totalPages: 1
            }
            state.isGenerating = false
            state.isLoadingHistory = false
            state.isDeleting = false
            state.isLoadingMore = false
            state.error = null
            state.currentResponse = null
        } 
    },
    extraReducers: (builder)=>{
        builder
        // get history thunk
        .addCase(historyThunk.pending, (state)=>{
            state.isLoadingHistory = true
        })
        .addCase(historyThunk.fulfilled, (state, action)=>{
            state.isLoadingHistory = false
            state.generations.data = action.payload.data
            state.generations.page = action.payload.page
            state.generations.totalPages = action.payload.totalPages
        })
        .addCase(historyThunk.rejected, (state, action)=>{
            state.isLoadingHistory = false
            state.error = action.payload
        })
        // generatioon thunk
        .addCase(generateThunk.pending, (state)=>{
            state.isGenerating = true
        })
        .addCase(generateThunk.fulfilled, (state, action)=>{
            state.isGenerating = false
            console.log('generation thunk fulfilled | action.payload.data: ', action.payload.data)
            state.currentResponse = action.payload.data
            state.generations.data.unshift(action.payload.data)
            
        })
        .addCase(generateThunk.rejected, (state, action)=>{
            state.isGenerating = false
            state.error = action.payload
        })
        // history deletion thunk
        .addCase(deleteIndividualHistoryThunk.pending, (state)=>{
            state.isDeleting = true
        })
        .addCase(deleteIndividualHistoryThunk.fulfilled, (state, action)=>{
            state.isDeleting = false
            state.generations.data = state.generations.data.filter(
                item => item._id !== action.payload._id
            )
        })
        .addCase(deleteIndividualHistoryThunk.rejected, (state, action)=>{
            state.isDeleting = false
            state.error = action.payload
        })
        
    }
})

export const { clearGenerationState } = generationSlice.actions
export default generationSlice.reducer