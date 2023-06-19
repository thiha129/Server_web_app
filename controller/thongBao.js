import { ThongBaoModal } from "../models/thongBaoModal.js";
import { _getDataUser } from "./account.js";

export const _getNotifi = async (req, res) => {
  try {
    const notifi = await ThongBaoModal.find({
      id_TaiKhoan: req.body.id_TaiKhoan,
    }).sort({
      createdAt: 1,
    });
    res.status(200).send({ datanoti: notifi });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
export const _addNotifi = async (req, res) => {
  try {
    const addnoti = new ThongBaoModal({
      id_TaiKhoan: req.body.id_TaiKhoan,
      tieuDe: "Đặt hàng thành công",
      noiDung: req.body.noiDung,
      maDonHang: req.body.maDonHang,
    });
    addnoti.save();
    res.status(200).send({
      idUser: id_TaiKhoan,
      tieuDe: req.body.tieuDe,
      noiDung: req.body.noiDung,
    });
  } catch (error) {
    console.log("[eror]", error);
  }
};
