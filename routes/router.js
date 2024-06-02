const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");
const parser = require("../middleware/cloudinaryFileUpload");
require("../controllers/notification")
router.get('/login',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);
router.get('/dashboard',authMiddleware,authentication.renderDashboard);

// ==================== user ===================== //
router.get('/medication',medication.renderMedication);
router.get('/medication/add',authMiddleware,medication.renderMedicationForm);
router.post('/medication/api/add',authMiddleware,parser.parser.single('image'),medication.addMedication);

module.exports = router;