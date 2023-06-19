import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = new Schema({
    hinhAnhSP: {
        type: Array,
        required: true,
    },
    tenSP: {
        type: String,
        required: true,
    },
    giaSP: {
        type: Number,
        required: true
    },
    giaSaleSP: {
        type: Number,
        required: true
    },
    ngayHetHan: {
        type: Date,
        required: true,
    },
    ngaySanXuat: {
        type: Date,
        required: true,
    },
    thongTinSP: {
        type: String,
        required: true,
    },
    id: Schema.Types.ObjectId,
    checkBanChay: {
        type: Boolean,
        required: true
    },
    daBan: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },


},
    {
        timestamps: true,
    }
);
schema.index({ tenSP: 'text' })
export const SanphamModel = mongoose.model('Sanpham', schema)
