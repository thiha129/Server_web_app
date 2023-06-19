import express from "express";
const router = express.Router();
import { ThongKeModal } from "../models/thongKe.js";
import { SanphamModel } from "../models/sanPhamModal.js";
import mongoose from 'mongoose';
// router.post("/add", async (req, res) => {
//     try {
//         const data = req.body
//         console.log("[ThongKe_Data]", req.body);
//         data.map(async (e) => {
//             const dataTK = await ThongKeModal.findOne({ id_SanPham: e.id_SanPham })
//             console.log("[ThongKe_SP]", dataTK);
//             console.log("[ThongKe_TK]", e.id_SanPham);
//             if (dataTK != null) {
//                 const add = await ThongKeModal.findByIdAndUpdate({ _id: dataTK._id }, {
//                     id_SanPham: e.id_SanPham,
//                     tenSanPham: e.tenSanPham,
//                     soLuongBan: parseInt(dataTK.soLuongBan) + parseInt(e.soLuong),
//                     tongGia: parseInt(dataTK.tongGia) + parseInt(e.tongGiaBan)
//                 },
//                     { new: true, useFindAndModify: false });

//                 // console.log("[ThongKe_UPDATE]");

//             } else {
//                 const add = new ThongKeModal({
//                     id_SanPham: e.id_SanPham,
//                     tenSanPham: e.tenSanPham,
//                     soLuongBan: parseInt(e.soLuong),
//                     tongGia: parseInt(e.tongGiaBan)
//                 })
//                 add.save();
//                 // console.log("[ThongKe_ADD]");
//             }
//         })
//     } catch (error) {

//     }
// });

router.post("/add", async (req, res) => {
    try {
        const data = req.body
        console.log("[ThongKe_Data]", req.body);
        data.map(async (e) => {
            const add = new ThongKeModal({
                id_SanPham: e.id_SanPham,
                tenSanPham: e.tenSanPham,
                soLuongBan: parseInt(e.soLuong),
                tongGia: parseInt(e.tongGiaBan)
            })
            add.save();
        })
    } catch (error) {

    }
});


router.get("/data", async (req, res) => {
    try {
        const getData = await ThongKeModal.find().sort({ "createdAt": -1 })
        res.status(200).send(getData)
    } catch (error) {

    }
});


export default router;