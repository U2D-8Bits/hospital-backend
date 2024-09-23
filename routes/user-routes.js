/*
    Ruta: /api/users
*/

const { Router } = require('express');


const router = Router();

router.get( '/', (req, res) =>{

    res.json({
        ok: true,
        usuarios: ({
            int_id_user: 123,
            str_name_user: 'Israel'
        })
    });

});


module.exports = router; 