const express = require("express");
const useRouter = require('./routes/router.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(cookieParser()); 
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.use("/",useRouter);

app.listen(PORT, (err)=>{
    if(err){
        console.log("connection error");
    } else {
        console.log(`Server is : http://${HOST}:${PORT}/login`);
    }
})


