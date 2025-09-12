import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldNameSize: 255,
    fieldSize: 1024 * 1024 * 25,
  },
});

export { upload };
