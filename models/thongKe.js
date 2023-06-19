import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    tenSanPham: {
        type: String,
        required: true,
    },
    id_SanPham: {
        type: String,
        required: true
    },
    soLuongBan: {
        type: Number,
        required: true,
    },
    tongGia: {
        type: Number,
        required: true,
    }

},
    { timestamps: true }
);
export const ThongKeModal = mongoose.model('Thongke', schema)
