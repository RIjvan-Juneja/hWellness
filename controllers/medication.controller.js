const sendMail = require("../services/sendMail");
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
    console.log(req.body);
    let data;

    if(req.body.form_type == 'oto'){
      data = {
        user_id: req.user.id,
        file_path: req.file.path,
        start_date: req.body.start_date,
        end_date: req.body.start_date,
        time: req.body.time,
        recurrence: 'oto',  // daily or weekly
        day_of_week: null,
      }
    }else {
      data = {
        user_id: req.user.id,
        file_path: req.file.path,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        time: req.body.time,
        recurrence: req.body.routing,  // daily or weekly
        day_of_week: (req.body.routing == 'weekly')? req.body.day : null,
      }
    }
    
    db.Medication.create(data);
    res.status(200).send({ status: 'ok' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

module.exports = { renderMedication, renderMedicationForm,  addMedication};