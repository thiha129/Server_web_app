import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    id_TaiKhoan: {
      type: String,
      require: true,
    },
    tieuDe: {
      type: String,
      require: true,
    },
    noiDung: {
      type: String,
      require: true,
    },
    maDonHang: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
// schema.index({ createdAt: 'text' })
export const ThongBaoModal = mongoose.model("thongbao", schema);
