const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = function (callback) {
  let params = {
    TableName: 'todo-application',
  };

  documentClient.scan(params, function (err, data) {
    console.log(data);
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
