const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, company, phone, email, brief } = req.body;

  // Configure your email transport (use your real credentials or environment variables)
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or 'hotmail', etc.
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  try {
    await transporter.sendMail({
      from: '"UXcellerate Contact" <YOUR_EMAIL@gmail.com>',
      to: 'Abedalaziz.seder@hotmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Company: ${company}
        Phone: ${phone}
        Email: ${email}
        Brief: ${brief}
      `
    });
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message.', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));