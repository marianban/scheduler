const AWS = require('aws-sdk');

const sesConfig = require('./ses.secret');

var ses = new AWS.SES(sesConfig);

exports.handler = function (event, context) { //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function(record) {
    if (record.eventName === 'INSERT') {
      const dbRecord = record.dynamodb;
      if (dbRecord.NewImage.email.S) {
        sendWelcomeEmail(dbRecord.NewImage.email.S);
      }
    }
  })

  function sendWelcomeEmail(email) {
    const source = sesConfig.adminEmail.trim();
    console.log('sending email to: ', source, ', with data: ' + email);
    const sendPromise = ses.sendTemplatedEmail(
      {
        Source: source,
        ReturnPath: source,
        TemplateData: "{}",
        Destination: {
          ToAddresses: [source]
        },
        Template: 'WelcomeOwner'
      }
    ).promise();

    sendPromise.then(
      function(data) {
        console.log('email successfully sent');
        console.log(data);
        context.done(null, 'Email successfully sent');
      }
    ).catch(function(err) {
      console.error(err, err.stack);
      context.done(null, 'Email successfully sent');
    });
  }
};

