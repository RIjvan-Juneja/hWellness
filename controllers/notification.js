const cron = require('node-cron');
const db = require('../models/index');
const sendEmail = require('../services/sendMail');
const { Op } = require('sequelize');

// const getUserEmailById = async (userId) => {
//   // Implement logic to fetch user email by userId
//   const user = await User.findByPk(userId);
//   return user.email;
// };

// This cron job runs every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
  const currentDate = now.toISOString().split('T')[0]; 
  const currentDay = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase(); 

  console.log(currentDate,currentTime,currentDay);

  // One-time medication reminders
  const oneTimeMedications = await db.Medication.findAll({
    where: {
      start_date: {
        [Op.lte]: currentDate
      },
      end_date: {
        [Op.gte]: currentDate
      },
      time: currentTime
    }
  });

  // Daily medication reminders
  const dailyMedications = await db.Medication.findAll({
    where: {
      recurrence: 'daily',
      time: currentTime,
      start_date: { [Op.lte]: currentDate },
      end_date: { [Op.gte]: currentDate }
    }
  });

  // Weekly medication reminders
  const weeklyMedications = await db.Medication.findAll({
    where: {
      recurrence: 'weekly',
      day_of_week: currentDay,
      time: currentTime,
      start_date: { [Op.lte]: currentDate },
      end_date: { [Op.gte]: currentDate }
    }
  });

  const allMedications = [...oneTimeMedications, ...dailyMedications, ...weeklyMedications];
  console.log(allMedications);
  for (const medication of allMedications) {
    // const userEmail = await getUserEmailById(medication.user_id);
    sendEmail(userEmail, 'Medication Reminder', `It's time to take your medication.`);
  }
});
