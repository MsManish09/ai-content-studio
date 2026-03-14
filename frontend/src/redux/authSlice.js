
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authAPI.js";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true, 
}

// register thunk
export const registerThunk = createAsyncThunk(
    'auth/register',
    async(data, thunkAPI)=>{

        try {
            await registerUser(data)
            return true
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            )
        }

    }
)

// login thunk
export const loginThunk = createAsyncThunk(
    "auth/login",
    async(data, thunkAPI)=>{

        try {
            const res = await loginUser(data)
            return res

        } catch (error) {
            
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
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
                error.response?.data?.message
            )
        }

    }
)

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async(arg, thunkAPI)=>{
        try {
            const res = await logoutUser()
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Logout Unsuccessful'
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
            state.user = action.payload.user
            state.isAuthenticated = true
        })
        .addCase(loginThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
         // getMeThunk
        .addCase(getMeThunk.pending, (state)=>{
            state.isCheckingAuth = true
            state.error = null
        })
        .addCase(getMeThunk.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload.user
            state.isAuthenticated = true
            state.isCheckingAuth = false   // done checking
        })
        .addCase(getMeThunk.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
            state.isCheckingAuth = false   //  done checking
        } )
        // logoutThunk
        .addCase(logoutThunk.pending, (state)=>{
            state.loading = true
        })
        .addCase(logoutThunk.fulfilled, (state)=>{
            state.user = null
            state.isAuthenticated = false
            state.error = null
            state.loading = false
            state.isCheckingAuth = false
        })
        .addCase(logoutThunk.rejected, (state, action)=>{
            state.error = action.payload
        })
        // registerThunk
        .addCase(registerThunk.fulfilled, (state)=>{
            state.loading=false
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer