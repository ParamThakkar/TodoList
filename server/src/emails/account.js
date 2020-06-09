const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from: 'thakkarparam.2000@gmail.com',
        subject: 'Thanks for joining us!!',
        text: `Welcome to the Task-Manager app,${name}.Let me know how you came over here.` 
    })
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'thakkarparam.2000@gmail.com',
        subject: 'About leaving our app',
        text: `I saw that you choose not to use our app,${name}.Can i get to know,why?`,
    })
}

// sendWelcomeEmail('parampallu@gmail.com','Param Thakkar')
// console.log('done')
 module.exports={
     sendWelcomeEmail,
     sendCancelEmail
}