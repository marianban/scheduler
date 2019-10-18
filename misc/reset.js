var AWS = require('aws-sdk');
const { region, UserPoolId } = require('./reset.secret');

var dynamodb = new AWS.DynamoDB({ region });

emptyDynamoDBTables();
deleteCognitoUsers();

function emptyDynamoDBTables() {
  dynamodb.listTables({}, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data.TableNames);
      data.TableNames.forEach(tableName => {
        const params = {
          TableName: tableName
        };
        dynamodb.scan(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            deleteItems(tableName, data.Items);
          }
        });
      });
    }
  });
}

function deleteItems(tableName, items) {
  if (items.length) {
    const item = items.pop();
    var params = {
      Key: {
        id: item.id
      },
      TableName: tableName
    };
    dynamodb.deleteItem(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
        deleteItems(tableName, items);
      }
    });
  }
}

function deleteCognitoUsers() {
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    region
  });
  var params = {
    UserPoolId,
    AttributesToGet: []
  };
  cognitoidentityserviceprovider.listUsers(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      deleteUsers(data.Users);
    }
  });

  function deleteUsers(users) {
    if (users.length) {
      const user = users.pop();
      cognitoidentityserviceprovider.adminDeleteUser(
        {
          UserPoolId,
          Username: user.Username
        },
        (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
            deleteUsers(users);
          }
        }
      );
    }
  }
}
