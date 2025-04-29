const multer = require('multer')
const path = require('path')


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  

 const upload = multer({ storage: storage }).array("image");

 const uploadfile = (req,res) => {
     const filePaths = req.files.map(file=>path.join(file.filename));
     req.body.imagePaths = filePaths;
     res.json({filePaths});
  };

 module.exports = {
    upload,
    uploadfile
};