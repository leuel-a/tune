import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import env from './utils/env.utils'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import express, { Express } from 'express'
import { validateEnv } from './utils/env.utils'
import { userRouter, authRouter, musicRouter } from './routers'
import { initializePassport } from './config/passport.config'

// Setup strategies and serializers
initializePassport(passport)

dotenv.config()
validateEnv()

const app = express()

export async function configureApp(app: Express) {
  app.use(cors())
  app.use(express.json())

  app.use(
    session({
      secret: env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60 // this is measured in milli seconds
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient()
      })
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api/auth', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/musics', musicRouter)
}

export default app
