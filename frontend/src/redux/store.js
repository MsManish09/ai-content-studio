
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import generationReducer from "./generationSlice.js"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        generation: generationReducer
    }
})