const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('./models/bugdet');

const Budget = mongoose.model('Budget');

const app = express();

app.use(express.json());

//app.use(cors());

app.options('*', cors());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    next();
});

mongoose.connect('mongodb://imersao:ElP0rtu25@cluster1-shard-00-00.fbwre.mongodb.net:27017,cluster1-shard-00-01.fbwre.mongodb.net:27017,cluster1-shard-00-02.fbwre.mongodb.net:27017/budgetApi?ssl=true&replicaSet=atlas-l765k5-shard-0&authSource=admin&retryWrites=true&w=majority',
{useNewUrlParser:true,
useUnifiedTopology:true}).catch((err) => {
    console.log('Error connecting' +err)
});

app.post('/budget', async (req,res) => {
    await Budget.create(req.body, (err) => {
        if (err) {
            return res.status(400).json({
            error: true,
            message: 'Register can not be created'
        });
        }else{ 
            return res.status(200).json({
            error: false,
            message: 'Register was created'
        });
        }
    });

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9edf29b6d60c8b",
            pass: "03ecf58ab46d82",
        },
    });

    var emailHtml = 'Dear Customer <br><br> We received your budget request <br><br> In another email you will receive the detail<br><br> Regards';
    var emailText = 'Dear Customer \n\n We received your budget request \n\n In another email you will receive the detail\n\n Regards';

    var emailSendInfo = {
        from: "1c5d233ec4-f96271@inbox.mailtrap.io",
        to: req.body.email,
        subject: "Budget Request",
        text: emailText,
        html: emailHtml,
    };
    await transport.sendMail(emailSendInfo, function(err){

        if (err) return res.status(400).json({
            error: true,
            message: 'Mail can not be sent'
        });

        return res.json({
            error: false,
            message: 'Register was created successfully'
        });

    });
});

app.listen(8080,() => {
    console.log("Started at port 8080")
});
