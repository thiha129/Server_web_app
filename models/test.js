import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = new Schema({
    id_TaiKhoan: { type: String, require: true },
    soLuong: {
        type: String,
        required: true,
    },
    maSanPham: [{ type: Schema.Types.ObjectId, ref: 'Sanpham' }],
},
    { timestamps: true }
);
export const GioHangModal = mongoose.model('Giohang', schema)
