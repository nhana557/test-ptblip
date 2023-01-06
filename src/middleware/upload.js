const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const createError = require('http-errors')


const fileStorage = multer.diskStorage({
        // destination: (req, file, cb) =>{
        //   cb(null, `./tmp/`)
        // },
        filename: (req, file, cb) =>{
            const name = crypto.randomBytes(30).toString('hex');
            const ext = path.extname(file.originalname);
            const filename = `${name}${ext}`;
            cb(null, filename)
        }
    })

const fileFiltered = (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    try {
      if (fileSize > 5 * 1024 * 1024) throw 'File Picture more than 5MB'
      if ((!file.originalname.match(/\.(jpg|jpeg|png)$/))) throw ('File Picture format must PNG, JPG , or JPEG')
      cb(null, true);
    } catch (error) {
        console.log(error)
      cb(new createError(400, error))
    }
  }
  
  const upload = multer({
    storage: fileStorage,
    limits: {
      fieldSize: 5 * 1024 * 1024 
    },
    fileFilter: fileFiltered
  })

module.exports = upload;