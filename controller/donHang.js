import { DonHangModal } from "../models/DonHangModal.js";
import { ThongBaoModal } from "../models/thongBaoModal.js";
import { CartModel } from "../models/cartModel.js";
import { SanphamModel } from "../models/sanPhamModal.js";
import mongoose from "mongoose";

export const _themDonHang = async (req, res) => {
  try {
    const maDonHang = "TD";
    const data = await DonHangModal.find().sort({ created_at: -1 });
    if (data.length != 0) {
      const add = new DonHangModal({
        id_TaiKhoan: req.body.id_Account,
        phiVanChuyen: 0,
        maSanPham: req.body.maSanPham,
        trangThai: 1,
        maDonHang:
          maDonHang +
          parseInt(
            parseInt(
              String(data[data.length - 1].maDonHang).replace("TD", "")
            ) + 1
          ),
        id: new mongoose.Types.ObjectId(),
      });
      const addnoti = new ThongBaoModal({
        id_TaiKhoan: req.body.id_Account,
        tieuDe: "Đặt hàng thành công",
        noiDung: "Đơn hàng của bạn đang chờ xác nhận",
        maDonHang:
          maDonHang +
          parseInt(
            parseInt(
              String(data[data.length - 1].maDonHang).replace("TD", "")
            ) + 1
          ),
      });
      addnoti.save();
      add.save();
    } else {
      const add = new DonHangModal({
        id_TaiKhoan: req.body.id_Account,
        phiVanChuyen:0,
        maSanPham: req.body.maSanPham,
        trangThai: 1,
        maDonHang: "TD1",
        id: new mongoose.Types.ObjectId(),
      });
      add.save();
    }
    const deleteCart = await CartModel.deleteMany({
      id_TaiKhoan: req.body.id_Account,
    });
    const find = await DonHangModal.findOne({
      id_TaiKhoan: req.body.id_Account,
    })
      .populate("maSanPham")
      .populate({
        path: "maSanPham",
        populate: { path: "id_SanPham" },
      })
      .sort({
        createdAt: -1,
      });
    res.status(200).send({ checkpayment: find._id });
  } catch (error) {
    res.status(200).send({ checkpayment: 2 });
  }
};

export const _getDonHang = async (req, res) => {
  try {
    const find = await DonHangModal.find({ id_TaiKhoan: req.body.iduser })
      .populate("maSanPham")
      .populate({
        path: "maSanPham",
        populate: { path: "id_SanPham" },
      })
      .sort({
        createdAt: -1,
      });
    console.log("_getDonHang", req.body);

    res.status(200).json({ check: find });
  } catch (error) {
    console.log("123");
  }
};
export const _getAllDonHang = async (req, res) => {
  try {
    const find = await DonHangModal.find()
      .populate("id_TaiKhoan")
      .populate("maSanPham")
      .populate({
        path: "maSanPham",
        populate: { path: "id_SanPham" },
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).send(find);
  } catch (error) {
    console.log("123");
  }
};
export const _thayDoiTrangThai = async (req, res) => {
  try {
    if (req.body.trangThai == 2) {
      const update = await DonHangModal.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          trangThai: req.body.trangThai,
          phiVanChuyen: parseInt(req.body.phiVanChuyen),
        },
        { new: true, useFindAndModify: false }
      );
      console.log("[_thayDoiTrangThai]");
      res.status(200).send({ checked: update });
    } else {
      const update = await DonHangModal.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          trangThai: req.body.trangThai,
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).send({ checked: update });
    }
  } catch (error) {}
};
export const _DeleteOrderUser = async (req, res) => {
  console.log("i",req.body._id);
  console.log("trangthaii",req.body.trangThai);
  try {
    const update = await DonHangModal.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        trangThai: req.body.trangThai,
      },
      { new: true, useFindAndModify: false }
    );
    const id_User = await DonHangModal.findOne({ _id: req.body._id });
    console.log("id_User", id_User.id_TaiKhoan);
    const addnoti = new ThongBaoModal({
      id_TaiKhoan: id_User.id_TaiKhoan,
      tieuDe: "Hủy đơn hàng thành công",
      noiDung: "Đơn hàng của bạn đã bị hủy",
      maDonHang: id_User.maDonHang,
    });
    addnoti.save();
  } catch (error) {
    console.log(error);
  }
};
