import { Context, APIGatewayEvent} from 'aws-lambda'

const hello = (event: APIGatewayEvent, context: Context, callback: any) => {
  console.log(`Lambda working in stage ${process.env.NODE_ENV}`)
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

export default hello;