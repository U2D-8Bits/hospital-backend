/*
    Path: /api/doctors
*/

//? ------------------- Imports -------------------
const { Router } = require('express');
const { check} = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors-controller');

const router = Router();

//? ---------------------------------------------------
//? --------------- Gets Doctors Route --------------
//? ---------------------------------------------------

router.get('/', getDoctors);

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

router.put('/:id', updateDoctor);

//? ---------------------------------------------------
//? --------------- Delete Doctors Route --------------
//? ---------------------------------------------------

router.delete('/:id', deleteDoctor);

//? ---------------------------------------------------
//? --------------- Export Module --------------
//? ---------------------------------------------------

module.exports = router;
