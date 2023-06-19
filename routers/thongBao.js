import express from "express";
import { _getNotifi, _addNotifi } from "../controller/thongBao.js";
const router = express.Router();

router.post("/", _getNotifi);
router.post("/add", _addNotifi);

// router.get("/getId", getIdAccount);
export default router;
