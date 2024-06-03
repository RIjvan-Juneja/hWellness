const { Queue, Worker } = require('bullmq');
const sendMail = require("../services/sendMail");
const cron = require('node-cron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const db = require('../models/index');

// Define Redis connection details
const redisConnection = {
    host: '127.0.0.1',
    port: 6379,
};
  
// Initialize BullMQ queue
const reportQueue = new Queue('report-generation', { connection: redisConnection });

const generateReportForUser = async (user) => {
    const reportData = await db.Medication.findAll({
        attributes: ['id','start_date', 'end_date', 'time','recurrence', 'day_of_week', 'created_at'],
        where : {
          user_id : user.id
        }
    });

    console.log(reportData);

    let date = new Date();
    const csvFileName = `report.csv`
    const csvFilePath = path.join(__dirname, '..', 'reports', csvFileName);

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'id', title: 'Id'},
          { id: 'start_date', title: 'Start Date'},
          { id: 'end_date', title: 'End Date'},
          { id: 'time', title: 'Time'},
          { id: 'recurrence', title: 'Recurrence'},
          { id: 'day_of_week', title: 'Day Of Week'},
          { id: 'created_at', title: 'Add Date'},
        ]
    });

    if(reportData){
      await csvWriter.writeRecords(reportData);
    }

    return { 
        csvFilePath: csvFilePath,
        csvFileName: csvFileName
    };
}

// Define the job processing function
async function processReportJob(job) {
    let { user } = job.data;
    const { csvFilePath, csvFileName } = await generateReportForUser(user);
    console.log("file name: ", csvFileName, " file path: ", csvFilePath);
    // await mailService(user.email, 'Your Weekly Report', 'Report from thisDate to thisDate', null, csvFilePath, csvFileName);
    // fs.unlinkSync(csvFilePath);
}

const worker = new Worker('report-generation', processReportJob, { connection: redisConnection });

async function getUsers() {
    let users = await db.User.findAll({
        attributes: ['id', 'email']
    });

    console.log(users);
    return users;
}

const schedule = cron.schedule('* * * * *', async () => {
    const users = await getUsers();
    users.forEach(user => {
        reportQueue.add('generate-report', { user });
    });
    console.log('Scheduled jobs for user report generation.');
});

schedule.start();
// Error: connect ECONNREFUSED 127.0.0.1:6379
//     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1605:16) {
//   errno: -111,
//   code: 'ECONNREFUSED',
//   syscall: 'connect',
//   address: '127.0.0.1',
//   port: 6379
// }