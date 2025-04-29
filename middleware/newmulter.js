const { log } = require("console");
const multer = require("multer");
const path = require("path");

const uploadfile = (req, res) => {
  const image = multer({ storage: storage, fileFilter: fileFilter }).array(
    "image"
  );

  image(req, res, async (err) => {
    if (err) {
      throw new Error("IMAGE_NOT_UPLOADED");
    }

    if (!req.files || req.files.length === 0) {
      throw new Error("IMAGE_NOT_FOUND");
    }

    const filePaths = req.files.map((file) => path.join(file.filename));
    req.body.imagePaths = filePaths;
    res.json({ filePaths });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (request, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = { uploadfile };
