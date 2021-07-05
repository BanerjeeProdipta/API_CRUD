const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async(event) => {
    let body;
    let statusCode = 200;

    try {
        let params = {
            TableName: 'todo-application',
            Item: {
                id: event.id,
                completionStatus: event.completionStatus,
                title: event.title,
                body: event.body,
            },
        };

        // Using await, make sure object writes to DynamoDB table before continuing execution
        await documentClient
            .put(params)
            .promise()
            .then(() => {
                body = {
                    Operation: 'POST',
                    Message: 'SUCCESS',
                    Item: event,
                };
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