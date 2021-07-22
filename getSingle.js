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
    await documentClient
      .get(params)
      .promise()
      .then((response) => {
        body = JSON.stringify(response.Item);
      });
  } catch (err) {
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body,
  };
};
