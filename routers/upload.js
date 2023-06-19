import upload from "../middleware/upload.js";
import express from "express";
const router = express.Router();
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log('[REQ]', req.file);
    if (req.file === undefined) {

      return res.send("you must select a file.");
    } else {
      const imgUrl = `https://thanh-dat-coffee.herokuapp.com/file/${req.file.filename}`;
      return res.status(200).send({ linkImg: imgUrl });
    }
  } catch (error) {
    console.log("[ERROR]", error);
  }
});

export default router;
