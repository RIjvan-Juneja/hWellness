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

const addMedication = async (req, res) => {
  try {
      console.log(req.file.path);
  
    res.status(200).send({ status: 'ok' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}



module.exports = { renderMedication, renderMedicationForm,  addMedication};