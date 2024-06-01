const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");

router.get('/login',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);

 // ==================== user ===================== // 
router.get('/medication',medication.renderMedication);
router.get('/medication/add',authMiddleware,medication.renderMedicationForm);



module.exports = router;