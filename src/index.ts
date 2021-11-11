import './config/dotenv'
import middy from 'middy'
import helloHandler from './handlers/helloHandler'
import registerMiddleware from './middlewares/registerMiddleware'
import WorkshopController from './controllers/WorkshopController'
import VerificationEmailHandler from './handlers/VerificationEmailHandler'
import ReportHandler from './handlers/ReportHandler'
import ReportEmailHandler from './handlers/ReportEmailHandler'

const workshopController = WorkshopController.getInstance()
const verificationEmailHandler = VerificationEmailHandler.getInstance()
const reportHandler = ReportHandler.getInstance()
const reportEmailHandler = ReportEmailHandler.getInstance()

export const hello = middy(helloHandler)
  .use(registerMiddleware())

export const createWorkshop = middy(workshopController.create)
  .use(registerMiddleware())

export const sendVerificationEmail = middy(verificationEmailHandler.process)
  .use(registerMiddleware())

export const rateWorkshop = middy(workshopController.rate)
  .use(registerMiddleware())

export const ratingReport = middy(reportHandler.handler)
  .use(registerMiddleware())

export const ratingEmail = middy(reportEmailHandler.handler)
  .use(registerMiddleware())