const AWS = require('aws-sdk');
const sesConfig = require('./ses.secret');
var dynamoConfig = require('./dynamo.secret');

var ses = new AWS.SES(sesConfig);

var dynamodb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

exports.handler = function(event, context, callback) {
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function(record) {
    if (record.eventName === 'MODIFY') {
      const dbRecord = record.dynamodb;
      if (dbRecord.OldImage.clientId.NULL && dbRecord.NewImage.clientId.S) {
        notifyUser(dbRecord.NewImage.clientId.S);
      }
    } else if (record.eventName === 'INSERT') {
      const dbRecord = record.dynamodb;
      if (dbRecord.NewImage.clientId.S) {
        notifyUser(dbRecord.NewImage.clientId.S);
      }
    }
  });
  callback(null, 'message');
};

function notifyUser(clientId) {
  var params = {
    TableName: 'User-ozqmzciqg5btvawgncd2vqri4e-dev',
    Key: {
      id: clientId
    }
  };
  dynamodb.get(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      sendAppointmentEmail(data.Item);
    }
  });
}

function sendAppointmentEmail(user) {
  ses.sendEmail(
    {
      Source: sesConfig.adminEmail,
      ReturnPath: sesConfig.adminEmail,
      Destination: {
        ToAddresses: [sesConfig.adminEmail]
      },
      Message: {
        Subject: {
          Data: 'New appointment'
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<h3>New Appointment</h3> <pre>${JSON.stringify(
              user,
              null,
              2
            )}</pre>`
          }
        }
      }
    },
    (err, data) => {
      if (err) {
        console.error(err, data);
      }
    }
  );
}

// how to create lambda trigger
// aws lambda create-event-source-mapping --function-name userfunc-dev \
//  --batch-size 100 --starting-position LATEST --event-source arn:aws:dynamodb:eu-central-1:482339376943:table/Appointment-ozqmzciqg5btvawgncd2vqri4e-dev/stream/2019-07-06T07:26:08.857
