import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteIndividualHistory, generateContent, getHistory } from "../api/generationAPI.js"


// initial state
const initialState = {
    generations: [],
    loading: false,
    error: null,
    currentResponse: null
}

// get generation history Thunk
export const historyThunk = createAsyncThunk(
    'generation/history',
    async(_, thunkAPI)=>{

        try {
            const res = await getHistory()
            
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
            state.generations = []
            state.loading = false
            state.error = null
            state.currentResponse = null
        } 
    },
    extraReducers: (builder)=>{
        builder
        // get history thunk
        .addCase(historyThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(historyThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.generations = action.payload
        })
        .addCase(historyThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(generateThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(generateThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.currentResponse = action.payload
        })
        .addCase(generateThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        // history deletion thunk
        .addCase(deleteIndividualHistoryThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteIndividualHistoryThunk.fulfilled, (state, action)=>{
            
            state.loading = false
            state.generations = state.generations.data.filter(
                item => item._id !== action.payload._id
            )
        })
        .addCase(deleteIndividualHistoryThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        
    }
})

export const { clearGenerationState } = generationSlice.actions
export default generationSlice.reducer