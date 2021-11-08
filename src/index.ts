import './config/dotenv'
import middy from 'middy'
import helloHandler from './handlers/helloHandler'
import registerMiddleware from './middlewares/registerMiddleware'

export const hello = middy(helloHandler)
  .use(registerMiddleware())