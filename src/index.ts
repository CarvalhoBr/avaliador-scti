import './config/dotenv'
import middy from 'middy'
import helloHandler from './handlers/helloHandler'
import registerMiddleware from './middlewares/registerMiddleware'
import WorkshopController from './controllers/WorkshopController'

const workshopController = WorkshopController.getInstance()

export const hello = middy(helloHandler)
  .use(registerMiddleware())

export const createWorkshop = middy(workshopController.create)
  .use(registerMiddleware())