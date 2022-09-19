const router = require('express').Router();
const { moveFile } = require('../helpers/aws');

router.post('/', async (req, res)=>{
    try {
        const location = 'https://buddyapp-dev-bucket.s3.me-south-1.amazonaws.com/temp/1663075845305_download.jpg';
        await moveFile(location.slice(location.lastIndexOf('/')+1));
        res.json({location: location.replace('temp', 'buddy')})
    } catch (error) {
        res.send(error)
    }

});

module.exports = router;
