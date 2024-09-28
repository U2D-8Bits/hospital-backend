//? ------------- Imports --------------

const { response } = require("express");
const Doctor = require("../models/doctor-model");

//? -----------------------------------------------------
//? Controller to get all doctors
//? -----------------------------------------------------

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "str_name_user")
    .populate("hospital", "str_name_hospital");

  return res.status(200).json({
    ok: true,
    doctors,
  });
};

//? -----------------------------------------------------
//? Controller to create a new doctor
//? -----------------------------------------------------

const createDoctor = async (req, res = response) => {
  const uid = req.uid;

  const newDoctor = new Doctor({
    user: uid,
    ...req.body,
  });

  try {
    const doctorDB = await newDoctor.save();

    return res.status(200).json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

//? -----------------------------------------------------
//? Controller to update a doctor
//? -----------------------------------------------------

const updateDoctor = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const doctorDB = Doctor.findById(uid);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un doctor con ese id",
      });
    }

    const { user, hospital, ...fields } = req.body;

    if (doctorDB.str_name_doctor != fields.str_name_doctor) {
      const existDoctor = await Doctor.findOne({
        str_name_doctor: fields.str_name_doctor,
      });

      if (existDoctor) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un doctor con ese nombre",
        });
      }
    }

    fields.user = uid;

    const doctorUpdated = await Doctor.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      doctor: doctorUpdated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

//? -----------------------------------------------------
//? Controller to delete a doctor
//? -----------------------------------------------------

const deleteDoctor = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const doctorDB = Doctor.findById(uid);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un doctor con ese id",
      });
    }

    await Doctor.findByIdAndDelete(uid);

    return res.status(200).json({
      ok: true,
      msg: "Doctor eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

  return res.status(200).json({
    ok: true,
    msg: "deleteDoctor",
  });
};

//? -----------------------------------------------------
//? Export Module
//? -----------------------------------------------------

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
