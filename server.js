const express = require("express");
const useRouter = require('./routes/router.js');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use("/",useRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.set('view engine', 'ejs');

app.listen(PORT, (err)=>{
    if(err){
        console.log("connection error");
    } else {
        console.log(`Server is : http://${HOST}:${PORT}/hWellness`);
    }
})


