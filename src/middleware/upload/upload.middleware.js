import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Solo se permiten archivos de imagen"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter }).single("file");
