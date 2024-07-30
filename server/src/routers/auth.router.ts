import passport from 'passport'
import { Router } from 'express'
import { loginSchema } from '../schemas/users.schema'
import { validate } from '../middlewares/validateResource'
import { loginHandler } from '../controllers/auth.controller'

const router = Router()

router.post('/login', validate(loginSchema), loginHandler)

// TODO: Remove this route when you are
router.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).json(req.user)
})

// router.post('/logout', logoutHandler)

export default router
