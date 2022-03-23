const nodemailer = require("nodemailer");


class sendEmail{

    constructor(user, url){
        console.log('MAIL USER',user);
        this.to = user.email;
        this.name = user.name;
        this.url = url;
    }

    newtransporter(){
        return nodemailer.createTransport({
            host:  process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth:{
                user: process.env.MAIL_USER , 
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendMail(){
        let mailOptions = {
            form: 'kritikaw0@gmail.com',
            to: this.to,
            subject: "Password Reset Mail", 
            // text: "", 
            html: `<b>Hello ${this.name},</b><br><br><p>Please click on the link below to set your password.<br>${this.url}</p><br><br>Thank you!`, 
        }
        
        await this.newtransporter().sendMail(mailOptions, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                console.log('SUCCESS');
            }
        })
    }
}

module.exports = sendEmail


