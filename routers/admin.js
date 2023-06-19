import express from "express";
import { AdminModal } from "../models/adminModal.js";

const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const data = await AdminModal.findOne({
            taiKhoan: req.body.username,
            matKhau: req.body.pass
        })
        if (data == null) {
            res.status(200).send({ check: 0 })
        } else {
            res.status(200).send({ check: 1, idADM: data._id })
        }
        console.log("[Admin_getData_Error]", req.body);

    } catch (error) {
        console.log("[Admin_getData_Error]", error);

    }
});
router.get("/new", async (req, res) => {
    try {
        const data = new AdminModal({
            userName: req.query.username,
            pass: req.query.pass
        })
        data.save()
        res.status(200).send(data)
    } catch (error) {
        console.log("[Admin_Create_Error]", error);
    }
});

export default router;