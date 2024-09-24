/*
    Ruta: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users-controller.js");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

//? -----------------------------------------------------
//? Ruta para obtener todos los usuarios
//? -----------------------------------------------------
router.get("/", getUsers);


//? -----------------------------------------------------
//? Ruta para crear un nuevo usuario
//? -----------------------------------------------------
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
    validateFields,
  ],
  createUser
);

//? -----------------------------------------------------
//? Ruta para actualizar un usuario
//? -----------------------------------------------------

router.put(
  "/:id",
  [
    check("str_name_user", "El Nombre es un campo obligatorio").not().isEmpty(),
    check("str_role_user", "El Rol es un campo obligatorio").not().isEmpty(),
    check("str_email_user", "El Correo elctrónico es un campo obligatorio").isEmail(),
    validateFields,
  ],
  updateUser
);

//? -----------------------------------------------------
//? Ruta para eliminar un usuario
//? -----------------------------------------------------
router.delete("/:id", deleteUser);

module.exports = router;
