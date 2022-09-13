const AWS = require('aws-sdk');
const { config } = require('../config');

// s3 config
const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID, // your AWS access id
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY, // your AWS access key
});

async function uploadFile(file, location='temp') {
  const params = {
    Bucket: config.AWS_BUCKET,
    Key: `${location}/${Date.now()}_${file.name}`,
    Body: file.data,
    ACL: 'public-read',
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the url location
}

async function moveFile(){
    const s3Params = {
        Bucket: bucketName,
        CopySource: `${bucketName}/${sourceFolder}/${fileName}`,
        Key: `${destFolder}/${fileName}`
    };

function copyFile() {
  return s3.copyObject(s3Params).promise();
    }
}

module.exports = { uploadFile };
