import './config/dotenv'
import middy from 'middy'
import helloHandler from './handlers/helloHandler'
import registerMiddleware from './middlewares/registerMiddleware'
import WorkshopController from './controllers/WorkshopController'
import VerificationEmailHandler from './handlers/VerificationEmailHandler'

const workshopController = WorkshopController.getInstance()
const verificationEmailHandler = VerificationEmailHandler.getInstance()

export const hello = middy(helloHandler)
  .use(registerMiddleware())

export const createWorkshop = middy(workshopController.create)
  .use(registerMiddleware())

export const sendVerificationEmail = middy(verificationEmailHandler.process)
  .use(registerMiddleware())