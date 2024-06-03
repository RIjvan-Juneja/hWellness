const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");
const parser = require("../middleware/cloudinaryFileUpload");
const reports = require("../controllers/reports.controller");
require("../controllers/notification")
require("../controllers/worker")

// =============== authentication =================//
router.get('/login',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);
router.get('/logout',authMiddleware,authentication.logout);
router.post('/logout/all',authMiddleware,authentication.logoutFromAll);

// ==================== Panel ===================== //
router.get('/dashboard',authMiddleware,authentication.renderDashboard);
router.get('/medication',authMiddleware,medication.renderMedicationList);
router.get('/medication/add',authMiddleware,medication.renderMedicationForm);
router.post('/medication/api/list',authMiddleware,medication.displayMedication);
router.post('/medication/api/add',authMiddleware,parser.parser.single('image'),medication.addMedication);
router.get('/reports',authMiddleware,reports.renderReports);

module.exports = router;