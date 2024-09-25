//? -------------- Imports --------------

const { response } = require("express");
const Hospital = require("../models/hospital-model");


//? -----------------------------------------------------
//? Controller to get all hospitals
//? -----------------------------------------------------

const getHospitals = async (req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'getHospitals'
    })

}


//? -----------------------------------------------------
//? Controller to create a new hospital
//? -----------------------------------------------------

const createHospital = async (req, res = response) => {

}

//? -----------------------------------------------------
//? Controller to update a hospital
//? -----------------------------------------------------

const updateHospital = async (req, res = response) => {

}

//? -----------------------------------------------------
//? Controller to delete a hospital
//? -----------------------------------------------------

const deleteHospital = async (req, res = response) => {

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}