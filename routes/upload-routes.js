const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');

const { uploadFile, getFile } = require('../controllers/uploads-controller');

const router = Router();
router.use(fileUpload());

router.put('/:collection/:id', 
    [
    validateJWT
    ],
    uploadFile
);


router.get('/:collection/:file', getFile );


module.exports = router;