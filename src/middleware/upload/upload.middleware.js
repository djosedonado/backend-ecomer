import multer from "multer";
import path from "path";
import fs from "fs";

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./public/uploads/img/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    if (file === undefined) return console.error("File not found"); // verifica si estan mandando un archivo
    //console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  fileFilter: function (req, file, cb) {
    // Validar el tipo de archivo
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Solo se permiten archivos de imagen"));
    }
    cb(null, true);
  },
});

export const upload = multer({ storage: storageImage }).single("image");
