import passport from 'passport'
import { Router } from 'express'
import {
  createMusicHandler,
  deleteMusicHandler,
  getMusicHandler,
  getMusicsHandler,
  updateMusicHandler
} from '../controllers/music.controller'
import {
  createMusicSchema,
  deleteMusicSchema,
  getManyMusicSchema,
  getMusicSchema,
  updateMusicSchema
} from '../schemas/music.schema'
import { requireUser } from '../middlewares/requireUser'
import { validate } from '../middlewares/validateResource'

const router = Router()

router.get('/:id', validate(getMusicSchema), getMusicHandler)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validate(updateMusicSchema),
  updateMusicHandler
)

router.get('/', validate(getManyMusicSchema), getMusicsHandler)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validate(createMusicSchema),
  createMusicHandler
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validate(deleteMusicSchema),
  deleteMusicHandler
)

export default router
