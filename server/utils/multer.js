const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.mp4' &&
      ext != '.mkv' &&
      ext !== '.mov'
    ) {
      cb(new Error('File type is not supported'), false);
      console.log('working multer');
      return;
    }
    cb(null, true);
  },
});
