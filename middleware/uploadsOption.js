import multer from "multer";
import pkg from "multer-gridfs-storage";
import fs from "fs"

const { GridFsStorage } = pkg;
const DIR = 'uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split('.').join('/');
        fs.mkdirSync(DIR + fileName, { recursive: true })
        cb(null, DIR + fileName);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.mimetype.replace("image/", "."))
    }
});

export default multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
