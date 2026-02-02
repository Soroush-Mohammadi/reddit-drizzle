// removing smtp

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_NEW_API_KEY
});

export async function sendVerificationEmail(email: string, code: string) {
  const sentFrom = new Sender(
    'no-reply@test-y7zpl9892p045vx6.mlsender.net',
    'Reddit Clone'
  );

  const recipients = [new Recipient(email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Your verification code').setHtml(`
      <p>Your verification code is:</p>
      <h2>${code}</h2>
      <p>This code expires in 10 minutes.</p>
    `);

  return await mailerSend.email.send(emailParams);
}
