const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("pages/home.ejs");
})

//  ==================== user ===================== // 
// router.post('/addUser',userCrud.createUser);


module.exports = router;