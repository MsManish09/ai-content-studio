import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getHistory } from "../api/generationAPI"


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
        
    }
})

export const { clearGenerationState } = generationSlice.actions
export default generationSlice.reducer