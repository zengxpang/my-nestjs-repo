const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "2531069259@qq.com",
    pass: "svcnioyqxqbhdhif",
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"zxp" <2531069259@qq.com>',
    to: "2531069259@qq.com",
    subject: "Hello",
    text: "我是曾小胖本人 over",
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
