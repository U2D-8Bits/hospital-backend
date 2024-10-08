const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    str_name_user:{
        type: String,
        required: true
    },
    str_email_user:{
        type: String,
        required: true,
        unique: true
    },
    str_password_user:{
        type: String,
        required: true
    },
    str_img_user:{
        type: String,
    },
    str_role_user:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    bln_google_user:{
        type: Boolean,
        default: false
    }

});

UserSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.str_user_id = _id;
    return object;
})

module.exports = model('User', UserSchema);