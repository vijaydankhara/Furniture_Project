import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: function (request: Request, file, cb) {
      cb(null, 'src/public/images')
    },
    filename: function (request: Request, file, cb) {
      cb(null,` ${Date.now()}_${file.originalname.replace(/\s+/g, "/")}`)
    }
})

const upload = multer({storage: storage});
export default upload




// import multer from 'multer';
// import { Request } from 'express';
// import path from 'path';

// const storage = multer.diskStorage({
//     destination: function(req: Request, file: Express.Multer.File, cb: Function) {
//         if (file.fieldname === 'productImage') {
//             cb(null, path.join(__dirname, '..', 'public', 'images'));
//         } else if (file.fieldname === 'profileImage') {
//             cb(null, path.join(__dirname, '..', 'public', 'profile'));
//         } else {
//             cb(new Error('Invalid fieldname'));
//         }
//     },
// });

// const upload = multer({ storage: storage });

// export default upload;