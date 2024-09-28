/*
    Path: /api/doctors
*/

//? ------------------- Imports -------------------
const { Router } = require('express');
const { check} = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById } = require('../controllers/doctors-controller');

const router = Router();

//? ---------------------------------------------------
//? --------------- Gets Doctors Route --------------
//? ---------------------------------------------------

router.get('/', getDoctors);


//? ---------------------------------------------------
//? --------------- Get Doctor by ID Route --------------
//? ---------------------------------------------------

router.get("/:id", [
    validateJWT,
    check('id', 'El id del doctor debe ser válido').isMongoId(),
    validateFields
], getDoctorById);


//? ---------------------------------------------------
//? --------------- Create Doctors Route --------------
//? ---------------------------------------------------

router.post('/', [
    validateJWT,
    check('str_name_doctor', 'El nombre del doctor es un campo requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validateFields
], createDoctor);

//? ---------------------------------------------------
//? --------------- Update Doctors Route --------------
//? ---------------------------------------------------

router.put('/:id', [
    validateJWT,
    check('str_name_doctor', 'El nombre del doctor es un campo requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validateFields
], updateDoctor);

//? ---------------------------------------------------
//? --------------- Delete Doctors Route --------------
//? ---------------------------------------------------

router.delete('/:id', [
    validateJWT
], deleteDoctor);

//? ---------------------------------------------------
//? --------------- Export Module --------------
//? ---------------------------------------------------

module.exports = router;
