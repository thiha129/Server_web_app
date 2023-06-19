import express from "express";
const router = express.Router();
import { OptionModal } from "../models/optionModal.js";
import upload from '../middleware/uploadsOption.js';
import formidable from "formidable"

router.get("/update", upload.single('files'), async (req, res) => {
    try {
        const url = 'http://thanhdatbmt.online/api'
        const add = await OptionModal.findOneAndUpdate({ _id: '61b515307a75c2403ce53b27' }, {
            imgBanner: `${url}/${req.file.destination}/${req.file.filename}`,
            linkVideo: req.query.linkvideo
        })
        if (add == null) {
            res.status(500).send("Bạn không có quyền sửa")
        } else {
            res.status(200).send(add)
        }
    } catch (error) {
        res.status(500).send("Sai cấu trúc")
    }
});
router.get("/update", upload.single("files"), async (req, res) => {
    try {
        const url = "http://103.75.185.148:3030";
        const add = await OptionModal.findOneAndUpdate(
            { _id: "61b515307a75c2403ce53b27" },
            {
                imgBanner: `${url}/${req.file.destination}/${req.file.filename}`,
                linkVideo: req.query.linkvideo,
            }
        );
        if (add == null) {
            res.status(500).send("Bạn không có quyền sửa");
        } else {
            res.status(200).send(add);
        }
    } catch (error) {
        res.status(500).send("Sai cấu trúc");
    }
});

router.post("/uploadbanner", upload.single('banner'), async (req, res) => {
    try {
        const url = 'http://thanhdatbmt.online/api'
        const add = await OptionModal.findOneAndUpdate({ idADM: req.body.idADM }, {
            imgBanner: `${url}/${req.file.destination}/${req.file.filename}`,
        }, { new: true, useFindAndModify: false });
        console.log("uploadbanner", `${url}/${req.file.destination}/${req.file.filename}`);
        if (add == null) {
            res.status(500).send("Bạn không có quyền sửa")
        } else {
            res.status(200).send(add)
        }
    } catch (error) {
    }
});

router.post("/uploadhello", upload.single('hello'), async (req, res) => {
    try {
        const url = 'http://thanhdatbmt.online/api'
        const add = await OptionModal.findOneAndUpdate({ idADM: req.body.idADM }, {
            manHinhChao: `${url}/${req.file.destination}/${req.file.filename}`,
        }, { new: true, useFindAndModify: false });
        if (add == null) {
            res.status(500).send("Bạn không có quyền sửa")
        } else {
            res.status(200).send(add)
        }
    } catch (error) {
    }
});

router.post("/uploadvideo", async (req, res) => {
    try {
        if (req.body.link == "") {
            const add = await OptionModal.findOneAndUpdate({ idADM: req.body.idADM }, {
                tieuDe: req.body.tieuDe,
                noiDung: req.body.noiDung,
            }, { new: true, useFindAndModify: false });
            if (add == null) {
                res.status(500).send("Bạn không có quyền sửa")
            } else {
                res.status(200).send(add)
            }
        } else {
            const add = await OptionModal.findOneAndUpdate({ idADM: req.body.idADM }, {
                tieuDe: req.body.tieuDe,
                noiDung: req.body.noiDung,
                linkVideo: req.body.link,
            }, { new: true, useFindAndModify: false });
            if (add == null) {
                res.status(500).send("Bạn không có quyền sửa")
            } else {
                res.status(200).send(add)
            }
        }


    } catch (error) {
    }
});

router.post("/uploadslider", upload.array('slider'), async (req, res) => {
    try {
        const url = 'http://thanhdatbmt.online/api'
        const reqFiles = [];
        for (var i = 0; i < req.files.length; i++) {
            reqFiles.push({ image: `${url}/${req.files[i].destination}/${req.files[i].filename}` })
        }
        console.log("uploadslider");
        const add = await OptionModal.findOneAndUpdate({ idADM: req.body.idADM }, {
            sliderApp: reqFiles,
        }, { new: true, useFindAndModify: false });
        if (add == null) {
            res.status(500).send("Bạn không có quyền sửa")
        } else {
            res.status(200).send(add)
        }
    } catch (error) {
    }
});


router.get("/data", async (req, res) => {
    try {
        const getData = await OptionModal.findOne();
        res.status(200).send(getData);
    } catch (error) { }
});

export default router;
