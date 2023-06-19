import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},
    { timestamps: true }
);
export const UserDBModel = mongoose.model('UserDB', schema)
