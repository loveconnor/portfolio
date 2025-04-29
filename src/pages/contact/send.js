const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const email = process.env.EMAIL;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/send/', function (req, res) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: 'Cando145!'
        }
    });

    let mailOptions;

    // Check if the request is a "Business" inquiry or a "Personal" inquiry
    if (req.body.inquiryType === 'Business') {
        mailOptions = {
            from: req.body.email,
            to: email,
            subject: `New Business Inquiry from ${req.body.name}`,
            html: `<p>You have a new business inquiry</p>
                   <h3>Contact Details</h3>
                   <ul>
                     <li>Name: ${req.body.name}</li>
                     <li>Email: ${req.body.email}</li>
                     <li>Role: ${req.body.role}</li>
                     <li>Organization: ${req.body.org}</li>
                     <li>What do you need done?: ${req.body.done}</li>
                     <li>Tell us More: ${req.body.more}</li>
                     <li>Price Range in USD: ${req.body.price}</li>
                     <li>Target Launch: ${req.body.launch}</li>
                   </ul>`,
        };
    } else if (req.body.inquiryType === 'Personal') {
        mailOptions = {
            from: req.body.email,
            to: email,
            subject: `New Personal Inquiry from ${req.body.email}`,
            html: `<p>You have a new personal inquiry</p>
                   <h3>Contact Details</h3>
                   <ul>
                     <li>Email: ${req.body.email}</li>
                     <li>Message: ${req.body.message}</li>
                   </ul>`,
        };
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Something went wrong. Try again later',
            });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({
                success: true,
                message: 'Thanks for contacting us. We will get back to you within a few days',
            });
        }
    });
});


app.listen(3000, function () {
    console.log('Server start on port 3000');
});
