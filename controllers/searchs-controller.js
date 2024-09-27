//? ------------------------------------------
//? Importing the required modules
//? ------------------------------------------

const { response } = require('express'); 

const User = require('../models/user-module');
const Doctor = require('../models/doctor-model');
const Hospital = require('../models/hospital-model');


//? ------------------------------------------
//? Get search of users, doctors and hospitals
//? ------------------------------------------

const getSearch = async (req, res = response ) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i' );

    const [ users, doctors, hospitals ] = await Promise.all([
        User.find({ str_name_user: regex }),
        Doctor.find({ str_name_doctor: regex }),
        Hospital.find({ str_name_hospital: regex })
    ])
    
    try {

        return res.status(200).json({
            ok: true,
            users,
            doctors,
            hospitals
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

//? ------------------------------------------
//? Get Search by Collection
//? ------------------------------------------

const getSearchByCollection = async (req, res = response) => {

    const collection = req.params.collection;
    const search = req.params.search;

    const regex = new RegExp( search, 'i' );

    let data = [];

    switch (collection) {
        case 'users':
            data = await User.find({ str_name_user: regex });    
            break;

        case 'doctors':
            data = await Doctor.find({ str_name_doctor: regex })
                                .populate('user', 'str_name_user str_img_user')
                                .populate('hospital', 'str_name_hospital str_img_hospital');
            break;

        case 'hospitals':
            data = await Hospital.find({ str_name_hospital: regex })
                                .populate('user', 'str_name_user str_img_user');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La colección tiene que ser users, doctors o hospitals'
            })
    }
    

    return res.status(200).json({
        ok: true,
        result: data
    })

}



module.exports = {
    getSearch,
    getSearchByCollection
}