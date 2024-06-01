const sendMail = require("../services/sendMail");
const jwt = require('jsonwebtoken');
const functions = require("../helpers/functions");
const bcrypt = require('bcryptjs');
const db = require("../models/index");

const renderMedication = (req, res) => {
  res.render("pages/medicationlist.ejs", { user : req.user});
}

const renderMedicationForm = (req, res) => {
  res.render("pages/addMedicationForm.ejs", { user : req.user});
}

// const renderMedicationFormssss = async (req, res) => {
//   try {

//     let salt = functions.randomString(4);
//     const data = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       mobile_number: req.body.mobile_number,
//       age: req.body.age,
//       salt: salt,
//       password_hash: functions.encryptString(salt + req.body.password)
//     }

//     const html = `<p>Your Username Is : ${data.email} </p> </br>
//                   <p>Your Password Is : ${req.body.password} </p> </br>`;

//     await db.User.create(data);
//     sendMail.sendEmail(req.body.email, 'hWellness,  Thank You For Registation', 'hWellness', html, null);
//     res.status(200).send({ status: 'ok' });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
//   }
// }



module.exports = { renderMedication, renderMedicationForm };