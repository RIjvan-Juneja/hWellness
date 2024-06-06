const sendMail = require("../services/sendMail");
const bcrypt = require('bcryptjs');
const db = require("../models/index");

const addMedication = async (req, res) => {
  try {
    let data;

    if(req.body.form_type == 'oto'){
      data = {
        user_id: req.user.id,
        name: req.body.name,
        notes:req.body.note,
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
        name: req.body.name,
        notes:req.body.note,
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

const displayMedication = async (req,res) => {
  try {
    const medications = await db.Medication.findAll({
      attributes : [['file_path', 'image'],'name','notes','start_date', 'end_date','time', 'recurrence', 'day_of_week'],
      where : {
        user_id : req.user.id || 0
      }
    }); 
    res.status(200).send(medications);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}
module.exports = { addMedication, displayMedication };