import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import TaiKhoan from "./routers/account.js";
import BaiViet from "./routers/baiViet.js";
import dotenv from "dotenv";
import ThongBao from "./routers/thongBao.js";
import mongoose from "mongoose";
import SanPham from './routers/sanPham.js'
import GioHang from './routers/cart.js'
import DonHang from './routers/donHang.js'
import ThongKe from './routers/thongKe.js'
import Admin from './routers/admin.js'
import TuyChinh from './routers/options.js'
import Grid from "gridfs-stream";
import fs from "fs"
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.get("/uploads/:year/:namefolder/:month/:name", async (req, res) => {
  try {
    const year = req.params.year
    const namefolder = req.params.namefolder
    const month = req.params.month
    const nameIMG = req.params.name
    const readStream = fs.createReadStream(`./uploads/${year}/${namefolder}/${month}/${nameIMG}`);

    readStream.on('error', (err) => res.status(200).send());
    readStream.pipe(res);

  } catch (error) {
    res.send("not found");
  }
});

app.get("/uploads/banner/:name", async (req, res) => {
  try {
    const name = req.params.name
    const readStream = fs.createReadStream(`./uploads/banner/${name}`);

    readStream.on('error', (err) => res.status(200).send());
    readStream.pipe(res);

  } catch (error) {
    res.send("not found");
  }
});

app.get("/uploads/:baiviet/:year/:month/:name", async (req, res) => {
  try {
    const year = req.params.year
    const month = req.params.month
    const nameIMG = req.params.name
    const baiViet = req.params.baiviet
    const readStream = fs.createReadStream(`./uploads/${baiViet}/${year}/${month}/${nameIMG}`);

    readStream.on('error', (err) => res.status(200).send());
    readStream.pipe(res);

  } catch (error) {
    res.send("not found");
  }
});



app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.get("/app", (req, res) => {
  const file = `./uploads/ThanhDatCoffee.apk`;
  res.download(file);
})

app.use("/taikhoan", TaiKhoan);

app.use("/baiviet", BaiViet);

app.use("/thongbao", ThongBao);

app.use('/sanpham', SanPham)

app.use('/giohang', GioHang)

app.use('/donhang', DonHang)

app.use('/admin', Admin)

app.use('/quangcao', TuyChinh)


mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
