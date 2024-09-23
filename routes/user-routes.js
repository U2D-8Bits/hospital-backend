/*
    Ruta: /api/users
*/

const { Router } = require("express");
const { getUsers } = require('../controllers/users-controller.js');


const router = Router();

router.get("/", getUsers );

module.exports = router;
