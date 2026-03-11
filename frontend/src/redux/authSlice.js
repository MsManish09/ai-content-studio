
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser } from "../api/authAPI.js";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true, 
}

// login thunk
export const loginThunk = createAsyncThunk(
    "auth/login",
    async(data, thunkAPI)=>{

        try {
            const res = await loginUser(data)
            return res

        } catch (error) {
            
            return thunkAPI.rejectWithValue(
                error.message
            )
        }

    }
)

// getme thrunk
export const getMeThunk = createAsyncThunk(
    "auth/me",
    async(arg, thunkAPI)=>{

        try {
            const res = await getCurrentUser()
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error
            )
        }

    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{

        logout: (state)=>{
            state.user = null
            state.isAuthenticated = false

        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginThunk.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
        })
        .addCase(loginThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(getMeThunk.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(getMeThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
            state.isCheckingAuth = false   // done checking
        })
        .addCase(getMeThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
            state.isCheckingAuth = false   //  done checking
        } )
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer