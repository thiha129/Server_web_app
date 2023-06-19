import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({

    taiKhoan: {
        required: true,
        type: String
    },
    matKhau: {
        required: true,
        type: String
    }
},
    { timestamps: true }
);
export const AdminModal = mongoose.model('admin', schema)
