const sendMail = require("../services/sendMail");
const jwt = require('jsonwebtoken');
const functions = require("../helpers/functions");
const bcrypt = require('bcryptjs');
const db = require("../models/index");

const renderRegistation = (req, res) => {
  res.render("pages/registation.ejs");
}

const renderLogin = (req, res) => {
  res.render("pages/login.ejs");
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
    let password = 'c2b58cdfdb6bb5ba4cadd6d7f2e12257'
    if (!user || (await bcrypt.compare(password, user.password_hash))) {
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

module.exports = { renderRegistation, renderLogin, registation, login };