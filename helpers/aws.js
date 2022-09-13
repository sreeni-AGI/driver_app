const AWS = require('aws-sdk');
const { config } = require('../config');

// s3 config
const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID, // your AWS access id
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY, // your AWS access key
});

async function uploadFile(file) {
  const params = {
    Bucket: config.AWS_BUCKET,
    Key: `temp/${Date.now()}_${file.name}`,
    Body: file.data,
    ACL: 'public-read',
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the url location
}

async function moveFile(destFolder='buddy', fileName) {
  fileName = fileName.slice(4);
  const s3Params = {
    Bucket: config.AWS_BUCKET,
    CopySource: `${config.AWS_BUCKET}/temp/${fileName}`,
    Key: `${destFolder}/${fileName}`,
  };
  await s3.copyObject(s3Params).promise();
  await s3.deleteObject({ Bucket: config.AWS_BUCKET, Key: `temp/${fileName}` }).promise();
}

module.exports = { uploadFile, moveFile };
