import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    tenUser: {
      type: String,
      required: true,
    },
    soDienThoai: {
      type: Number,
      required: true,
    },
    ngaySinh: {
      type: Date,
      required: true,
    },
    matKhau: {
      type: String,
      required: true,
    },
    anhDaiDien: {
      type: String,
      required: true,
    },
    soDuong: {
      type: String,
      required: true,
    },
    thanhPho: {
      type: String,
      required: true,
    },
    quan: {
      type: String,
      required: true,
    },
    xa: {
      type: String,
      required: true,
    },
    id: Schema.Types.ObjectId,
  },
  { timestamps: true }
);
export const AccountModel = mongoose.model("User", schema);
