
const User = require("./../Schema/schema")
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")

dotenv.config();
let pass = process.env.PASSWORD;
let EMAIL = process.env.EMAIL;
let VarificationEndpoint = process.env.VARIFICATIONENDPOINT;
let PasswordChangeEndpoint = process.env.PASSWORDCHANGEENDPOINT;
let CompanyName = process.env.COMPANYNAME;
let CompanyEmail = process.env.COMPANYEMAIL;

VerificationEmail = async (req, res) => {
    const { to , userName } = req.body;
    const link = await bcrypt.hash(userName, 10);
    const verificationLink = `${VarificationEndpoint}?secret=${link}&to=${to}`
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: pass,
            },
        });

        const mailOptions = {
            from: `"${CompanyName}" <${CompanyEmail}>`,
            to,
            subject: "Verify your Email",
            text: "",
            html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .message {
            color: #333333;
            margin: 20px 0;
        }
        .message p {
            margin: 0 0 10px;
            line-height: 1.6;
            text-align: left;
        }
        .verify-button-container {
            text-align: center;
            margin: 20px 0;
        }
        .verify-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffaa2b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="message">
            <p>Hi ${userName},</p>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        </div>
        <div class="verify-button-container">
            <a href="${verificationLink}" class="verify-button" target="_blank">Verify Email</a>
        </div>
        <div class="message">
            <p>If you didn’t sign up, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} ${CompanyName}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `,
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent', response: info.response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
    }
}


RecoveryEmail = async (req, res) => {
    const { to } = req.body;
    const user = await User.findOne({email : to})
    const link = await bcrypt.hash(user.username, 10);
    const verificationLink = `${PasswordChangeEndpoint}?secret=${link}&to=${to}`
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: pass,
            },
        });

        const mailOptions = {
            from: `"${CompanyName}" <${CompanyEmail}>`,
            to,
            subject: "Password Recovery",
            text: "",
            html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .message {
            color: #333333;
            margin: 20px 0;
        }
        .message p {
            margin: 0 0 10px;
            line-height: 1.6;
            text-align: left;
        }
        .verify-button-container {
            text-align: center;
            margin: 20px 0;
        }
        .verify-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffaa2b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="message">
            <p>Hi ${user.name},</p>
            <p>This email is for your password recovery. Please proceed further by clicking the button below:</p>
        </div>
        <div class="verify-button-container">
            <a href="${verificationLink}" class="verify-button" target="_blank">Change Password</a>
        </div>
        <div class="message">
            <p>If you didn’t sign up, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} ${CompanyName}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

    `,
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent', response: info.response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
    }
}


module.exports = {VerificationEmail, RecoveryEmail}