import express from "express";
import { _DeleteOrderUser, _getAllDonHang, _getDonHang, _thayDoiTrangThai, _themDonHang } from "../controller/donHang.js";
const router = express.Router();

router.post("/", _themDonHang);
router.post('/orderstatus', _getDonHang)

router.get('/all', _getAllDonHang)
router.post('/change', _thayDoiTrangThai)
router.post('/deleteorderuser', _DeleteOrderUser)

export default router;