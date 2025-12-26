import mongoose, { Schema } from "mongoose"
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const WorkflowSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
})

export const UserModel = mongoose.model("User", UserSchema);