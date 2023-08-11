import multer from 'multer'
import path from 'path'
const upload_folder = './upload/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_folder)
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname)
    const filename =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now()
    cb(null, filename + fileExt)
  },
})
const uploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true)
      } else {
        cb(
          new Error(
            "Only .png, .jpg, .jpeg formats are allowed as book's image"
          )
        )
      }
    }
    if (file.fieldname === 'bookPdf') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true)
      } else {
        cb(new Error("Only pdf is allowed as Book's pdf"))
      }
    }
  },
})

export const uplodHelper = {
  uploadFile,
}
