/*
    Path: /api/search
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getSearch, getSearchByCollection } = require('../controllers/searchs-controller');

const router = Router();

router.get('/:search', [
    validateJWT
], getSearch);


router.get('/:collection/:search', [
    validateJWT
], getSearchByCollection);

module.exports = router;