//? ------------- Imports --------------

const { response } = require("express");
const Doctor = require('../models/doctor-model');

//? -----------------------------------------------------
//? Controller to get all doctors
//? -----------------------------------------------------

const getDoctors = async (req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'getDoctors'
    })

}

//? -----------------------------------------------------
//? Controller to create a new doctor
//? -----------------------------------------------------

const createDoctor = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'createDoctor'
    })
}

//? -----------------------------------------------------
//? Controller to update a doctor
//? -----------------------------------------------------

const updateDoctor = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'updateDoctor'
    })
}

//? -----------------------------------------------------
//? Controller to delete a doctor
//? -----------------------------------------------------

const deleteDoctor = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

//? -----------------------------------------------------
//? Export Module
//? -----------------------------------------------------

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}