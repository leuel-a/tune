import mongoose from 'mongoose'
import env from '../utils/env.utils'
import { logger } from '../utils/logger.utils'

export const connect = async () => {
  try {
    // TODO: check if you are in development mode or production mode
    // if you are in development mode, use the development database
    // if you are in production mode, use the production

    if (env.NODE_ENV === 'development') {
      await mongoose.connect(env.DATABASE_URL_LOCAL)
    } else {
      await mongoose.connect(env.DATABASE_URL_ATLAS)
    }

    // connect to the database

    logger.info(`Connection to the database is successful`)
  } catch (e) {
    logger.error(`Something went wrong while connecting to the database.`)
    throw new Error(e)
  }
}
