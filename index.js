require('dotenv').config()

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use('/v1', route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
       auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         },
    secure: true,
    });

    route.post('/sendmail', (req, res) => {
        const { from, subject, text } = req.body
        
        const mailData = {
            from: from,
            to: process.env.MAIL_TO,
            subject: `Hai ricevuto un nuovo messaggio da ` + subject,
            text: text,
        };
    
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({ message: "Message sent" });
        });
    })
