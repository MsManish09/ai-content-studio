
import mongoose from "mongoose";

// reference relationshiip -> user._id
const generationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference
        ref: "User",
        required: true

    },

    prompt: {
        type: String, 
        required: true
    },

    template: {
        type: String, 
        enum: ["blog", "instagram", "linkedin"],
        required: true
    },

    result: {
        type: String
    },

    tokensUsed: {
        type: Number
    },

    model: {
        type: String,
        default: "gpt-4o-mini"
    }

}, {timestamps: true})

// create model
export const generationModel =  mongoose.model('Generation', generationSchema)
