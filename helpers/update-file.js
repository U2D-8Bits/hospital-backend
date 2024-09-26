const fs = require("fs");
const User = require("../models/user-module");
const Doctor = require("../models/doctor-model");
const Hospital = require("../models/hospital-model");

const deleteFile = (path) => {

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateFile = async (collection, uid, nameFile) => {
  switch (collection) {
    case "doctors":
      const existDoctor = await Doctor.findById(uid);
      if (!existDoctor) {
        console.log("Doctor no encontrado");
        return false;
      }

      const doctorPath = `./uploads/doctors/${existDoctor.str_img_doctor}`;

      deleteFile(doctorPath);

      existDoctor.str_img_doctor = nameFile;
      await existDoctor.save();
      return true;
    
    break;

    case "hospitals":
        const existHospital = await Hospital.findById(uid);
        if (!existHospital) {
          console.log("Hospital no encontrado");
          return false;
        }

        const hospitalPath = `./uploads/hospitals/${existHospital.str_img_hospital}`;
        deleteFile(hospitalPath);

        existHospital.str_img_hospital = nameFile;
        await existHospital.save();
        return true;

      break;

    case "users":
        const existUser = await User.findById(uid);
        if (!existUser) {
          console.log("Usuario no encontrado");
          return false;
        }

        const userPath = `./uploads/users/${existUser.str_img_user}`;
        deleteFile(userPath);

        existUser.str_img_user = nameFile;
        await existUser.save();
        return true;

      break;
  }
};

module.exports = {
  updateFile,
};
