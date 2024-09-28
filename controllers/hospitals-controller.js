//? -------------- Imports --------------

const { response } = require("express");
const Hospital = require("../models/hospital-model");


//? -----------------------------------------------------
//? Controller to get all hospitals
//? -----------------------------------------------------

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find().
        populate('user', 'str_name_user')

    try {

        return res.status(200).json({
            ok: true,
            hospitals
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
//? Controller to get a hospital by ID
//? -----------------------------------------------------

const getHospitalById = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(uid)

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            })
        }

        await hospitalDB.populate('user', 'str_name_user')

        return res.status(200).json({
            ok: true,
            hospital: hospitalDB
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
//? Controller to create a new hospital
//? -----------------------------------------------------

const createHospital = async (req, res = response) => {

    const uid = req.uid;
    const newHospital = new Hospital({
        user: uid,    
        ...req.body
    });

    try {

        const hospitalDB = await newHospital.save();

        return res.status(200).json({
            ok: true,
            hospital: hospitalDB
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
//? Controller to update a hospital
//? -----------------------------------------------------

const updateHospital = async (req, res = response) => {

    const uid = req.params.id;

    
    try {
        
        const hospitalDB = await Hospital.findById(uid);
    
        if( !hospitalDB ){
            return res.status(404).json({
                ok:false,
                msg: 'Hospital no encontrado por id',
            })
        }

        const { str_name_hospital, str_img_hospital, user  } = req.body;

        const hospitalUpdated = await Hospital.findByIdAndUpdate(uid, {
            str_name_hospital,
            str_img_hospital,
            user
        }, { new: true });

        return res.status(200).json({
            ok: true,
            hospital: hospitalUpdated
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
//? Controller to delete a hospital
//? -----------------------------------------------------

const deleteHospital = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(uid);

        if( !hospitalDB ){
            return res.stauts(404).json({
                ok:false,
                msg: 'Hospital no encontrado por id',
            })
        }

        await Hospital.findByIdAndDelete(uid);

        return res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        });
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }


}

module.exports = {
    getHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    deleteHospital
}