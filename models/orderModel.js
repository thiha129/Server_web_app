import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    id_Account: {
        type: String,
        required: true
    },
    id_SanPham: {
        type: Array,
        required: true
    },
    diaChi: {
        type: Object,
        required: true
    }
}, { timestamps: true })

export const OrderModel = mongoose.model('Order', schema)