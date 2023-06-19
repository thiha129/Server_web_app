import twilio from "twilio";
import dotenv from "dotenv";
import { CartModel } from "../models/cartModel.js";
import { SanphamModel } from "../models/sanPhamModal.js";
import mongoose from 'mongoose';

export const _gioHang = async (req, res) => {
    try {
        const search = await CartModel.findOne({
            id_TaiKhoan: req.body.id_TaiKhoan,
            id_SanPham: req.body.id_SanPham
        })

        if (search == null) {
            const post = new CartModel({
                id_TaiKhoan: req.body.id_TaiKhoan,
                id_SanPham: req.body.id_SanPham,
                soLuong: req.body.soLuong,
            });
            post.save();
            res.status(200).send({ trangThai: 1 })
        } else {
            const update = await CartModel.findOneAndUpdate({
                id_TaiKhoan: req.body.id_TaiKhoan,
                id_SanPham: req.body.id_SanPham
            }, {
                soLuong: parseInt(req.body.soLuong) + parseInt(search.soLuong),
            }, { new: true, useFindAndModify: false });
            res.status(200).send({ trangThai: 1 })
        }
    } catch (error) {
        res.status(200).send({ trangThai: 0 })
    }
}

export const _dataCart = async (req, res) => {
    try {
        const data = await CartModel.find({ id_TaiKhoan: req.body.id_TaiKhoan }).populate('id_SanPham')
        res.status(200).send({
            data: data,
            totals: data.length,
        })

    } catch (error) {
        console.log("[dataCart]", error);
    }
}

export const _updateCart = async (req, res) => {
    console.log('idsanpham',req.body._id);
    try {
        const update = await CartModel.findByIdAndUpdate(
            { _id: req.body._id },
            {
                soLuong: req.body.soLuong,
                tongGiaBan: req.body.soLuong * req.body.giaSanPham
            },    { new: false, useFindAndModify: false })
        res.status(200).send({ check: update })
        console.log('idsanpham',update);
    } catch (error) {
        console.log("[_updateCart]", error);
    }
}

export const _deleteCart = async (req, res) => {
    try {
        const del = await CartModel.findByIdAndDelete({ _id: req.body._id })
        res.status(200).send({ check: del })
    } catch (error) {
        console.log("[_deleteCart]", error);
    }
}

