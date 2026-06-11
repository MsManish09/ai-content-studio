import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteIndividualHistory, generateContent, getHistory } from "../api/generationAPI.js"


// initial state
const initialState = {
    generations: {
        data: [],
        page: 1,
        totalPages: 1
    },
    recentGenerations:[],
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
    async({id, page}, thunkAPI)=>{

        try {
            
            // call delete api
            await deleteIndividualHistory(id)

            const state = thunkAPI.getState()

            // - 1 -> current delted geneation
            const items = state.generation.generations.data.length

            if( items === 1 && page > 1){
                thunkAPI.dispatch(
                    historyThunk(page-1)
                )
            }


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
        } ,

        populateRecentGenerations: (state, action)=>{
            console.log('populate recent generations reducer | action.payload ', action.payload)
            state.recentGenerations = action.payload
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

            // populate recent generations
             // populate sidebar cache
            if(action.payload.page === 1){
                state.recentGenerations = action.payload.data.slice(0,20)
            }
        })
        .addCase(historyThunk.rejected, (state, action)=>{
            state.isLoadingHistory = false
            state.error = action.payload
        })
        // generatioon thunk
        .addCase(generateThunk.pending, (state)=>{
            state.isGenerating = true
            state.error = null
        })
        .addCase(generateThunk.fulfilled, (state, action)=>{
            state.isGenerating = false
            state.currentResponse = action.payload.data

            // populate the new generation into the generations list
            state.generations.data.unshift(action.payload.data)

            // populate the new generaton into the recent generatiosn list
            state.recentGenerations.unshift(action.payload.data)
            // when recentGenertion > 20 -> remove last item
            if(state.recentGenerations.length > 20){
                state.recentGenerations.pop()
            }
            
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

            // update history page immediately
            state.generations.data = state.generations.data.filter(
                item => item._id !== action.payload._id
            )

            // update sidebar history section
            state.recentGenerations = state.recentGenerations.filter(
                item => item._id !== action.payload._id
            )
        })
        .addCase(deleteIndividualHistoryThunk.rejected, (state, action)=>{
            state.isDeleting = false
            state.error = action.payload
        })
        
    }
})

export const { clearGenerationState, populateRecentGenerations } = generationSlice.actions
export default generationSlice.reducer