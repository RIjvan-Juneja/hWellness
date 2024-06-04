const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const renderController = require("../controllers/render.controller");
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");
const parser = require("../middleware/cloudinaryFileUpload");
const reports = require("../controllers/reports.controller");
require("../controllers/notification");
require("../controllers/worker");

// ================== render pages ==================//

router.get('/login',renderController.renderLogin);
router.get('/registation',renderController.renderRegistation);
router.get('/dashboard',authMiddleware,renderController.renderDashboard);
router.get('/medication',authMiddleware,renderController.renderMedicationList);
router.get('/medication/add',authMiddleware,renderController.renderMedicationForm);
router.get('/reports',authMiddleware,renderController.renderReports);

// =============== authentication =================//

router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);
router.get('/logout',authMiddleware,authentication.logout);
router.post('/logout/all',authMiddleware,authentication.logoutFromAll);

// ==================== Panel ===================== //

router.post('/medication/api/list',authMiddleware,medication.displayMedication);
router.post('/medication/api/add',authMiddleware,parser.parser.single('image'),medication.addMedication);
router.post('/reports/api',authMiddleware,reports.userReports);


module.exports = router;