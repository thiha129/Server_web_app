
import express from 'express';
import {
    _gioHang,
    _dataCart,
    _updateCart,
    _deleteCart
} from '../controller/cart.js';
const router = express.Router();

router.post('/themvaogio', _gioHang);
router.post('/data', _dataCart);
router.post('/update', _updateCart);
router.post('/delete', _deleteCart);

export default router;
