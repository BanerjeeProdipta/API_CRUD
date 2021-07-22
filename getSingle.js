const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  let body;
  let statusCode = 200;

  try {
    let params = {
      TableName: 'todo-application',
      Key: {
        id: event.pathParameters.id,
      },
    };
    let res = await documentClient.get(params).promise();
    if (res.Item === undefined) {
      statusCode = 400;
      body = 'No task found with id: ' + params.Key.id;
    } else body = JSON.stringify(res.Item);
  } catch (err) {
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body,
  };
};
