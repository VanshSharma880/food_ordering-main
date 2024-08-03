import nodemailer from 'nodemailer';

function MailSender(email, url){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'svansh880@gmail.com',
          pass: 'tabmjeklsdkl'
        }
      });
      
      var mailOptions = {
        from: 'svansh880@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: url
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error;
        }
      });
}

export default MailSender;