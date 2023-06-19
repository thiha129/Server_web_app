import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new mongoose.Schema(
  {
    id: Schema.Types.ObjectId,
    tieuDe: {
      type: String,
      require: true,
    },
    gioiThieu: {
      type: String,
      require: true,
    },
    hinhAnh: {
      type: String,
      require: true
    },
    noiBat: {
      type: Boolean,
      require: true
    }
  },
  { timestamps: true }
);

export const BaiVietModal = mongoose.model("baiviet", schema);
