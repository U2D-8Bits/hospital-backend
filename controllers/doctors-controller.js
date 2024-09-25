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
    
    const uid = req.uid;
    
    const newDoctor = new Doctor({
        user: uid,
        ...req.body
    });


    try {
 
        const doctorDB = await newDoctor.save();

        return res.status(200).json({
            ok: true,
            doctor: doctorDB
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
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