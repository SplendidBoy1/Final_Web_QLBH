const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('qqqqqq')
        console.log(req)
        cb(null, './publics/images/products')
    },
    filename: (req, file, cb) => {
        console.log('ttttttt')
        console.log(req)
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    console.log('filter')
        console.log(req)
    const allowTypes = /jpeg|jpg|png|gif/;
    const extname = allowTypes.test(path.extname(file.originalname).toLowerCase())
    const mime = allowTypes.test(file.mimetype)

    if (extname && mime){
        cb(null, true)
    }
    else{
        cb(new Error('Allow Image'))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
})

module.exports = upload