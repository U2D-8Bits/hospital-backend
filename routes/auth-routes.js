/*
    Path: /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login, googleSignIn } = require("../controllers/auth-controller");

const router = Router();


//? -----------------------------------------------------
//? Ruta para iniciar sesión (Login)
//? -----------------------------------------------------
router.post("/login", [
    check("str_email_user", "El correo electrónico es un campo obligatorio").isEmail(),
    check("str_password_user", "La contraseña es un campo obligatorio").not().isEmpty(),
    validateFields
], login );


//? -----------------------------------------------------
//? Ruta para iniciar sesión con Google
//? -----------------------------------------------------
router.post("/google", [
    check("token", "El token de Google es un campo obligatorio").not().isEmpty(),
    validateFields
], googleSignIn );



module.exports = router;