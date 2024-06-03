const fs = require('fs');
const path = require('path');

const renderReports = (req, res) => {
  res.render("pages/reports.ejs", { user : req.user });
}

const userReports = async (req,res) =>{

  const reportsFolder = path.join(__dirname,'..','reports');
  try {
    let obj = [];
    // Read the directory
    fs.readdir(reportsFolder, (err, files) => {
      if (err) {
          return res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
      }
      // Filter CSV files
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
      // Log CSV files
      csvFiles.forEach((file,i) => {
        let arr = file.split("_");
        if(req.user.id == arr[0]){
          obj.push({
            id : i,
            userId : arr[0],
            date : arr[1],
            reportName : file
          });
        }
        console.log(file,arr);
      });
      res.status(200).send(obj);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

module.exports = { renderReports, userReports };


