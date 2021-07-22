const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = function (event, context, callback) {
  let scanningParams = {
    TableName: 'todo-application',
  };

  documentClient.scan(scanningParams, function (err, data) {
    console.log(data);
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
