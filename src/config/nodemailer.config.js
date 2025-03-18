import nodemailer from 'nodemailer'
import config from './variables.js'

const transporter = nodemailer.createTransport({
  service: config.NODEMAILER.SERVICE,
  port: config.NODEMAILER.PORT,
  secure: true,
  auth: {
    user: config.NODEMAILER.USER,
    pass: config.NODEMAILER.PASSWORD,
  },
})

export const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: config.NODEMAILER.USER,
    to,
    subject,
    html,
  })

  console.log('Message sent: %s', info.messageId)
}
