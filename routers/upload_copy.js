import express from "express";
const router = express.Router();
import formidable from "formidable"
import fs from "fs"
import url from "url"

router.post("/uploads", async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.uploadDir = "uploads/"
    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      // Lấy ra đường dẫn tạm của tệp tin trên server
      let tmpPath = files.file.path;
      // Khởi tạo đường dẫn mới, mục đích để lưu file vào thư mục uploads của chúng ta
      let newPath = form.uploadDir + files.file.name;
      // Đổi tên của file tạm thành tên mới và lưu lại
      fs.rename(tmpPath, newPath, (err) => {
        if (err) throw err;

        switch (files.file.type) {
          // Kiểm tra nếu như là file ảnh thì render ảnh và hiển thị lên.
          case "image/jpeg":
            fs.readFile(newPath, (err, fileUploaded) => {
              res.writeHead(200, { "Content-type": "image/jpeg" });
              res.end(fileUploaded);
            });
            break;
          // Còn lại các loại file khác thì chỉ hiển thị nội dung thông báo upload thành công.
          default:
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`Upload file <strong>${files.file.name}</strong> successfuly`);
            break;
        }
      });
    });

  } catch (error) {
    console.log("[ERROR]", error);
  }
});

export default router;
