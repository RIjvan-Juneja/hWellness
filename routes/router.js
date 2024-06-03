const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");
const parser = require("../middleware/cloudinaryFileUpload");
require("../controllers/notification")

// =============== authentication =================//
router.get('/login',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);
router.get('/dashboard',authMiddleware,authentication.renderDashboard);
router.get('/logout',authMiddleware,authentication.logout);
router.post('/logout/all',authMiddleware,authentication.logoutFromAll);

// ==================== user ===================== //
router.get('/medication',authMiddleware,medication.renderMedicationList);
router.get('/medication/add',authMiddleware,medication.renderMedicationForm);
router.post('/medication/api/list',authMiddleware,medication.displayMedication);
router.post('/medication/api/add',authMiddleware,parser.parser.single('image'),medication.addMedication);

module.exports = router;