import passport from 'passport'
import { Router } from 'express'
import { loginSchema } from '../schemas/users.schema'
import { validate } from '../middlewares/validateResource'
import { loginHandler, logoutHandler } from '../controllers/auth.controller'

const router = Router()

router.post(
  '/',
  validate(loginSchema),
  passport.authenticate('local'),
  loginHandler
)

router.post('/logout', logoutHandler)

export default router
