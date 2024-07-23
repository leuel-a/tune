import mongoose from 'mongoose'
import env from '../utils/env.utils'
import { logger } from '../utils/logger.utils'

export const connect = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL)
    logger.info(`Connection to the database is successful`)
  } catch (e) {
    logger.error(`Something went wrong while connecting to the database.`)
    throw new Error(e)
  }
}
