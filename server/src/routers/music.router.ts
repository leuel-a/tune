import passport from 'passport'
import { Router } from 'express'
import {
  createMusicHandler,
  deleteMusicHandler,
  getMusicHandler,
  getMusicsHandler
} from '../controllers/music.controller'
import {
  createMusicSchema,
  deleteMusicSchema,
  getManyMusicSchema,
  getMusicSchema
} from '../schemas/musics.schema'
import { requireUser } from '../middlewares/requireUser'
import { validate } from '../middlewares/validateResource'

const router = Router()

router.get('/:id', validate(getMusicSchema), getMusicHandler)
router.get('/', validate(getManyMusicSchema), getMusicsHandler)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validate(createMusicSchema),
  createMusicHandler
)
router.delete('/:id', validate(deleteMusicSchema), deleteMusicHandler)

export default router
