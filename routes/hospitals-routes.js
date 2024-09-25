/*
 Path: /api/hospitals
*/

//? ------------------- Imports -------------------
const { Router } = require('express');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals-controller');

const router = Router();

//? ---------------------------------------------------
//? --------------- Gets Hospitals Route --------------
//? ---------------------------------------------------

router.get('/', getHospitals);

//? ---------------------------------------------------
//? --------------- Create Hospitals Route --------------
//? ---------------------------------------------------

router.post('/', createHospital);

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