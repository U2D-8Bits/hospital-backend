const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');

const { uploadFile } = require('../controllers/uploads-controller');

const router = Router();
router.use(fileUpload());

router.put('/:collection/:id', 
    [
    validateJWT
    ],
    uploadFile
);


module.exports = router;