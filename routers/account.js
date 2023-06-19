import express from "express";
import {
  _register,
  _test,
  _CheckLogin,
  _getDataUser,
  _registerinfor,
  _veryfy,
  _checkPhone_ForgetPassword,
  _sendCodeOTP_ForgetPassword,
  _veryfy_ForgetPassword,
  _ChangePassword,
  _upLoadImage,
  _changeInforUser,
  _changeAddress,
  _bryptPassword_register,
  _bryptPassword_login,
} from "../controller/account.js";
const router = express.Router();
import { AccountModel } from "../models/taiKhoanModal.js";
import formidable from "formidable"
import fs from "fs"
import upload from '../middleware/uploadsAvatar.js';

router.post("/login", _CheckLogin);
router.post("/register", _register);
router.post("/", _getDataUser);
router.get("/alluser", _test);
router.post("/verify", _veryfy);
router.post("/registerinfor", _registerinfor);
router.post("/forgetpassword", _checkPhone_ForgetPassword);
router.post("/verifyforgetpassword", _veryfy_ForgetPassword);
router.post("/changepassword", _ChangePassword);
router.post("/editinforuser", upload.single("file"), async (req, res) => {
  try {
    if (req.file == undefined) {

    } else {
      console.log(req.file);

      const url = 'http://thanhdatbmt.online/api/' + req.file.destination + '/' + req.file.filename
      const update = await AccountModel.findByIdAndUpdate({ _id: req.body._id }
        , {
          tenUser: req.body.tenUser,
          ngaySinh: Date(req.body.ngaySinh),
          soDienThoai: req.body.soDienThoai,
          anhDaiDien: url,
          soDuong: req.body.soDuong,
          thanhPho: req.body.thanhPho,
          quan: req.body.quan,
          xa: req.body.xa
        }
        , { new: true, useFindAndModify: false });
      update.save();
      res.status(200).send({ checkUpdate: 1 })
    }
  } catch (error) {

  }
})

// router.post("/editinforuser", async (req, res) => {
//   try {
//     let form = new formidable.IncomingForm();
//     form.uploadDir = "uploads/"
//     form.parse(req, async (err, req.body, files) => {
//       if (err) throw err;
//       const newPathName = `uploads/` + yaer + id + month
//       fs.mkdirSync(newPathName, { recursive: true })
//       let newPath = newPathName + Date.now() + '.jpg';
//       let tmpPath = files.file.filepath;
//       fs.rename(tmpPath, newPath, (err) => {
//         if (err) throw err;
//         switch (files.file.mimetype) {
//           case "image/jpg":
//             fs.readFile(newPath, async (err, fileUploaded) => {
//               console.log('newPath',newPath);
//               
//             });
//             break;
//         }
//       });

//     });

//   } catch (error) {
//     console.log("[ERROR]", error);
//   }
// });
router.post("/changeaddress", _changeAddress);
router.post("/testLogin", _bryptPassword_login);
router.post("/testRegister", _bryptPassword_register);

export default router;
