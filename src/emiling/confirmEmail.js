
import nodemailer from 'nodemailer'

export const sendEmail = async(options)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth: {
          user:"noort.mohamed@gmail.com",
          pass:"jrdamjhcdphgdfey"
        },
      });


    let info = await transporter.sendMail({
        from: '"noor" <noort.mohamed@gmail.com>',
        to: options.email ,
        subject: "Hello ✔", 
        html: options.html, 
      });
}