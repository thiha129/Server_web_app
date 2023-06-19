import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    id_TaiKhoan: {
        type: String,
        required: true,
    },
    id_SanPham: {
        type: String,
        required: true,
        ref: "Sanpham"
    },
    soLuong: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    }
);
export const CartModel = mongoose.model('cart', schema)
