import express from "express";
import { getPost, _deletePost, _chitiet } from "../controller/baiViet.js";
import { BaiVietModal } from "../models/baiVietModal.js";
import mongoose from "mongoose";
const router = express.Router();
import upload from '../middleware/uploadBaiViet.js';

router.get("/", getPost);
router.get("/noibat", async (req, res) => {
    try {
        const posts = (await BaiVietModal.find().sort({ createdAt: -1 })).filter(e => e.noiBat === true);
        res.status(200).send(posts);
    } catch (error) {

    }
});
router.post("/newpost", upload.single('files'), (req, res) => {
    try {
        if (req.file === undefined) {

            console.log("[ERROR get file]");
            return res.send("you must select a file.");
        } else {
            const url = 'http://thanhdatbmt.online/api'

            const imgUrl = `${url}/${req.file.destination}/${req.file.filename}`;

            const post = new BaiVietModal({
                tieuDe: req.body.tieuDe,
                gioiThieu: req.body.gioiThieu,
                hinhAnh: imgUrl,
                noiBat: req.body.noiBat,
                id: new mongoose.Types.ObjectId()
            })
            post.save();
            res.status(200).send({
                checkedAdd: 1
            });

        }
    } catch (error) {
        console.log("[ERROR]", error);
    }
})
router.post("/update", upload.single('file'), async (req, res) => {
    try {

        if (req.file === undefined) {
            const update = await BaiVietModal.findByIdAndUpdate({
                _id: req.body._id
            }, {
                tieuDe: req.body.tieuDe,
                noiBat: req.body.noiBat,
                gioiThieu: req.body.gioiThieu,
            }, { new: true })
            update != undefined || update != null || update != "" ?
                res.status(200).send({ checkedUpdate: 1 })
                : null
        } else {
            const url = 'http://thanhdatbmt.online/api'
            const imgUrl = `${url}/${req.file.destination}/${req.file.filename}`;
            const update = await BaiVietModal.findByIdAndUpdate({
                _id: req.body._id
            }, {
                tieuDe: req.body.tieuDe,
                gioiThieu: req.body.gioiThieu,
                noiBat: req.body.noiBat,
                hinhAnh: imgUrl,
            }, { new: true })
            update != undefined || update != null || update != "" ?
                res.status(200).send({ checkedUpdate: 1 })
                : null
        }
    } catch (error) {
        console.log("[ERROR]", error);
    }
})
router.post("/delete", _deletePost)
router.post("/chitietbaiviet", _chitiet)

export default router;
