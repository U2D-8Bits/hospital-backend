const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    str_name_hospital: {
        type: String,
        required: true
    },
    str_img_hospital: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

});

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Hospital', HospitalSchema);