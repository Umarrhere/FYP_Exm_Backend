const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// aws.config.setPromisesDependency()
// aws.config.update({
//   region: process.env.AWSREGION,
//   apiVersion: 'latest',
//   accessKeyId: process.env.AWSACCESSKEY,
//   secretAccessKey: process.env.AWSSECRETKEY,
  
// })
// const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    console.log('Hereeeeeeeeee');
  const validMimetype = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpg',
  ]
  console.log("[FileHandler::fileFilter file]",file)
  if (validMimetype.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb('Invalid file uploaded.', false)
  }
}

// module.exports = multer({
//   fileFilter,
//   storage: multerS3({
//     s3: s3,
//     bucket: 'duty-roaster',
//     Acl: 'public-read-write',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname })
//     },
//     key: function (req, file, cb) {
//       cb(null, 'public/' + Date.now().toString() + '_' + file.originalname)
//     },
//   }),
// })


// for local storage
const upload = multer({
  fileFilter,
  storage: multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Here is me');
    cb(null, "Uploads/attachments");
  },
  filename: (req, file, cb) => {
    console.log('Here is me');
    const ext = file.mimetype.split("/")[1];
    cb(null, `attachment-${file.fieldname}-${Date.now()}.${ext}`);
  },
})
})

  module.exports = {
    upload
  }
  
