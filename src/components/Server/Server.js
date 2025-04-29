const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '24cl8077@medinebees.org',
        pass: 'pgsq-911'
    }
});

app.post('/message', (req, res) => {
    const {
        name = '',
        email = '',
        role = '',
        org = '',
        done = '',
        more = '',
        price = '',
        launch = '',
        message = '',
        inquiryType = ''
    } = req.body;

    const mail = {
        from: name,
        to: '24cl8077@medinabees.org',  //Change this to your email address
        subject: 'Contact form message',
        text:
            `Message from: ${name} (${email})
     
     Type of inquiry: ${inquiryType}
     ${inquiryType === 'Business' ? `Role: ${role}
     Organization: ${org}
     What needs to be done: ${done}
     More information: ${more}
     Price range: ${price}
     Target launch: ${launch}` : ''}
     Message: ${message}`
    };

    transporter.sendMail(mail, (err) => {
        if (err) {
            res.json({
                status: 'fail'
            });
        } else {
            res.json({
                status: 'success'
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
