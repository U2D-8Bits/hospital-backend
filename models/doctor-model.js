const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    
    str_name_doctor: {
        type: String,
        required: true
    },
    str_img_doctor: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    }
});

DoctorSchema.method('toJSON', function(){

    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema);