import { BaiVietModal } from "../models/baiVietModal.js";

export const getPost = async (req, res) => {
  try {

    const posts = await BaiVietModal.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

export const _deletePost = async (req, res) => {
  try {
    const del = await BaiVietModal.findByIdAndDelete({ _id: req.body._id })
    console.log("del");
    res.status(200).send({ checkedDel: del });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
export const _chitiet = async (req, res) => {
  try {
    const data = await BaiVietModal.findOne({ _id: req.body._id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
