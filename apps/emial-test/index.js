const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    // user: "邮箱地址",这里先用xxx代替
    user: "xxx@qq.com",
    // pass: "邮箱授权码",这里先用xxx代替
    pass: "xxx",
  },
});

async function main() {
  const info = await transporter.sendMail({
    // 这里先用xxx代替
    from: '"zxp" <xxx@qq.com>',
    // 这里先用xxx代替
    to: "xxx@qq.com",
    subject: "Hello",
    html: fs.readFileSync("./bird.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
