import express from 'express';
import {
    _getDataSanPham, _capNhatSanPham, _timKiemSP, _getDataSanPhamBanChay, _deleteSanPham, _getChitietsanpham,
    _getDataSanPhamBanChayWeb, _getDataSanPhamadmin
} from '../controller/sanPham.js';
import { SanphamModel } from "../models/sanPhamModal.js";
import upload from '../middleware/upload.js';
import mongoose from "mongoose";
import formidable from "formidable"
import fs from "fs"

const router = express.Router();

router.post("/new", upload.array('files'), (req, res, next) => {
    try {
        if (req.files.length === 0) {
            console.log("[ERROR get file]");
            return res.send("you must select a file.");
        } else {
            const url = 'http://thanhdatbmt.online/api'
            const reqFiles = [];
            for (var i = 0; i < req.files.length; i++) {
                reqFiles.push({ image: `${url}/${req.files[i].destination}/${req.files[i].filename}` })
            }

            const add = new SanphamModel({
                hinhAnhSP: reqFiles,
                tenSP: req.body.tenSP,
                giaSP: req.body.giaSP,
                giaSaleSP: req.body.giaSaleSP,
                checkBanChay: req.body.checkBanChay,
                thongTinSP: req.body.thongTinSP,
                id: new mongoose.Types.ObjectId(),
                ngaySanXuat: req.body.ngaySanXuat,
                ngayHetHan: req.body.ngayHetHan,
                daBan: 0,
                active: false,
            })
            add.save();
            res.status(200).send({ checkedAdd: 1 });
        }
    } catch (error) {
        console.log("[ERROR]", error);
    }
})

router.post("/update", upload.array('file'), async (req, res) => {
    try {

        if (req.files.length === 0) {
            console.log("[ERROR] Dont have IMG");
            const update = await SanphamModel.findByIdAndUpdate({
                _id: req.body._id
            }, {
                tenSP: req.body.tenSP,
                giaSP: req.body.giaSP,
                giaSaleSP: req.body.giaSaleSP,
                checkBanChay: req.body.checkBanChay,
                thongTinSP: req.body.thongTinSP,
                ngaySanXuat: req.body.ngaySanXuat,
                ngayHetHan: req.body.ngayHetHan,
            }, { new: true })
            update != undefined || update != null || update != "" ?
                res.status(200).send({ checkedUpdate: 1 })
                : null
        } else {
            const url = 'http://thanhdatbmt.online/api'
            const reqFiles = [];
            for (var i = 0; i < req.files.length; i++) {
                reqFiles.push({ image: `${url}/${req.files[i].destination}/${req.files[i].filename}` })
            }
            const update = await SanphamModel.findByIdAndUpdate({
                _id: req.body._id
            }, {
                hinhAnhSP: reqFiles,
                tenSP: req.body.tenSP,
                giaSP: req.body.giaSP,
                giaSaleSP: req.body.giaSaleSP,
                checkBanChay: req.body.checkBanChay,
                thongTinSP: req.body.thongTinSP,
                ngaySanXuat: req.body.ngaySanXuat,
                ngayHetHan: req.body.ngayHetHan,
            }, { new: true })
            update != undefined || update != null || update != "" ?
                res.status(200).send({ checkedUpdate: 1 })
                : null
        }
    } catch (error) {
        console.log("[ERROR]", error);
    }
})

router.get("/", _getDataSanPham)
router.get("/admin", _getDataSanPhamadmin)
router.post("/xoa", _deleteSanPham)
router.get("/timkiem", _timKiemSP)
router.post("/sanphambanchay", _getDataSanPhamBanChay)
router.get("/sanphambanchayweb", _getDataSanPhamBanChayWeb)
router.post("/chitietsanpham", _getChitietsanpham)
export default router;
