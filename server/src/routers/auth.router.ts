import passport from 'passport'
import { Router } from 'express'
import { loginSchema } from '../schemas/users.schema'
import { validate } from '../middlewares/validateResource'
import { getProfileHandler, loginHandler } from '../controllers/auth.controller'
import { refreshAccessToken } from '../middlewares/refreshAccessToken'

const router = Router()

router.post('/login', validate(loginSchema), loginHandler)

// TODO: Remove this route when you are
router.post(
  '/profile',
  refreshAccessToken,
  passport.authenticate('jwt', { session: false }),
  getProfileHandler
)

// router.post('/logout', logoutHandler)

export default router
