import nodemailer from "nodemailer";

export const sendMail= async (
  {to="",
    cc="",
    subject="Confim-Email",
    text="",
    html="",
    attachment=[]
    }={})=> {

    const transporter = nodemailer.createTransport({
        service:'gmail',
         auth: {
             user:process.env.EMAIL,
             pass: process.env.EMAIL_PASSWORD,
         },
       });

   // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"E-commerse" <${process.env.EMAIL}>`, // sender address
      to, 
      subject, 
      text, 
      html, 
      attachment,
    });
    return info

  }