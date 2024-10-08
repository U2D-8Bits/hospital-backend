//? ------------- Imports --------------

const { response } = require("express");
const Doctor = require("../models/doctor-model");

//? -----------------------------------------------------
//? Controller to get all doctors
//? -----------------------------------------------------

const getDoctors = async (req, res = response) => {

  const since = Number(req.query.since) || 0;

  const [doctors, total] = await Promise.all([
    await Doctor
    .find({}, "str_name_doctor str_img_doctor user hospital")
    .populate('user', 'str_name_user str_img_user')
    .populate('hospital', 'str_name_hospital str_img_hospital')
    .skip(since)
    .limit(10),
    await Doctor.countDocuments()
  ])

  try {
    
    return res.status(200).json({
      ok: true,
      doctors,
      total
    })

  } catch (error) {
    
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })

  }


};


//? -----------------------------------------------------
//? Controller to get a doctor by ID
//? -----------------------------------------------------

const getDoctorById = async (req, res = response) => {

  const id = req.params.id;

  try {

    const doctorDB = await Doctor.findById(id)
    .populate('user', 'str_name_user')
    .populate('hospital', 'str_name_hospital');

    if( !doctorDB ){
      return res.status(404).json({
        ok: false,
        msg: 'Doctor no encontrado por id'
      })
    }

    return res.status(200).json({
      ok: true,
      doctor: doctorDB
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    })
  }

}



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

  const id = req.params.id;
  const uid = req.uid;

  
  try {
      
      const doctorDB = await Doctor.findById(id);
  
      if( !doctorDB ){
          return res.status(404).json({
              ok:false,
              msg: 'Doctor no encontrado por id',
          })
      }

      const doctorChanges = {
          ...req.body,
          user: uid
      }

      const doctorUpdated = await Doctor.findByIdAndUpdate( id, doctorChanges, { new: true } );

      return res.status(200).json({
          ok: true,
          doctor: doctorUpdated
      })

  } catch (error) {
      
      console.log(error);
      return res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador'
      })

  }


}

//? -----------------------------------------------------
//? Controller to delete a doctor
//? -----------------------------------------------------

const deleteDoctor = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctorDB = Doctor.findById(id);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un doctor con ese id",
      });
    }

    await Doctor.findByIdAndDelete(id);

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
};

//? -----------------------------------------------------
//? Export Module
//? -----------------------------------------------------

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
