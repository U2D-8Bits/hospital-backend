/*
    Ruta: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser } = require("../controllers/users-controller.js");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("str_name_user", "El Nombre es un campo obligatorio").not().isEmpty(),
    check("str_password_user", "La Contraseña es un campo obligatorio")
      .not()
      .isEmpty(),
    check(
      "str_email_user",
      "El Correo elctrónico es un campo obligatorio"
    ).isEmail(),
  ],
  createUser
);

module.exports = router;
