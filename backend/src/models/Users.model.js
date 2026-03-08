import mongoose from 'mongoose'


// create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: { 
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true, 
        index: true , // makes lookup faster -> by preventing scanning entire collecion
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"] // email validation
    },

    password: { 
        type: String,
        minlength: 6 
    },

    googleId: {
        type: String, 
        default: null,
        index: true
    },

    plan: {
        type: String,
        enum: ['free', 'pro'], // plan options
        default: 'free'
    },

    usageCount: {
        type: Number, 
        default: 0
    },

    tokensUsedToday:{
        type: Number,
        default: 0
    },

    totalTokensUsed: {
        type: Number, 
        default: 0
    },

    usageDate: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

// create model
export const UserModel = mongoose.model('User', userSchema)

