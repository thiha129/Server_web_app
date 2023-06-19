import multer from "multer";
import pkg from "multer-gridfs-storage";

const { GridFsStorage } = pkg;
const storage = new GridFsStorage({
    url: process.env.URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        let form = new formidable.IncomingForm();
        form.uploadDir = "uploads/"

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}${file.originalname}`;
            console.log('[LOGIMG123]', filename);
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}${file.originalname}`,
        };
    },
});

export default multer({ storage: storage });
