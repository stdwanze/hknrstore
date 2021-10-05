const moment = require('moment');
const nodemailer = require("nodemailer");
const config = require('./config');


let transporter = nodemailer.createTransport({
    service: '1und1', // no need to set host or port etc.
    auth: {
        user: config.mailuser,
        pass: config.mailpw ,
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function send(message) {


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.mailuser, // sender address
    to: config.mailto,  // list of receivers
    subject: "Hnkr "+ message.when, // Subject line
    text: "Hnkr Wakeup "+ message.body, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
function notify(state){

    var d = new Date(state.time);
    var formatable = moment(d);
    send({ when: formatable.format("HH:mm"), body: JSON.stringify(state)}).catch(console.error);

}

module.exports ={
    notify
}