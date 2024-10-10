/*
 Path: /api/hospitals
*/

//? ------------------- Imports -------------------
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateAdminRole } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getHospitals, createHospital, updateHospital, deleteHospital, getHospitalById, getAllHospitals } = require('../controllers/hospitals-controller');

const router = Router();

//? ---------------------------------------------------
//? --------------- Gets Hospitals With Pagination Route --------------
//? ---------------------------------------------------

router.get('/', getHospitals);


//? ---------------------------------------------------
//? --------------- Get All Hospital --------------
//? ---------------------------------------------------

router.get('/all', [validateJWT], getAllHospitals )

//? ---------------------------------------------------
//? --------------- Get Hospital by ID Route ----------
//? ---------------------------------------------------

router.get('/:id', [
    validateJWT,
    validateAdminRole,
    check('id', 'Id del hospital es un campo requerido').not().isEmpty(),
    validateFields
],
    getHospitalById
)


//? ---------------------------------------------------
//? --------------- Create Hospitals Route --------------
//? ---------------------------------------------------

router.post('/', [
    validateJWT,
    validateAdminRole,
    check('str_name_hospital', 'Nombre del hospital es un campo requerido').not().isEmpty(),
    validateFields
], createHospital);

//? ---------------------------------------------------
//? --------------- Update Hospitals Route --------------
//? ---------------------------------------------------

router.put('/:id', [
    validateJWT,
    validateAdminRole,
    check('str_name_hospital', 'Nombre del hospital es un campo requerido').not().isEmpty(),
    validateFields
], updateHospital);

//? ---------------------------------------------------
//? --------------- Delete Hospitals Route --------------
//? ---------------------------------------------------

router.delete('/:id', [
    validateJWT,
    validateAdminRole,
], deleteHospital);

//? ---------------------------------------------------
//? --------------- Export Module --------------
//? ---------------------------------------------------

module.exports = router;