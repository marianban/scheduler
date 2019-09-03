/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

exports.handler = function(event, context) {
  //eslint-disable-line
  console.log(`value1 = ${event.key1}`);
  console.log(`value2 = ${event.key2}`);
  console.log(`value3 = ${event.key3}`);
  context.done(null, 'Hello World'); // SUCCESS with message

  // use streamarn to subscribe to user model table and send email
  // https://github.com/aws-amplify/amplify-cli/issues/1760
  // https://docs.aws.amazon.com/lambda/latest/dg/with-ddb-example.html
};
