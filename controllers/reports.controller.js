const fs = require('fs');
const path = require('path');

const renderReports = (req, res) => {
  res.render("pages/reports.ejs", { user : req.user });
}

const userReports = async (userId) =>{

  const reportsFolder = path.join(__dirname,'..','reports');

  try {
    let obj = [];
    // Read the directory
    fs.readdir(reportsFolder, (err, files) => {
      if (err) {
          return console.error('Unable to scan directory: ' + err);
      }
      
      // Filter CSV files
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
      
      // Log CSV files
      csvFiles.forEach(file => {
        console.log(file);
      });
      
    });
  } catch (error) {
    console.log(error);
  }
  
}
userReports(1)

module.exports = { renderReports, userReports };


