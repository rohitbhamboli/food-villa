import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb;
    null, "../temp-uploads";
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer.uploads({ storage });

export default upload;
