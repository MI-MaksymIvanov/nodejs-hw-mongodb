import path from 'node:path';

import multer from 'multer';

const storage = multer.diskStorage({
  // де зберігаємо
  destination: function (req, file, callback) {
    // console.log(file);
    callback(null, path.resolve('src', 'tmp'));
  },
  // з якою назвою
  filename: function (req, file, callback) {
    // console.log(file);

    const uniqePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    callback(null, uniqePrefix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
