import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
    imgBanner: {
        type: String,
        required: true,
    },
    linkVideo: {
        type: String,
        required: true
    },
    idADM: {
        type: String,
        required: true
    },
    sliderApp: {
        type: Array,
        require: true
    },
    manHinhChao: {
        type: String,
        require: true
    },
    tieuDe: {
        type: String,
        require: true
    },
    noiDung: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);
export const OptionModal = mongoose.model('Quangcao', schema)
