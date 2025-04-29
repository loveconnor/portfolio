const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const aws = require('@aws-sdk/client-ses');

const app = express();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const ses = new aws.SES({
  region: 'us-east-1',
});

const ORIGINS = ['https://connorlove.com', 'https://www.connorlovecom'];
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 16384;
const EMAIL = process.env.EMAIL;
const FROM_EMAIL = 'mailbot@connorlove.com';
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!ORIGINS.includes(origin)) {
        return callback(
          new Error(`Not allowed by CORS. Origin must be: ${ORIGINS.join(' or ')}`)
        );
      }

      return callback(null, true);
    },
  })
);
app.options('*', cors());

app.post('/message', async (req, res) => {
  try {
    const name = DOMPurify.sanitize(req.body.name);
    const email = DOMPurify.sanitize(req.body.email);
    const message = DOMPurify.sanitize(req.body.message);
    const role = DOMPurify.sanitize(req.body.role);
    const org = DOMPurify.sanitize(req.body.org);
    const more = DOMPurify.sanitize(req.body.more);
    const done = DOMPurify.sanitize(req.body.done);
    const price = DOMPurify.sanitize(req.body.price);
    const launch = DOMPurify.sanitize(req.body.launch);

    // Validate request
    if (!email || !EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Please enter a message' });
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        error: `Please enter an email fewer than ${MAX_EMAIL_LENGTH} characters`,
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Please enter a message fewer than ${MAX_MESSAGE_LENGTH} characters`,
      });
    }

    const emailBody = `
      From: ${name} <${email}>
      Role: ${role}
      Organization: ${org}
      What do you need done?: ${done}
      Tell us more: ${more}
      Price range in USD: ${price}
      Target Launch: ${launch}
      Message: ${message}
    `;

    // Send email using AWS SES
    await ses.sendEmail({
      Source: `Portfolio <${FROM_EMAIL}>`,
      Destination: {
        ToAddresses: [EMAIL],
      },
      Message: {
        Subject: { Data: `New message from ${name} <${email}>` },
        Body: {
          Text: { Data: emailBody },
        },
      },
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Rejected', error);
    return res.status(500).json({ error: 'Message rejected' });
  }
});


module.exports.handler = serverless(app);
