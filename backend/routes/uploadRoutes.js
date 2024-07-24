// import express from "express";
// import multer from "multer";
// import path from 'path';

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
//   })


//   function checkFileType(req,filename){
//     const filetypes = /jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if(extname && mimetype){
//         return cb(null,true);
//     }else{
//         cb('Images only');
//     }

//   }

  
//   const upload = multer({ storage: storage });

//   router.post('/',upload.single('image'),(req,res)=>{
//     res.send({
//         message : 'Image uploaded',
//         image : `${req.file.path}`
//     })
//   })


//   export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only'));
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: 'No file uploaded or invalid file type'
    });
  }
  res.send({
    message: 'Image uploaded',
    image: `${req.file.path}`
  });
});

export default router;
