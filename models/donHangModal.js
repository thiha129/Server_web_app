import mongoose from 'mongoose'
const { Schema } = mongoose
const sanpham = new Schema({
    id_SanPham: {
        type: String,
        require: true,
        ref: 'Sanpham'
    },
    soLuong: {
        type: Number,
        require: true
    }
},
    { timestamps: true }
);
const schema = new Schema({
    id_TaiKhoan: {
        type: String,
        require: true,
        ref: 'User'
    },
    id: Schema.Types.ObjectId,
    phiVanChuyen: {
        type: Number,
        require: true
    },
    trangThai: {
        type: String,
        require: true,
    },
    maDonHang: {
        type: String,
        require: true
    },
    maSanPham: [sanpham]
},
    { timestamps: true }
);
export const DonHangModal = mongoose.model('donhang', schema)