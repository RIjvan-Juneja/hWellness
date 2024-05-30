const express = require("express");
const router = express.Router();

const authentication = require("../controllers/authentication.controller");

router.get('/',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.addUser);

//  ==================== user ===================== // 
// router.post('/addUser',userCrud.createUser);


module.exports = router;