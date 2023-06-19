import { SanphamModel } from "../models/sanPhamModal.js";
import mongoose from 'mongoose';

export const _getDataSanPham = async (req, res) => {
    try {

        var perPage = Math.max(0, req.query.perPage);
        var page = Math.max(0, req.query.pagenumber)
        const dataPhanTrang = await (await SanphamModel.find().where({
            active: true
        }).limit(perPage).skip(perPage * page).sort({ "createdAt": -1 }))
        const data = await SanphamModel.find();
        const a = data.length / (parseInt(req.query.perPage))
        const b = parseInt(a.toFixed(0))
        if (b - a > 0) {
            res.status(200).send({
                dataPhanTrang: dataPhanTrang,
                countPage: b,
            });
        } else if (b - a < 0) {
            res.status(200).send({
                dataPhanTrang: dataPhanTrang,
                countPage: b + 1,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _getDataSanPhamadmin = async (req, res) => {
    try {
        var perPage = Math.max(0, req.query.perPage);
        var page = Math.max(0, req.query.pagenumber)
        const dataPhanTrang = await (await SanphamModel.find().limit(perPage).skip(perPage * page).sort({ "createdAt": -1 }))
        const data = await SanphamModel.find();
        const countPage = data.length / (parseInt(req.query.perPage))
        res.status(200).send({
            dataPhanTrang: dataPhanTrang,
            countPage: countPage.toFixed(0),
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _getDataSanPhamBanChay = async (req, res) => {
    try {

        var perPage = Math.max(0, req.query.perPage);
        var page = Math.max(0, req.query.pagenumber)
        const dataPhanTrang = (await SanphamModel.find().limit(perPage).skip(perPage * page).sort({ "createdAt": -1 }))
        res.status(200).send({ dataPhanTrang: dataPhanTrang });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _getDataSanPhamBanChayWeb = async (req, res) => {
    try {
        const dataPhanTrang = (await SanphamModel.find().sort({ "createdAt": -1 })).filter(e => e.checkBanChay === true)
        res.status(200).send(dataPhanTrang);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _getChitietsanpham = async (req, res) => {
    try {
        const data = await SanphamModel.findOne({ _id: req.body._id });
        console.log(data);
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _capNhatSanPham = async (req, res) => {
    try {
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
        res.status(200).send({ checkedUpdate: 1 });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}




export const _deleteSanPham = async (req, res) => {
    console.log(req.body);
    try {
        const del = await SanphamModel.findByIdAndUpdate({ _id: req.body._id }, {
            active: req.body.active
        })
        res.status(200).send({ checkedDel: 1 });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const _timKiemSP = async (req, res) => {
    try {
        var perPage = Math.max(0, req.query.perPage); // số phần tử trên 1 trang
        var page = Math.max(0, req.query.pagenumber)

        const search = await SanphamModel.find({ $text: { $search: req.query.text } }).limit(perPage).skip(perPage * page).sort({ "createdAt": -1 })
        const countPage = search.length / (parseInt(req.query.perPage))

        search.length == 0 ? res.status(200).send({
            data: search,
            checkTimKiem: 0,
            countPage: countPage.toFixed(0),
            text: req.query.text
        }) : res.status(200).send({
            data: search,
            checkTimKiem: 1,
            countPage: countPage.toFixed(0),
            text: req.query.text
        })

    } catch (error) {
        console.log("[_searchSanPhamError]", error);
    }
}