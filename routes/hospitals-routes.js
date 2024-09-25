/*
 Path: /api/hospitals
*/

//? ------------------- Imports -------------------
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals-controller');

const router = Router();

//? ---------------------------------------------------
//? --------------- Gets Hospitals Route --------------
//? ---------------------------------------------------

router.get('/', getHospitals);

//? ---------------------------------------------------
//? --------------- Create Hospitals Route --------------
//? ---------------------------------------------------

router.post('/', [
    validateJWT,
    check('str_name_hospital', 'Nombre del hospital es un campo requerido').not().isEmpty(),
    validateFields
], createHospital);

//? ---------------------------------------------------
//? --------------- Update Hospitals Route --------------
//? ---------------------------------------------------

router.put('/:id', updateHospital);

//? ---------------------------------------------------
//? --------------- Delete Hospitals Route --------------
//? ---------------------------------------------------

router.delete('/:id', deleteHospital);

//? ---------------------------------------------------
//? --------------- Export Module --------------
//? ---------------------------------------------------

module.exports = router;