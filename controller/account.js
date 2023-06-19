import { AccountModel } from "../models/taiKhoanModal.js";
import twilio from "twilio";
import dotenv from "dotenv";
import { BaiVietModal } from "../models/baiVietModal.js";
import { _getNotifi } from "./thongBao.js";
import { UserDBModel } from "../models/userDB.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 10;
dotenv.config();

const client = twilio(process.env.accountSID, process.env.authToken);

export const _login = async (req, res) => {
  try {
    // if (req.body.phonenumber) {
    //     client
    //            .verify
    //         .services(process.env.serviceID)
    //         .verifications
    //         .create({
    //             to: `+${req.body.phonenumber}`,
    //             channel: req.body.channel === 'call' ? 'call' : 'sms'
    //         })
    //         .then(data => {
    //             res.status(200).send({
    //                 message: "Verification is sent!!",
    //                 phonenumber: req.body.phonenumber,
    //                 data
    //             })
    //         })
    // } else {
    //     res.status(400).send({
    //         message: "Wrong phone number :(",
    //         phonenumber: req.body.phonenumber,
    //         data
    //     })
    // }
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

export const _veryfy = async (req, res) => {

  try {
    if (req.body.code.length == 6) {

      client.verify
        .services(process.env.serviceID)
        .verificationChecks.create({
          to: `+${req.body.phonenumber}`,
          code: req.body.code,
        })
        .then((data) => {
          console.log('code', req.body.code);
          console.log('code', req.body.phonenumber);
          if (data.status == "pending") {
            res.status(200).send({
              message: "User is Verified!!",
              data,
            });
            res.status(200).send({ checkOtp: 0 });
          } else {
            res.status(200).send({ checkOtp: 1 });
          }
          console.log(data.status);
        });
    }
  } catch (error) { }
};

export const _test = async (req, res) => {
  // console.log("abc");
  // const acc = new AccountModel({
  //   nameUser: "Thi1",
  //   birthDay: "9/9/2021",
  //   phoneNumber: "84706235822",
  //   passWord: "thithi11111111",
  //   codeOTP: "123123",
  // });
  // acc.save();
  try {
    const a = await AccountModel.find().sort({ createdAt: -1 });
    console.log("data", a);

    res.status(200).send(a);
    // console.log('[A.L.L]',a);
  } catch (error) {
    // res.status(500).json({ error: error });
    console.log("Ko laays ddc");
  }
};

export const _registerinfor = async (req, res) => {
  const password = req.body.matKhau;
  let encryptedPassword = "";
  if (
    req.body.tenUser == "" ||
    req.body.ngaySinh == "" ||
    req.body.soDienThoai == "" ||
    req.body.matKhau == "" ||
    req.body.otp == "" ||
    req.body.address == "" ||
    req.body.soDuong == "" ||
    req.body.tinhTp == "" ||
    req.body.xaPhuong == "" ||
    req.body.quanHuyen == ""
  ) {
    console.log("rỗng");
  } else {
    console.log("Có");
    bcrypt.hash(password, saltRounds, function (err, hash) {
      encryptedPassword = hash;
      const acc = new AccountModel({
        tenUser: req.body.tenUser,
        ngaySinh: req.body.ngaySinh,
        soDienThoai: req.body.soDienThoai,
        matKhau: encryptedPassword,
        codeOTP: req.body.otp,
        anhDaiDien:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
        soDuong: req.body.soDuong,
        id: new mongoose.Types.ObjectId(),
        thanhPho: req.body.thanhPho,
        quan: req.body.quan,
        xa: req.body.xa,
      });
      acc.save();
    });
  }
};

export const _getDataUser = async (req, res) => {
  try {
    const data = await AccountModel.findOne({
      soDienThoai: req.body.soDienThoai,
    });
    if (data != null) {
      res.status(200).send({
        checkUserName: data.nameUser,
        dataAccount: data,
        _id: data._id,
      });
    } else {
      res.status(200).send({ checkUsername: 0 });
    }
  } catch (error) {
    console.log("error");
  }
};
export const _upLoadImage = async (req, res) => {
  try {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
    res.status(200).send({ checkIMG: 0 });
    return res.send(imgUrl);
  } catch (error) {
    res.status(200).send({ checkIMG: -1 });
  }
};
export const _checkTaiKhoan = async (req, res) => {
  console.log("điện thoại", req.body.phonenumber);
  try {
    const check = await AccountModel.findOne({
      soDienThoai: req.body.phonenumber,
    });
    if (check != null) {
      res.status(200).send({ checkVerify: 0 });
    } else {
      _sendCodeOTP(req);
      res.status(200).send({ checkVerify: 1 });
    }
  } catch (error) {
    res.status(200).send({ checkVerify: 2 });
  }
};

export const _CheckLogin = async (req, res) => {
  try {
    const password = req.body.matKhau;
    const phone = await AccountModel.findOne({
      soDienThoai: req.body.soDienThoai,
    });

    bcrypt.compare(password, phone.matKhau, function (err, result) {
      if (result) {
        res.status(200).send({ checkLogin: 1 });
      } else {
        console.log("Login thất bại");
        res.status(200).send({ checkLogin: 0 });
      }
    });
    // if (checkphoneNumber == null || checkpassword == null) {
    //   res.status(200).send({ checkLogin: 0 });
    //   console.log("[_checkLogin_rỗng 1 trong 2]");
    // } else {
    //   res.status(200).send({ checkLogin: 1 });
    //   console.log("[_checkLogin_Welcom");
    // }
  } catch (error) {
    res.status(200).send({ checkLogin: 2 });
  }
};
const _sendCodeOTP = (req, res) => {
  console.log("số điện thoại: ", `+84${req.body.phonenumber}`);
  client.verify
    .services(process.env.serviceID)
    .verifications.create({
      to: `+84${req.body.phonenumber}`,
      channel: req.body.channel == "call" ? "call" : "sms",
    })
    .then((data) => {
      res.status(200).send({ checkVerify: 1 });
    });
};

export const _register = async (req, res) => {
  try {
    if (req.body.phonenumber != "") {
      _checkTaiKhoan(req, res);
    }
  } catch (error) {
    console.log("khok", error);
  }
};

export const _checkPhone_ForgetPassword = async (req, res) => {
  try {
    const checkphoneNumber = await AccountModel.findOne({
      soDienThoai: req.body.phonenumber,
    });
    if (checkphoneNumber == null) {
      res.status(200).send({ checkForgetPassword_phone: 0 });
    } else {
      res.status(200).send({ checkForgetPassword_phone: 1 });
      _sendCodeOTP_ForgetPassword(req);
    }
  } catch (error) {
    res.status(200).send({ checkForgetPassword_phone: 2 });
  }
};
export const _sendCodeOTP_ForgetPassword = (req, res) => {
  client.verify
    .services(process.env.serviceID)
    .verifications.create({
      to: `+84${req.body.phonenumber}`,
      channel: req.body.channel == "call" ? "call" : "sms",
    })
    .then((data) => {
      res.status(200).send({ checkOtp: data.status });
      res.status(200).send({ checkVerify: 1 });
    });
};

export const _veryfy_ForgetPassword = async (req, res) => {
  console.log("lấy lại mk", `+84${req.body.phonenumber}`);
  try {
    if (req.body.code.length == 6) {
      client.verify
        .services(process.env.serviceID)
        .verificationChecks.create({
          to: `+84${req.body.phonenumber}`,
          code: req.body.code,
        })
        .then((data) => {
          if (data.status == "pending") {
            res.status(200).send({
              message: "User is Verified!!",
              data,
            });
            res.status(200).send({ checkOtp: 0 });
          } else {
            res.status(200).send({ checkOtp: 1 });
          }
        });
    }
  } catch (error) { }
};

export const _ChangePassword = async (req, res) => {
  try {
    let password = req.body.matKhau;
    var encryptedPassword = "";
    bcrypt.hash(password, saltRounds, function (err, hash) {
      encryptedPassword = hash;
      const a = async () => {
        const pass = await AccountModel.findOneAndUpdate(
          { soDienThoai: req.body.phonenumber },
          { matKhau: encryptedPassword },
          { new: false, useFindAndModify: false }
        );
        // res.status(200).send(pass)
      };
      a();
    });
  } catch (error) {
    console.log(error);
    x;
  }
};

export const _changeInforUser = async (req, res) => {
  try {
    const update = await AccountModel.findByIdAndUpdate(
      { _id: req.body.idU },
      {
        tenUser: req.body.nameU,
        ngaySinh: req.body.birthD,
        soDienThoai: req.body.phoneN,
        anhDaiDien: req.body.avatarprofile,
        address: req.body.addressU,
        soDuong: req.body.specificaddressU,
        thanhPho: req.body.tinhTp,
        quan: req.body.quanHuyen,
        xa: req.body.xaPhuong,
      },
      { new: true, useFindAndModify: false }
    );
    update.save();
    res.status(200).send({ checkUpdate: 1 });
  } catch (error) {
    console.log(error);
    res.status(200).send({ checkUpdate: 2 });
  }
};
export const _changeAddress = async (req, res) => {
  try {
    const update = await AccountModel.findByIdAndUpdate(
      { _id: req.body.id_Account },
      {
        tenUser: req.body.tenUser,
        soDienThoai: req.body.soDienThoai,
        soDuong: req.body.soDuong,
        thanhPho: req.body.thanhPho,
        quan: req.body.quan,
        xa: req.body.xa,
      },
      { new: true, useFindAndModify: false }
    );
    update.save();
    res.status(200).send({ checkaddress: 1 });
  } catch (error) {
    res.status(200).send({ checkaddress: 2 });
  }
};
export const _bryptPassword_register = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let encryptedPassword = "";
  bcrypt.hash(password, saltRounds, function (err, hash) {
    encryptedPassword = hash;
    const login = new UserDBModel({
      username: username,
      password: encryptedPassword,
    });
    login.save();
  });
};
export const _bryptPassword_login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const testLogin = await UserDBModel.findOne({
      username: req.body.username,
    });
    bcrypt.compare(password, testLogin.password, function (err, result) {
      if (result) {
        return res.status(200).json("Login thành công");
      } else {
        return res.status(200).json("Login thất bại");
      }
    });
  } catch (error) { }
};
