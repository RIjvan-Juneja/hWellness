const sendMail = require("../services/sendMail");
const jwt = require('jsonwebtoken');
const functions = require("../helpers/functions");
const bcrypt = require('bcryptjs');
const db = require("../models/index");

const renderRegistation = (req, res) => {
  res.render("pages/registation.ejs");
}

const renderDashboard = (req, res) => {
  res.render("pages/dashboard.ejs", { user : req.user});
}

const renderLogin = (req, res) => {
  if(typeof  req.cookies.jwt != "undefined")  {
    return res.redirect('/dashboard'); 
  }else {
    res.render("pages/login.ejs");
  }
}

const registation = async (req, res) => {
  try {

    let salt = functions.randomString(4);
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      age: req.body.age,
      salt: salt,
      password_hash: functions.encryptString(salt + req.body.password)
    }

    const html = `<p>Your Username Is : ${data.email} </p> </br>
                  <p>Your Password Is : ${req.body.password} </p> </br>`;

    await db.User.create(data);
    sendMail.sendEmail(req.body.email, 'hWellness,  Thank You For Registation', 'hWellness', html, null);
    res.status(200).send({ status: 'ok' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const login = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await db.User.findOne({ where: { email : username } });
    let password = functions.encryptString(user.dataValues.salt  + req.body.password);
    
    if (!user || !(user.dataValues.password_hash == password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    } else {
      
      let payload = { 
        id: user.id,
        session_token : functions.randomString(6)
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
      res.cookie('jwt', token, {
        httpOnly: true, 
        maxAge: 3600000 // 1 hour expiration
      });

      db.Session.create({
        user_id : payload.id, 
        device_info : req.ip,
        session_token : payload.session_token
      });
      res.status(200).send({ status: 'ok' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Internal Server error",  msg: "An unexpected error occurred while processing your request"});
  }
};

const logout = async (req, res) => {
  
}


module.exports = { renderRegistation, renderLogin, registation, login,renderDashboard };