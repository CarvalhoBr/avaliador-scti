import { Context, APIGatewayEvent} from 'aws-lambda'
import Speaker from '../models/Speaker';

const hello = async (event: APIGatewayEvent, context: Context, callback: any) => {
  
  const speakers = await Speaker.findAll()
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      speakers
    }),
  };

  callback(null, response);
};

export default hello;