const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;

  try {
    let params = {
      TableName: 'todo-application',
      Item: {
        id: context.awsRequestId,
        completionStatus: false,
        title: event.title,
        body: event.body,
      },
    };

    // Using await, make sure object writes to DynamoDB table before continuing execution
    await documentClient.put(params).promise();
    body = {
      Operation: 'POST',
      Message: 'SUCCESS',
      Item: params.Item,
    };
  } catch (err) {
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body,
  };
};
