const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
router.use(passport.initialize());
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get('/',authentication.renderLogin);
router.get('/registation',authentication.renderRegistation);
router.post('/api/registation',authentication.registation);
router.post('/api/login',authentication.login);

router.get("/r",authMiddleware,passport.authenticate('jwt', { session: false }),(req,res) => {
  res.send("logged");
})

//  ==================== user ===================== // 
// router.post('/addUser',userCrud.createUser);


module.exports = router;