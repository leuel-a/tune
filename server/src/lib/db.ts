import mongoose from 'mongoose'
import env from '../utils/env.utils'
import { logger } from '../utils/logger.utils'

export const connect = async () => {
  try {
    // TODO: check if you are in development mode or production mode
    // if you are in development mode, use the development database
    // if you are in production mode, use the production

    let dbUrl

    if (env.NODE_ENV === 'development') {
      dbUrl = env.DATABASE_URL_DEV
    } else {
      dbUrl = env.DATABASE_URL_PROD
    }

    await mongoose.connect(dbUrl)

    logger.info(`Connection to the database is successful`)
  } catch (e) {
    logger.error(`Something went wrong while connecting to the database.`)
    throw new Error(e)
  }
}
