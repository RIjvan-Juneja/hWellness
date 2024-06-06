const db = require("../models/index");

const markAsDone = async (req,res) => {
  try {
    let secretKey = req.params.secretKey;
    const date = new Date();
    const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');
    let update = await db.MedicationLog.update({ taken_at : '2024-06-05 11:47:56'},{
      where: {
        link : secretKey,
      },
    });
    
    if(update[0]){
      return res.send("Thank You, For take Medicene");
    }
    res.send("No Data Found")
  } catch (error) {
    console.log(error);
    res.send("Opps! Something want Wrong");
  }
}

module.exports = { markAsDone };