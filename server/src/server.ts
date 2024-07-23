require('dotenv').config()

import app from '.'
import { configureApp } from '.'
import { connect } from './lib/db'
import { logger } from './utils/logger.utils'

const PORT = process.env.PORT || 1337

async function startServer() {
  await connect()
  configureApp(app)

  // Listen to the app running on $PORT
  app.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}`)
  })
}

startServer()
