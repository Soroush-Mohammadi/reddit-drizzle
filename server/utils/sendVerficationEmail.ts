import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP2GO_USER,
    pass: process.env.SMTP2GO_PASS
  }
});

export async function sendVerificationEmail(email: string, code: string) {
  return transporter.sendMail({
    from: 'Reddit Clone <no-reply@test-y7zpl9892p045vx6.mlsender.net>',
    to: email,
    subject: 'Your verification code',
    html: `
      <p>Your verification code is:</p>
      <h2>${code}</h2>
      <p>This code expires in 10 minutes.</p>
    `
  });
}
